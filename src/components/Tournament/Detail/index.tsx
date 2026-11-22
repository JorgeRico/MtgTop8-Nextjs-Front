'use client';

import './module.css';

import Link from 'next/link';
import {useEffect, useMemo, useState} from 'react';
import {useParams} from 'next/navigation';
import {getAxiosEndpoint, replaceUrlIdParam} from '@/hooks/useApi';
import {getFormat} from '@/hooks/useCommon';
import endpoints from '@/types/server/endpoints';
import {PlayerType} from '@/types/schemas/database/player';
import {TournamentType} from '@/types/schemas/database/tournament';

interface TournamentDetailProps {
  id: string;
  initialTournament: TournamentType;
}

type StandingRow = {
  rank: number;
  player: string;
  archetype: string;
  record: string;
  points: string;
  omw: string;
  colors: string[];
  tier?: string;
};

type TopCard = {
  name: string;
  count: string;
  detail: string;
  image: string;
};

type MetaSegment = {
  label: string;
  pct: string;
  count: string;
  colorClass: string;
  textClass: string;
  width: string;
  stroke: string;
  dash: string;
  offset: string;
};

type TypeDistribution = {
  label: string;
  icon: string;
  iconClass: string;
  pct: string;
  detail: string;
  barClass: string;
  width: string;
};

type SideboardBullet = {
  name: string;
  copies: string;
  colorClass: string;
};

type DeckModalState = {
  player: string;
  archetype: string;
  record: string;
} | null;

type ExportKind = 'meta' | 'decks' | null;

const fallbackStandings: StandingRow[] = [
  {
    rank: 1,
    player: 'Carles Mesegue',
    archetype: 'Temur Delver',
    record: '5-0-0',
    points: '15 Pts',
    omw: '68% OMW',
    colors: ['U', 'R', 'G'],
    tier: 'Campió'
  },
  {
    rank: 2,
    player: 'Miguel Ángel Rodríguez',
    archetype: 'Sneak & Show',
    record: '4-1-0',
    points: '12 Pts',
    omw: '62% OMW',
    colors: ['U', 'R'],
    tier: 'Finalista'
  },
  {
    rank: 3,
    player: 'Sergio Olivencia',
    archetype: 'Cephalid Breakfast',
    record: '4-1-0',
    points: '12 Pts',
    omw: '59% OMW',
    colors: ['U', 'B', 'W']
  },
  {
    rank: 4,
    player: 'Marc Font',
    archetype: 'Izzet Delver',
    record: '3-1-1',
    points: '10 Pts',
    omw: '65% OMW',
    colors: ['U', 'R']
  },
  {
    rank: 5,
    player: 'Arnau Puig',
    archetype: '12-Post Cloudpost',
    record: '3-1-1',
    points: '10 Pts',
    omw: '57% OMW',
    colors: ['G', 'C']
  },
  {
    rank: 6,
    player: 'Guillem Costa',
    archetype: 'Eldrazi Aggro',
    record: '3-2-0',
    points: '9 Pts',
    omw: '58% OMW',
    colors: ['C']
  },
  {
    rank: 7,
    player: 'Jordi Valls',
    archetype: 'Bant Nadu Combo',
    record: '3-2-0',
    points: '9 Pts',
    omw: '54% OMW',
    colors: ['U', 'G']
  },
  {
    rank: 8,
    player: 'Dídac Riera',
    archetype: 'The Epic Storm (TES)',
    record: '3-2-0',
    points: '9 Pts',
    omw: '52% OMW',
    colors: ['B', 'R']
  }
];

const manaPipClass: Record<string, string> = {
  U: 'bg-[#06B6D4]',
  B: 'bg-[#94A3B8]',
  R: 'bg-[#EF4444]',
  G: 'bg-[#10B981]',
  W: 'bg-[#F8FAFC]',
  C: 'bg-[#94A3B8]'
};

const metaSegments: MetaSegment[] = [
  {
    label: 'Delver & Tempo',
    pct: '34.5% (10)',
    count: '10',
    colorClass: 'bg-primary-container',
    textClass: 'text-primary',
    width: '34.5%',
    stroke: '#F97316',
    dash: '85.4 251.2',
    offset: '0'
  },
  {
    label: 'Combo (Show/Nadu/TES)',
    pct: '27.6% (8)',
    count: '8',
    colorClass: 'bg-secondary-container',
    textClass: 'text-secondary',
    width: '27.6%',
    stroke: '#03B5D3',
    dash: '70.3 251.2',
    offset: '-85.4'
  },
  {
    label: 'Stompy & Eldrazi',
    pct: '20.7% (6)',
    count: '6',
    colorClass: 'bg-tertiary-container',
    textClass: 'text-tertiary',
    width: '20.7%',
    stroke: '#A985FF',
    dash: '50.2 251.2',
    offset: '-155.7'
  },
  {
    label: 'Control & Ramp (Post)',
    pct: '17.2% (5)',
    count: '5',
    colorClass: 'bg-on-surface-variant',
    textClass: 'text-on-surface-variant',
    width: '17.2%',
    stroke: '#E0C0B1',
    dash: '45.2 251.2',
    offset: '-205.9'
  }
];

const topCards: TopCard[] = [
  {
    name: 'Wasteland',
    count: '15',
    detail: 'Land • 51.7% Meta',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkaMjEUbMkhHGm7a6Ot3xnrdNyfIX64NZCb_hUdH3LlU5nVJECTa5U6xWEpjQ8GFArI-ti9yiF5IA6j7bVNQRvPyQMMZ748s-tiMTicxhsZTwzukE3RlcSeO1vURhLzzA9WLRLHv-IlZ8ugphWcutXR86trAcMzXnMIGdE2BqVf0W_XzU3cFbTdXkGtDOVgw_ZTD6bvibljmdTKj5VlSxob3n9x-UJaGSVlXs_XB4'
  },
  {
    name: 'Plains',
    count: '9',
    detail: 'Basic Land',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCglBujEntwaVBLx4PuGJYvlWg-9RxAb3UQM683vj83s83W83xH59xFArPbX3Lp0ujWP4eSuANt8vPya0Zv68eu49mFqfnW1IKtlyT7l7ZmQaY9wr5cYmJ248AE1j7_D_U9zuPJSWWhguRfwTHXJqSJqrun4NiDiWfiq2NiMTnJXfMAuKqI_P_wliFHxwSDCXvoSszF0AEhcS6PX1pBbBD9REfvHG7JyOxojEkHTU'
  },
  {
    name: 'Volcanic Island',
    count: '8',
    detail: 'Dual Land • Island Mountain',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCXVmR4MnaVHHvBNKnkkYeUK7Lx2vIPT447AXypEHbPYT_bSBLfA7qPAr13ZRNH9rSEjc9PnZpqhWpaw0uYd6WiprrS7gSvVSVMFf_EVEw8GSB9VqGAyrpnCQELOvzz1JJPbRTBX1FB0rjJsiussKyiCxPMX72wxajDzPVKhpKr7m_tb8fU0a0Aq4x6Uq-FrqSk3ODEKiuBi4fbVLQw0PEhtB8hXWlaOGf5ULmEsHA'
  },
  {
    name: 'Swords to Plowshares',
    count: '8',
    detail: 'Instant • White',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCsuFW9bu6QS7UH8diNv2_IHXs6E9pfn4FJHFj9TjxxB_L4o9WWg-LkLQUkasTHEb0M-rZae7-cGoHY-mrkxOQ91EQIS_1witjov4DmWSE-7_ZbpGs9MIcKAkMP6TrexHRpBqrdwhwBA-p4Ln1dPSj7a3gkfgQ183S_GRua9YBwG3HYboE6X4pMk9I5tVRhKRKH6LTa-UUW9o19jRr_84qYZPYp97UgUD7kifeDHfM'
  },
  {
    name: 'Pyroblast',
    count: '8',
    detail: 'Instant • Red Sideboard',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0sty_h9fsDnkKF6PUE2Jl-GxucSncjlOfEt5jYRMWHuNUc5Y5XDoH4Th47ofmHsYOHNACDAknhYyxerCg776qupiWj9Swmm8Fhn-FxoncAaywTmQWU0RhQpMepv9OwOPesaFUp5XfQPc0yAbTlMKNfBVwPBeYDhP-XUN5bpEtn97gKnycKbQ8f-N0i_DBMbT06BwvB1ft93BnF8OMQwCugsOhh_KojhLDvU99los'
  },
  {
    name: 'Ponder',
    count: '8',
    detail: 'Sorcery • Blue Cantrip',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-0A68PY9y8ONeWBLXlqdpOJlDg8rcUJEYX3W_3GVOsl8PEkrVL3si_hAem08BZE53XEDzpKZ7O4s-e2MFXWTMFUdSCuZd7-pgn6viYtt8F5sP8gOO744X7eIjUDbEzpHrxiy8S48XozH3CY1w8vD8P52vEg9rDi1A4cmPGoMQaCB6SitQEeGOK0-1tnWIbPDlJwn94XgmR4SznsJ3o1k_yfqtuYZLJ-4I86j04nA'
  },
  {
    name: 'Lightning Bolt',
    count: '8',
    detail: 'Instant • 3 Damage',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDWQWJlnqusposngRgJeHk9s0rb2Vo1HMbF5bRc1FA0PTtpTIJw0bwOhOT57y_Lnmx3eafx5zgAX9vIyEaaPg5ISEvjwOSTsMsvn5otjuDwEBVx4tsfEp4uMdKpK8SUFZhybUtDTthlLzKL_eIj8Web8dBJZckSw1khhh_MAmwrNB3hUqTi0wetXK-ik7DLVkiPQ638KryR6a_E4OQ82id5Tb4LijP6oj6N_pPzaZo'
  },
  {
    name: 'Leyline of the Void',
    count: '8',
    detail: 'Enchantment • Sideboard',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDuEDFTtgNh9I3_bcY_ITbbhiIrV56YIhLOe6J4XMUT9_RvWn4t_WUpug-n0q1WFx_kP7NL4wdbB-mt_BVhY2ZqAwkw-m44m9w6C-mD7--HUN46M-pqTsRxS7mzhEjK8mGeMWOWFqooxrdLperCHwP-_BlyfpTDfASpoQyvI_1Y76XKRdyeCWzGCi2gSEmRRZUdj9-KeMIC2rv1QFiUu0gdHQiFz85LWDTmmpy1a4o'
  },
  {
    name: 'Force of Will',
    count: '18',
    detail: 'Instant • Format Pillar',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1GsljNA1JJDqf33vd3uIsYsTded41Lk1wIiPHvrQ1HzkxT179FAZJHU_0GFZLhCHtUtJLTRpYj8lSNv7KZ4-eoW7Tj6S9SGVruxA1BZ4Ix-I4DT43XutfJMhG6RpeHa2I-AfufOw0K13aS_CtlW0rutOdSqvdM5-5S_--ziurIBWt0ewKK0PmrEm_Z_Ct1GqzN01QUMPjy3euOkq0tXpM7fmWBrBT4CCKnW8zJOY'
  },
  {
    name: 'Brainstorm',
    count: '16',
    detail: 'Instant • 4-of Blue Staple',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfty6l8RdQSVtV76QjM3eZYLz7bRGcbxx6WseXlwqUnsx3V4Ka8AGdmSLiPzVlY33yxl0hcrcl2WExrJjkK3_fwbUE36Zm8zoRLZpKtSuVgmzUtkJxyjywMQ29nQsJDNTP8qD58qZfzMynVAHPbmuhLqZRZhKSsD_XVIg2jn6hPAwDU-XBCyC4fe7VaIrfzc-onyE1aVPfPXp9jzytYFm3lJGmTb_40GfO_JwRnLY'
  }
];

const typeDistribution: TypeDistribution[] = [
  {
    label: 'Instants & Sorceries',
    icon: 'bolt',
    iconClass: 'text-secondary',
    pct: '41.8% (728 cartes)',
    detail: '',
    barClass: 'bg-secondary',
    width: '41.8%'
  },
  {
    label: 'Terres (Lands)',
    icon: 'landscape',
    iconClass: 'text-emerald-400',
    pct: '28.4% (494 cartes)',
    detail: '',
    barClass: 'bg-emerald-400',
    width: '28.4%'
  },
  {
    label: 'Criatures (Creatures)',
    icon: 'swords',
    iconClass: 'text-primary',
    pct: '18.6% (324 cartes)',
    detail: '',
    barClass: 'bg-primary-container',
    width: '18.6%'
  },
  {
    label: 'Artefactes & Encantaments',
    icon: 'token',
    iconClass: 'text-purple-400',
    pct: '11.2% (194 cartes)',
    detail: '',
    barClass: 'bg-purple-400',
    width: '11.2%'
  }
];

const sideboardBullets: SideboardBullet[] = [
  {name: 'Leyline of the Void', copies: '8 cop.', colorClass: 'bg-purple-400'},
  {name: 'Pyroblast / REB', copies: '12 cop.', colorClass: 'bg-[#EF4444]'},
  {name: 'Hydroblast', copies: '6 cop.', colorClass: 'bg-[#06B6D4]'},
  {name: 'Force of Vigor', copies: '7 cop.', colorClass: 'bg-emerald-400'},
  {name: 'Meltdown', copies: '5 cop.', colorClass: 'bg-amber-400'},
  {name: 'Null Rod', copies: '4 cop.', colorClass: 'bg-[#94A3B8]'}
];

const maindeck = [
  'Creatures (14)',
  '4 Delver of Secrets',
  '4 Dragon’s Rage Channeler',
  '3 Murktide Regent',
  '3 Questing Druid',
  'Spells (28)',
  '4 Brainstorm',
  '4 Ponder',
  '4 Force of Will',
  '4 Daze',
  '4 Lightning Bolt',
  '4 Mishra’s Bauble',
  '2 Spell Pierce',
  '2 Preordain',
  'Lands (18)',
  '4 Wasteland',
  '4 Scalding Tarn',
  '4 Misty Rainforest',
  '3 Volcanic Island',
  '2 Tropical Island',
  '1 Wooded Foothills'
];

const sideboard = [
  '2 Hydroblast',
  '2 Pyroblast',
  '2 Meltdown',
  '2 Surgical Extraction',
  '2 Force of Vigor',
  '2 Minor Misstep',
  '1 Flusterstorm',
  '1 Grafdigger’s Cage',
  '1 Null Rod'
];

const TournamentDetail = ({id, initialTournament}: TournamentDetailProps) => {
  const params = useParams<{id: string}>();
  const currentId = params.id || id;
  const [tournament, setTournament] =
    useState<TournamentType>(initialTournament);
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [statsOpen, setStatsOpen] = useState(true);
  const [deckModal, setDeckModal] = useState<DeckModalState>(null);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [exportKind, setExportKind] = useState<ExportKind>(null);

  useEffect(() => {
    async function apiCall(): Promise<void> {
      try {
        const [tournamentResponse, playersResponse] = await Promise.all([
          getAxiosEndpoint<TournamentType>(
            replaceUrlIdParam(endpoints.API_TOURNAMENT_DATA, currentId)
          ),
          getAxiosEndpoint<PlayerType[]>(
            replaceUrlIdParam(endpoints.API_TOURNAMENT_PLAYERS, currentId)
          )
        ]);

        setTournament(tournamentResponse.data);
        setPlayers(playersResponse.data);
      } catch (err) {
        console.log(err);
        console.log('error tournament');
      }
    }

    apiCall();
  }, [currentId]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    if (!shared) return;
    const timer = window.setTimeout(() => setShared(false), 2000);
    return () => window.clearTimeout(timer);
  }, [shared]);

  useEffect(() => {
    if (!exportKind) return;
    const timer = window.setTimeout(() => setExportKind(null), 1800);
    return () => window.clearTimeout(timer);
  }, [exportKind]);

  const standings = useMemo(
    () =>
      fallbackStandings.map((row) => {
        const player =
          players.find((item) => item.position === row.rank) ||
          players[row.rank - 1];

        return {
          ...row,
          player: player?.name || row.player,
          archetype: player?.deckName || row.archetype
        };
      }),
    [players]
  );

  const title = tournament.name
    .toLowerCase()
    .includes(tournament.leagueName.toLowerCase())
    ? tournament.name
    : `${tournament.leagueName} — ${tournament.name}`;
  const format = `${getFormat(tournament.format)} 1.5`;

  const shareResults = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
    } catch (err) {
      console.log(err);
    }
  };

  const copyDeckToClipboard = async (): Promise<void> => {
    if (!deckModal) return;

    const text = [
      `${deckModal.player} — ${deckModal.archetype}`,
      'Maindeck (60 Cards)',
      ...maindeck,
      'Sideboard (15 Cards)',
      ...sideboard
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="tournament-detail-stats w-full">
      <div className="mx-auto w-full max-w-7xl space-y-10 px-4 py-8 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 text-xs font-label tracking-wide text-on-surface-variant/80"
        >
          <Link
            className="flex items-center gap-1 hover:text-primary transition-colors"
            href="/"
          >
            <span className="material-symbols-outlined text-sm">home</span>
            Inici
          </Link>
          <span className="material-symbols-outlined text-xs text-on-surface-variant/40">
            chevron_right
          </span>
          <Link
            className="hover:text-primary transition-colors"
            href={endpoints.HTTP_LEAGUE}
          >
            Lligues
          </Link>
          <span className="material-symbols-outlined text-xs text-on-surface-variant/40">
            chevron_right
          </span>
          <Link
            className="hover:text-primary transition-colors"
            href={`${endpoints.HTTP_LEAGUE}${tournament.idLeague}`}
          >
            {tournament.leagueName} {tournament.year}
          </Link>
          <span className="material-symbols-outlined text-xs text-on-surface-variant/40">
            chevron_right
          </span>
          <span className="font-semibold text-primary">
            {tournament.name} (Event #{currentId})
          </span>
        </nav>

        <section className="relative overflow-hidden rounded-xl bg-surface-container-low p-6 shadow-xl lg:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-container/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-1/4 h-60 w-60 rounded-full bg-secondary-container/10 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-surface-container-high px-2.5 py-1 text-[10px] font-label font-bold uppercase tracking-wider text-primary">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  Sanctioned {getFormat(tournament.format)}
                </span>
                <span className="rounded-full bg-surface-container-high px-2.5 py-1 text-[10px] font-label font-bold uppercase tracking-wider text-secondary">
                  Competitive REL
                </span>
                <span className="rounded-full bg-surface-container px-2.5 py-1 font-mono text-[10px] font-label font-bold uppercase tracking-wider text-on-surface-variant">
                  EVENT ID: #{currentId}
                </span>
                <span className="rounded-full bg-surface-container-lowest px-2.5 py-1 text-[10px] font-label font-bold uppercase tracking-wider text-on-surface-variant/70">
                  Temporada {tournament.year}
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface sm:text-4xl lg:text-5xl">
                  {title}
                </h1>
                <p className="font-body text-sm leading-relaxed text-on-surface-variant sm:text-base">
                  Fase regular inaugural disputada al{' '}
                  <strong className="font-semibold text-on-surface">
                    Sabadell Gaming Hub
                  </strong>
                  . Convocatòria d'alt nivell amb representació dels millors
                  pilots de Catalunya.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
                <div className="rounded-lg bg-surface-container p-3">
                  <span className="block text-[11px] font-label uppercase tracking-wider text-on-surface-variant/70">
                    Format
                  </span>
                  <span className="font-headline text-sm font-bold text-on-surface">
                    {format}
                  </span>
                </div>
                <div className="rounded-lg bg-surface-container p-3">
                  <span className="block text-[11px] font-label uppercase tracking-wider text-on-surface-variant/70">
                    Data
                  </span>
                  <span className="font-headline text-sm font-bold text-on-surface">
                    {tournament.date}
                  </span>
                </div>
                <div className="rounded-lg bg-surface-container p-3">
                  <span className="block text-[11px] font-label uppercase tracking-wider text-on-surface-variant/70">
                    Assistència
                  </span>
                  <span className="font-headline text-sm font-bold text-primary">
                    {tournament.players} Jugadors
                  </span>
                </div>
                <div className="rounded-lg bg-surface-container p-3">
                  <span className="block text-[11px] font-label uppercase tracking-wider text-on-surface-variant/70">
                    Estructura
                  </span>
                  <span className="font-headline text-sm font-bold text-on-surface">
                    5 Rondes + Top 8
                  </span>
                </div>
              </div>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-3 self-start sm:w-auto lg:flex-col lg:self-center">
              <button
                className="flex items-center justify-center gap-2 rounded-lg bg-primary-container px-5 py-3 text-xs font-label font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-primary-container/90 active:scale-95"
                onClick={() => setExportKind('meta')}
                type="button"
              >
                <span className="material-symbols-outlined text-base">
                  table_view
                </span>
                {exportKind === 'meta' ? 'Exporting...' : 'Metagame Sheet'}
              </button>
              <button
                className="flex items-center justify-center gap-2 rounded-lg bg-surface-container-high px-5 py-3 text-xs font-label font-semibold uppercase tracking-wider text-on-surface transition-all hover:bg-surface-container-highest active:scale-95"
                onClick={() => setExportKind('decks')}
                type="button"
              >
                <span className="material-symbols-outlined text-base">
                  {exportKind === 'decks' ? 'done_all' : 'file_download'}
                </span>
                {exportKind === 'decks'
                  ? 'Zipping...'
                  : 'Export Decklists (.txt)'}
              </button>
              <button
                className="flex items-center justify-center gap-1 rounded-lg px-5 py-2 text-center text-xs font-label text-on-surface-variant transition-colors hover:text-primary"
                onClick={shareResults}
                type="button"
              >
                <span className="material-symbols-outlined text-sm">
                  {shared ? 'check' : 'share'}
                </span>
                {shared ? 'Enllaç copiat' : 'Comparteix resultats'}
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <section className="space-y-4 lg:col-span-7">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2.5">
                <span className="inline-block h-6 w-2.5 rounded-full bg-primary-container" />
                <h2 className="text-xl font-headline font-extrabold uppercase tracking-tight text-on-surface">
                  Top 8 Standings
                </h2>
              </div>
              <span className="rounded bg-surface-container-low px-2.5 py-1 text-xs font-label text-on-surface-variant">
                Single Elimination Playoff
              </span>
            </div>

            <div className="overflow-hidden rounded-xl bg-surface-container-low shadow-lg">
              <div className="grid grid-cols-12 bg-surface-container px-4 py-2.5 text-[11px] font-label font-bold uppercase tracking-wider text-on-surface-variant/80">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-5 sm:col-span-6">
                  Jugador &amp; Baralla
                </div>
                <div className="col-span-3 text-right sm:col-span-3">
                  Rècord Suís
                </div>
                <div className="col-span-3 text-right sm:col-span-2">
                  Llista
                </div>
              </div>

              <div className="divide-y divide-surface-container/60">
                {standings.map((row) => (
                  <div
                    className="group grid grid-cols-12 items-center px-4 py-3 transition-colors hover:bg-surface-container"
                    key={row.rank}
                  >
                    <div className="col-span-1 flex items-center justify-center">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full font-headline text-xs ${row.rank === 1 ? 'bg-amber-500/20 font-extrabold text-amber-400 shadow-inner' : row.rank === 2 ? 'bg-surface-container-high font-bold text-on-surface' : 'bg-surface-container font-semibold text-on-surface-variant'}`}
                      >
                        {row.rank}
                      </span>
                    </div>

                    <div className="col-span-5 pr-2 sm:col-span-6">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-headline text-sm font-bold text-on-surface transition-colors group-hover:text-primary">
                          {row.player}
                        </span>
                        {row.tier && (
                          <span
                            className={`rounded px-1.5 py-[2px] text-[10px] font-label font-extrabold uppercase ${row.rank === 1 ? 'bg-primary-container/20 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}
                          >
                            {row.tier}
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        <div className="flex items-center -space-x-1">
                          {row.colors.map((color, index) => (
                            <span
                              aria-hidden="true"
                              className={`h-2 w-2 rounded-full ${manaPipClass[color]}`}
                              key={`${row.rank}-${color}-${index}`}
                              title={color}
                            />
                          ))}
                        </div>
                        <span className="font-body text-xs text-on-surface-variant">
                          {row.archetype}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-3 text-right sm:col-span-3">
                      <span className="font-mono text-xs font-semibold text-on-surface">
                        {row.record}
                      </span>
                      <span className="block text-[10px] text-on-surface-variant/70">
                        {row.points} ({row.omw})
                      </span>
                    </div>

                    <div className="col-span-3 text-right sm:col-span-2">
                      <button
                        className="rounded bg-surface-container-high px-2.5 py-1 text-xs font-label font-semibold text-on-surface transition-all hover:bg-primary-container hover:text-white"
                        onClick={() =>
                          setDeckModal({
                            player: row.player,
                            archetype: row.archetype,
                            record: row.record
                          })
                        }
                        type="button"
                      >
                        Deck
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-6 lg:col-span-5">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2.5">
                <span className="inline-block h-6 w-2.5 rounded-full bg-secondary-container" />
                <h2 className="text-xl font-headline font-extrabold uppercase tracking-tight text-on-surface">
                  Metagame Share
                </h2>
              </div>
              <span className="text-xs font-label font-mono text-on-surface-variant">
                {tournament.players} Baralles
              </span>
            </div>

            <div className="space-y-6 rounded-xl bg-surface-container-low p-6 shadow-lg">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
                  <svg
                    className="h-full w-full -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      fill="transparent"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-surface-container-highest"
                    />
                    {metaSegments.map((segment) => (
                      <circle
                        className={segment.textClass}
                        cx="50"
                        cy="50"
                        fill="transparent"
                        key={segment.label}
                        r="40"
                        stroke="currentColor"
                        strokeDasharray={segment.dash}
                        strokeDashoffset={segment.offset}
                        strokeWidth="12"
                        style={{color: segment.stroke}}
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-headline text-xl font-extrabold text-on-surface">
                      Legacy
                    </span>
                    <span className="text-[10px] font-label uppercase tracking-wider text-on-surface-variant">
                      Meta
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-2.5">
                  {metaSegments.map((segment) => (
                    <div key={segment.label}>
                      <div className="mb-1 flex justify-between text-xs font-label">
                        <span className="flex items-center gap-1.5 text-on-surface">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${segment.colorClass}`}
                          />
                          {segment.label}
                        </span>
                        <span
                          className={`font-mono font-bold ${segment.textClass}`}
                        >
                          {segment.pct}
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
                        <div
                          className={`h-full rounded-full ${segment.colorClass}`}
                          style={{width: segment.width}}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 rounded-lg bg-surface-container p-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] font-label font-bold uppercase tracking-wider text-primary">
                    <span className="material-symbols-outlined text-xs">
                      military_tech
                    </span>
                    Champion Tech Innovation
                  </span>
                  <span className="font-mono text-[10px] text-on-surface-variant/80">
                    Temur Delver
                  </span>
                </div>
                <p className="font-body text-xs leading-relaxed text-on-surface">
                  Carles Mesegue va assegurar el trofeu incorporant{' '}
                  <strong>3x Questing Druid</strong> de banqueta contra control
                  pesat, combinat amb una base de <strong>4x Wasteland</strong>{' '}
                  per bloquejar el mana dels jugadors de Cloudpost i Breakfast.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="rounded bg-surface-container-high px-2 py-0.5 text-[10px] font-label font-semibold text-on-surface">
                    4 Wasteland
                  </span>
                  <span className="rounded bg-surface-container-high px-2 py-0.5 text-[10px] font-label font-semibold text-on-surface">
                    4 Lightning Bolt
                  </span>
                  <span className="rounded bg-surface-container-high px-2 py-0.5 text-[10px] font-label font-semibold text-on-surface">
                    3 Questing Druid
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <h2 className="text-2xl font-headline font-extrabold tracking-tight text-on-surface">
                Card Stats
              </h2>
            </div>
            <button
              aria-expanded={statsOpen}
              className="flex items-center gap-1.5 rounded bg-surface-container px-3 py-1.5 text-xs font-label font-semibold text-on-surface-variant transition-all hover:bg-surface-container-high hover:text-on-surface"
              onClick={() => setStatsOpen((open) => !open)}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">
                {statsOpen ? 'expand_less' : 'expand_more'}
              </span>
              {statsOpen ? 'Hide Stats' : 'Show Stats'}
            </button>
          </div>

          {statsOpen && (
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
              <div className="w-full lg:col-span-6">
                <div className="overflow-hidden rounded-lg bg-surface-container-low shadow-2xl">
                  <div className="flex items-center justify-between px-5 py-4">
                    <h3 className="font-headline text-base font-bold text-on-surface sm:text-lg">
                      Top Cards
                    </h3>
                    <button
                      className="rounded bg-[#B94406] px-5 py-1.5 text-xs font-label font-bold uppercase tracking-wider text-white shadow transition-colors hover:bg-[#ea580c] active:scale-95"
                      type="button"
                    >
                      View
                    </button>
                  </div>

                  <div className="flex items-center bg-[#B94406] px-5 py-2.5 text-sm font-headline font-bold tracking-wide text-white">
                    <span className="w-20 text-center">Total</span>
                    <span className="pl-2">Name</span>
                  </div>

                  <div className="divide-y divide-surface-container/40 bg-surface-container-lowest/80 font-body text-sm">
                    {topCards.map((card) => (
                      <div
                        className="flex cursor-pointer items-center px-5 py-2.5 transition-colors hover:bg-surface-container group"
                        key={card.name}
                      >
                        <div className="flex w-20 items-center gap-3">
                          <div
                            aria-hidden="true"
                            className="h-10 w-7 shrink-0 rounded bg-surface-container bg-cover bg-center shadow"
                            style={{backgroundImage: `url("${card.image}")`}}
                          />
                          <span className="font-headline text-base font-medium text-on-surface">
                            {card.count}
                          </span>
                        </div>
                        <div className="flex flex-1 items-center justify-between pl-4 text-base text-on-surface transition-colors group-hover:text-primary">
                          <span>{card.name}</span>
                          <span className="hidden font-mono text-[11px] text-on-surface-variant/50 group-hover:inline">
                            {card.detail}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between bg-surface-container-low p-3 text-[11px] font-label text-on-surface-variant/70">
                    <span>Calculat sobre 1,740 cartes registrades</span>
                    <button
                      className="cursor-pointer text-primary hover:underline"
                      type="button"
                    >
                      Descarrega CSV complet
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6 lg:col-span-6">
                <div className="space-y-5 rounded-xl bg-surface-container-low p-6 shadow-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-headline text-base font-bold text-on-surface">
                        Distribució per Tipus de Carta
                      </h4>
                      <p className="text-xs text-on-surface-variant">
                        Percentatge de presència global a les{' '}
                        {tournament.players} llistes
                      </p>
                    </div>
                    <span className="rounded bg-surface-container px-2 py-1 font-mono text-[10px] font-semibold text-secondary">
                      60 MD / 15 SB
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {typeDistribution.map((item) => (
                      <div key={item.label}>
                        <div className="mb-1 flex justify-between text-xs font-label">
                          <span className="flex items-center gap-1.5 text-on-surface">
                            <span
                              className={`material-symbols-outlined text-sm ${item.iconClass}`}
                            >
                              {item.icon}
                            </span>
                            {item.label}
                          </span>
                          <span className="font-mono font-semibold text-on-surface">
                            {item.pct}
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
                          <div
                            className={`h-full rounded-full ${item.barClass}`}
                            style={{width: item.width}}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 rounded-xl bg-surface-container-low p-6 shadow-lg">
                  <h4 className="font-headline text-base font-bold text-on-surface">
                    Sideboard Silver Bullets
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Les cartes de banqueta més jugades per guanyar enfrontaments
                    específics.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {sideboardBullets.map((bullet) => (
                      <div
                        className="flex items-center gap-2 rounded-lg bg-surface-container px-3 py-1.5"
                        key={bullet.name}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${bullet.colorClass}`}
                        />
                        <span className="font-headline text-xs font-semibold text-on-surface">
                          {bullet.name}
                        </span>
                        <span className="rounded bg-surface-container-high px-1.5 py-[2px] font-mono text-[10px] text-primary">
                          {bullet.copies}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-surface-container p-4">
                  <span className="material-symbols-outlined mt-0.5 text-primary">
                    verified_user
                  </span>
                  <div className="space-y-1 text-xs">
                    <span className="block font-headline font-bold text-on-surface">
                      Llistes Verificades Oficials
                    </span>
                    <p className="leading-relaxed text-on-surface-variant">
                      Totes les {tournament.players} decklists han estat
                      verificades pel jutge principal del torneig (L2 DCI). Les
                      estadístiques reflecteixen tant baralles de suís com el
                      top 8 final.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-xl bg-surface-container-low p-6 shadow-md">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface-container text-primary">
                <span className="material-symbols-outlined text-2xl">
                  store
                </span>
              </div>
              <div>
                <h4 className="font-headline text-sm font-bold text-on-surface">
                  Sabadell Gaming Hub
                </h4>
                <p className="text-xs text-on-surface-variant">
                  Carrer de Gràcia 44, Sabadell (Barcelona) • Botiga &amp; Espai
                  de Joc Afiliat
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-label">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm text-secondary">
                  gavel
                </span>
                <span>
                  Head Judge:{' '}
                  <strong className="text-on-surface">Albert Soler (L2)</strong>
                </span>
              </div>
              <span className="text-surface-container-highest">•</span>
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm text-primary">
                  event_available
                </span>
                <span>Verificat: 25/01/2026 21:40</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {deckModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setDeckModal(null)}
        >
          <div
            className="flex max-h-[870px] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-surface-container-low shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-surface-container p-space-md">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-mana-white">
                    {deckModal.player}
                  </span>
                  <span className="rounded bg-primary-container/20 px-2 py-0.5 font-stat-mono text-label-sm text-primary-fixed">
                    {deckModal.record}
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-mana-blue">
                  {deckModal.archetype}
                </span>
              </div>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant transition-colors hover:text-on-surface"
                onClick={() => setDeckModal(null)}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </div>
            <div className="flex flex-col gap-space-md overflow-y-auto p-space-md font-body-sm text-body-sm">
              <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <span className="font-label-md text-label-md text-on-surface">
                    Maindeck (60 Cards)
                  </span>
                  <div className="flex flex-col gap-1 rounded-lg bg-surface-container-lowest p-3 font-mono text-[13px] text-on-surface/90">
                    {maindeck.map((line, index) => (
                      <p key={`${line}-${index}`}>{line}</p>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-label-md text-label-md text-on-surface">
                    Sideboard (15 Cards)
                  </span>
                  <div className="flex flex-col gap-1 rounded-lg bg-surface-container-lowest p-3 font-mono text-[13px] text-on-surface/90">
                    {sideboard.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  <button
                    className="mt-2 flex w-full items-center justify-center gap-1.5 rounded bg-surface-container-high py-2 font-label-md text-label-md text-on-surface transition-all hover:bg-surface-container-highest"
                    onClick={copyDeckToClipboard}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                    {copied
                      ? 'Copied to Clipboard!'
                      : 'Copy Decklist to MTGO/Arena'}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-surface-container/50 p-space-md">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Catalan MTG Circuit Verified Registration
              </span>
              <button
                className="rounded bg-primary-container px-4 py-1.5 font-label-md text-label-md text-white"
                onClick={() => setDeckModal(null)}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentDetail;
