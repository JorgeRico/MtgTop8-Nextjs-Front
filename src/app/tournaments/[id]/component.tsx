'use client';

import {useEffect, useMemo, useState} from 'react';
import {useParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import Breadcrumb from '@/components/Breadcrumb';
import {getAxiosEndpoint, replaceUrlIdParam} from '@/hooks/useApi';
import {getFormat} from '@/hooks/useCommon';
import endpoints from '@/types/server/endpoints';
import {PlayerType} from '@/types/schemas/database/player';
import {TournamentType} from '@/types/schemas/database/tournament';

interface TournamentComponentProps {
  id: string;
  initialTournament: TournamentType;
}

type CardTabKey =
  | 'all'
  | 'creatures'
  | 'instants'
  | 'sorceries'
  | 'artifacts'
  | 'enchantments'
  | 'planeswalkers'
  | 'lands';

type CardDatum = {
  name: string;
  type: string;
  pct: string;
  copies: string;
  bar: string;
  icon: string;
  note: string;
  barColor: string;
  main?: string;
  side?: string;
  mainWidth?: string;
  sideWidth?: string;
};

type StandingRow = {
  rank: number;
  player: string;
  club: string;
  tier: string;
  archetype: string;
  note: string;
  record: string;
  colors: string[];
};

type DeckModalState = {
  player: string;
  archetype: string;
  record: string;
  colors: string;
} | null;

type ExportKind = 'meta' | 'decks' | null;

const cardTabs: Array<{
  key: CardTabKey;
  label: string;
  total: string;
  mainboard: string;
  sideboard: string;
}> = [
  {
    key: 'all',
    label: 'All Types',
    total: '72',
    mainboard: '54',
    sideboard: '18'
  },
  {
    key: 'creatures',
    label: 'Creatures',
    total: '18',
    mainboard: '16',
    sideboard: '2'
  },
  {
    key: 'instants',
    label: 'Instants',
    total: '24',
    mainboard: '17',
    sideboard: '7'
  },
  {
    key: 'sorceries',
    label: 'Sorceries',
    total: '8',
    mainboard: '7',
    sideboard: '1'
  },
  {
    key: 'artifacts',
    label: 'Artifacts',
    total: '6',
    mainboard: '4',
    sideboard: '2'
  },
  {
    key: 'enchantments',
    label: 'Enchantments',
    total: '4',
    mainboard: '2',
    sideboard: '2'
  },
  {
    key: 'planeswalkers',
    label: 'Planeswalkers',
    total: '2',
    mainboard: '1',
    sideboard: '1'
  },
  {key: 'lands', label: 'Lands', total: '10', mainboard: '7', sideboard: '3'}
];

const cardData: Record<CardTabKey, CardDatum[]> = {
  all: [
    {
      name: 'Hydroblast / BEB',
      type: 'Sideboard Tech',
      pct: '66.7%',
      copies: '14 total registered',
      bar: '100%',
      icon: 'ac_unit',
      note: 'Top anti-red answer for Delver and Blood Moon.',
      barColor: 'bg-mana-blue',
      main: '0 MB',
      side: '14 SB',
      mainWidth: '0%',
      sideWidth: '100%'
    },
    {
      name: 'Surgical Extraction',
      type: 'Sideboard Tech',
      pct: '58.3%',
      copies: '12 total registered',
      bar: '100%',
      icon: 'biotech',
      note: 'Free instant graveyard hate for combo mirrors.',
      barColor: 'bg-mana-blue',
      main: '2 MB',
      side: '10 SB',
      mainWidth: '17%',
      sideWidth: '83%'
    },
    {
      name: 'Meltdown',
      type: 'Sideboard Tech',
      pct: '50.0%',
      copies: '9 total registered',
      bar: '100%',
      icon: 'local_fire_department',
      note: 'Sweeper for Chalice of the Void and Urza’s Saga tokens.',
      barColor: 'bg-mana-red',
      main: '0 MB',
      side: '9 SB',
      mainWidth: '0%',
      sideWidth: '100%'
    },
    {
      name: 'Flusterstorm',
      type: 'Sideboard Tech',
      pct: '50.0%',
      copies: '8 total registered',
      bar: '100%',
      icon: 'cyclone',
      note: 'Essential storm check and counter war winner.',
      barColor: 'bg-mana-blue',
      main: '0 MB',
      side: '8 SB',
      mainWidth: '0%',
      sideWidth: '100%'
    }
  ],
  creatures: [
    {
      name: 'Orcish Bowmasters',
      type: 'Creature',
      pct: '50.0%',
      copies: '14',
      bar: '50%',
      icon: 'swords',
      note: '14 copies in black midrange and Cephalid Combo.',
      barColor: 'bg-mana-black'
    },
    {
      name: 'Murktide Regent',
      type: 'Creature',
      pct: '41.7%',
      copies: '11',
      bar: '42%',
      icon: 'flight',
      note: 'Primary finisher of Izzet and Temur shells.',
      barColor: 'bg-mana-blue'
    },
    {
      name: 'Delver of Secrets',
      type: 'Creature',
      pct: '33.3%',
      copies: '8',
      bar: '33%',
      icon: 'pest_control',
      note: 'Classical one-mana clock.',
      barColor: 'bg-mana-blue'
    },
    {
      name: 'Nadu, Winged Wisdom',
      type: 'Creature',
      pct: '25.0%',
      copies: '4',
      bar: '25%',
      icon: 'raven',
      note: 'Central combo engine of UG shells.',
      barColor: 'bg-mana-green'
    }
  ],
  instants: [
    {
      name: 'Force of Will',
      type: 'Instant',
      pct: '100%',
      copies: '32',
      bar: '100%',
      icon: 'shield',
      note: '32 total copies registered across blue archetypes.',
      barColor: 'bg-mana-blue'
    },
    {
      name: 'Brainstorm',
      type: 'Instant',
      pct: '91.6%',
      copies: '28',
      bar: '92%',
      icon: 'autorenew',
      note: 'The premier card selector of Legacy.',
      barColor: 'bg-mana-blue'
    },
    {
      name: 'Daze',
      type: 'Instant',
      pct: '58.3%',
      copies: '16',
      bar: '58%',
      icon: 'timer',
      note: '16 copies registered across Delver and combo lists.',
      barColor: 'bg-mana-blue'
    },
    {
      name: 'Lightning Bolt',
      type: 'Instant',
      pct: '41.7%',
      copies: '15',
      bar: '42%',
      icon: 'flash_on',
      note: 'Uncontested primary spot removal.',
      barColor: 'bg-mana-red'
    }
  ],
  sorceries: [
    {
      name: 'Ponder',
      type: 'Sorcery',
      pct: '83.3%',
      copies: '24',
      bar: '83%',
      icon: 'auto_awesome',
      note: 'Setup spell across every blue-based deck.',
      barColor: 'bg-mana-blue'
    },
    {
      name: 'Thoughtseize',
      type: 'Sorcery',
      pct: '50.0%',
      copies: '10',
      bar: '50%',
      icon: 'visibility_off',
      note: 'Hand disruption in black combo and midrange.',
      barColor: 'bg-mana-black'
    },
    {
      name: 'Cabal Therapy',
      type: 'Sorcery',
      pct: '41.7%',
      copies: '8',
      bar: '42%',
      icon: 'psychology',
      note: 'Flexible graveyard and hand interaction.',
      barColor: 'bg-mana-black'
    },
    {
      name: 'Hymn to Tourach',
      type: 'Sorcery',
      pct: '25.0%',
      copies: '5',
      bar: '25%',
      icon: 'remove_circle',
      note: 'Two-for-one discard pressure.',
      barColor: 'bg-mana-black'
    }
  ],
  artifacts: [
    {
      name: 'Mishra’s Bauble',
      type: 'Artifact',
      pct: '75.0%',
      copies: '20',
      bar: '75%',
      icon: 'radar',
      note: 'Cheap cantrip and Delver enabler.',
      barColor: 'bg-mana-blue'
    },
    {
      name: 'Urza’s Saga',
      type: 'Artifact',
      pct: '33.3%',
      copies: '12',
      bar: '33%',
      icon: 'fort',
      note: 'Mana and Constructs package in artifact shells.',
      barColor: 'bg-mana-white'
    },
    {
      name: 'Chalice of the Void',
      type: 'Artifact',
      pct: '25.0%',
      copies: '7',
      bar: '25%',
      icon: 'do_not_disturb',
      note: 'Lock piece against low-curved decks.',
      barColor: 'bg-mana-white'
    },
    {
      name: 'Null Rod',
      type: 'Artifact',
      pct: '16.7%',
      copies: '4',
      bar: '17%',
      icon: 'block',
      note: 'Sideboard answer to artifact mana.',
      barColor: 'bg-mana-white'
    }
  ],
  enchantments: [
    {
      name: 'Blood Moon',
      type: 'Enchantment',
      pct: '41.7%',
      copies: '9',
      bar: '42%',
      icon: 'local_fire_department',
      note: 'Mana denial against greedy manabases.',
      barColor: 'bg-mana-red'
    },
    {
      name: 'Sylvan Library',
      type: 'Enchantment',
      pct: '33.3%',
      copies: '6',
      bar: '33%',
      icon: 'menu_book',
      note: 'Card advantage engine in green decks.',
      barColor: 'bg-mana-green'
    },
    {
      name: 'Counterbalance',
      type: 'Enchantment',
      pct: '16.7%',
      copies: '3',
      bar: '17%',
      icon: 'rule',
      note: 'Soft lock with predictable curves.',
      barColor: 'bg-mana-blue'
    },
    {
      name: 'Leyline of the Void',
      type: 'Enchantment',
      pct: '16.7%',
      copies: '3',
      bar: '17%',
      icon: 'vpn_lock',
      note: 'Graveyard hate from the opening hand.',
      barColor: 'bg-mana-black'
    }
  ],
  planeswalkers: [
    {
      name: 'Liliana of the Veil',
      type: 'Planeswalker',
      pct: '16.7%',
      copies: '2',
      bar: '17%',
      icon: 'savings',
      note: 'Discard and edict pressure in midrange.',
      barColor: 'bg-mana-black'
    },
    {
      name: 'Jace, the Mind Sculptor',
      type: 'Planeswalker',
      pct: '16.7%',
      copies: '2',
      bar: '17%',
      icon: 'psychology',
      note: 'Late game control closure.',
      barColor: 'bg-mana-blue'
    }
  ],
  lands: [
    {
      name: 'Wasteland',
      type: 'Land',
      pct: '83.3%',
      copies: '26',
      bar: '83%',
      icon: 'landscape',
      note: 'Ubiquitous mana denial engine.',
      barColor: 'bg-arcane-gold'
    },
    {
      name: 'Volcanic Island',
      type: 'Land',
      pct: '66.7%',
      copies: '16',
      bar: '67%',
      icon: 'water_drop',
      note: 'Registered across URx tempo and Sneak.',
      barColor: 'bg-mana-blue'
    },
    {
      name: 'Urza’s Saga',
      type: 'Land',
      pct: '33.3%',
      copies: '12',
      bar: '33%',
      icon: 'fort',
      note: 'Eldrazi and artifact packages.',
      barColor: 'bg-mana-white'
    },
    {
      name: 'Cloudpost',
      type: 'Land',
      pct: '16.7%',
      copies: '8',
      bar: '17%',
      icon: 'villa',
      note: 'Both 12-Post entries in the field.',
      barColor: 'bg-mana-green'
    }
  ]
};

const fallbackStandings: StandingRow[] = [
  {
    rank: 1,
    player: 'Carles Mesegue',
    club: 'Lliga del Vallès #1 Seed',
    tier: 'Winner',
    archetype: 'Temur Delver',
    note: 'Aggro-Control / Questing Druid',
    record: '5-0-1',
    colors: ['U', 'R', 'G']
  },
  {
    rank: 2,
    player: 'Miguel Ángel Rodríguez',
    club: 'Rubí Circuit',
    tier: 'Finalist',
    archetype: 'Sneak & Show',
    note: 'Show and Tell / Atraxa',
    record: '4-1-1',
    colors: ['U', 'R']
  },
  {
    rank: 3,
    player: 'Sergio Olivencia',
    club: 'Terrassa Legacy',
    tier: 'Semi',
    archetype: 'Cephalid Combo',
    note: 'Breakfast / Oracle Kill',
    record: '4-1-0',
    colors: ['U', 'B']
  },
  {
    rank: 4,
    player: 'Aitor Galian',
    club: 'Sabadell Grinders',
    tier: 'Semi',
    archetype: 'Izzet Delver',
    note: 'DRC & Murktide Regent',
    record: '3-1-1',
    colors: ['U', 'R']
  },
  {
    rank: 5,
    player: 'Toni Garcia',
    club: 'Granollers MTG',
    tier: 'Quarter',
    archetype: 'Cloudpost Ramp',
    note: '12-Post / Primeval Titan',
    record: '3-1-0',
    colors: ['G', 'C']
  },
  {
    rank: 6,
    player: 'David Castillo',
    club: 'Mataró Circuit',
    tier: 'Quarter',
    archetype: 'Eldrazi Aggro',
    note: 'Chalice of the Void / Smasher',
    record: '2-2-0',
    colors: ['C']
  },
  {
    rank: 7,
    player: 'Sergi Juan De La Cruz',
    club: 'Barcelona Central',
    tier: 'Quarter',
    archetype: 'Nadu Combo',
    note: 'Winged Wisdom / Shuko',
    record: '2-2-0',
    colors: ['G', 'U']
  },
  {
    rank: 8,
    player: 'Adrian Zapata',
    club: 'Mollet del Vallès',
    tier: 'Quarter',
    archetype: 'TES (The EPIC Storm)',
    note: 'Storm / Wishclaw Talisman',
    record: '2-2-0',
    colors: ['B', 'R']
  }
];

const manaColorClass: Record<string, string> = {
  U: 'bg-mana-blue',
  B: 'bg-mana-black',
  R: 'bg-mana-red',
  G: 'bg-mana-green',
  W: 'bg-mana-white',
  C: 'bg-mana-white'
};

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

const heroImageUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB30GucoVkweiQP9-99mooAsJKrsAKfCcVebEmTH_UoToNz2ifxq58btngY7e9FmSfj7_q1ZKRlabV6X62GbC1AX5j8uPzQFCPr6CKWIczO88gYGjUXq7dNewByStIbG7KoM2aKasZe3lJDYmzmGZa2IxuPvJ1ZChdEy3S10o_dHxYDVq3Df6EkV77OY6UfKNXt_K8wy0k75K_cfPbyoUet_5LI9JaihzBoweMKQA4';

const metaSegments = [
  {
    label: 'Combo (Sneak, Nadu, TES, Ceph)',
    count: 4,
    pct: '33.3%',
    color: 'bg-mana-blue',
    dash: '95.4 193.6',
    offset: '0'
  },
  {
    label: 'Delver Tempo (UR / Temur)',
    count: 3,
    pct: '25.0%',
    color: 'bg-primary-container',
    dash: '72.25 216.75',
    offset: '-95.4'
  },
  {
    label: 'Stompy & Eldrazi Aggro',
    count: 3,
    pct: '25.0%',
    color: 'bg-mana-black',
    dash: '72.25 216.75',
    offset: '-167.65'
  },
  {
    label: 'Big Mana (Cloudpost 12-Post)',
    count: 2,
    pct: '16.7%',
    color: 'bg-mana-green',
    dash: '49.1 239.9',
    offset: '-239.9'
  }
];

const TournamentComponent = ({
  id,
  initialTournament
}: TournamentComponentProps) => {
  const params = useParams<{id: string}>();
  const currentId = params.id || id;
  const tHeader = useTranslations('header');
  const [tournament, setTournament] =
    useState<TournamentType>(initialTournament);
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [activeCardTab, setActiveCardTab] = useState<CardTabKey>('all');
  const [deckModal, setDeckModal] = useState<DeckModalState>(null);
  const [copied, setCopied] = useState(false);
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
  const format = getFormat(tournament.format);

  const openDeckModal = (row: StandingRow): void => {
    setDeckModal({
      player: row.player,
      archetype: row.archetype,
      record: row.record,
      colors: row.colors.join('')
    });
  };

  const closeDeckModal = (): void => setDeckModal(null);

  const copyDeckToClipboard = async (): Promise<void> => {
    if (!deckModal) return;

    const text = [
      `${deckModal.player} — ${deckModal.archetype} (${deckModal.colors})`,
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
    <div className="tournament-detail flex flex-col gap-space-xl">
      <div className="absolute -top-40 left-1/2 h-[350px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-container/10 via-secondary-container/5 to-transparent blur-3xl" />

      <Breadcrumb
        ariaLabel={tHeader('breadcrumb.tournament')}
        items={[
          {href: '/', icon: 'home', label: tHeader('breadcrumb.home')},
          {
            href: `${endpoints.HTTP_LEAGUE}${tournament.idLeague}`,
            label: tHeader('breadcrumb.league')
          },
          {
            label: `${tournament.leagueName} ${tournament.year} — ${tournament.name}`
          }
        ]}
      />

      <section className="relative overflow-hidden rounded-xl bg-surface-card p-space-md shadow-xl md:p-space-xl">
        <div className="absolute -right-16 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary-container/10 via-mana-blue/5 to-transparent blur-2xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 flex w-1/3 items-center justify-end overflow-hidden pr-6 opacity-5">
          <span className="material-symbols-outlined select-none text-[240px] text-white">
            military_tech
          </span>
        </div>

        <div className="relative z-10 flex flex-col justify-between gap-space-lg lg:flex-row lg:items-end">
          <div className="flex max-w-2xl flex-col gap-space-sm">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="flex items-center gap-1 rounded-full bg-primary-container/20 px-2.5 py-1 text-label-sm font-label-sm uppercase tracking-wider text-primary-fixed">
                <span className="material-symbols-outlined text-[13px] text-primary">
                  verified
                </span>
                Verified Circuit Event
              </span>
              <span className="rounded-full bg-surface-elevated px-2.5 py-1 text-label-sm font-label-sm uppercase tracking-wider text-mana-blue">
                Sanctioned {format}
              </span>
              <span className="rounded bg-surface-container-high px-2 py-0.5 font-stat-mono text-[11px] text-mana-black">
                EVENT ID: #{currentId}
              </span>
            </div>

            <h1 className="font-headline-lg text-headline-lg tracking-tight text-mana-white">
              {title}
            </h1>
            <p className="font-body-md text-body-md leading-relaxed text-mana-black">
              Official Catalan circuit regular stage hosted at Vallès Gaming
              Club. Complete 4-round Swiss bracket featuring cut to
              single-elimination Top 4 with full verified deck registrations.
            </p>

            <div className="grid grid-cols-2 gap-space-sm pt-space-xs sm:grid-cols-4">
              <div className="flex flex-col rounded-lg bg-surface-base/80 p-2.5">
                <span className="font-label-sm text-label-sm uppercase text-mana-black">
                  Format
                </span>
                <span className="font-headline-sm text-headline-sm text-mana-white">
                  {format}
                </span>
              </div>
              <div className="flex flex-col rounded-lg bg-surface-base/80 p-2.5">
                <span className="font-label-sm text-label-sm uppercase text-mana-black">
                  Date
                </span>
                <span className="font-headline-sm text-headline-sm text-mana-white">
                  {tournament.date}
                </span>
              </div>
              <div className="flex flex-col rounded-lg bg-surface-base/80 p-2.5">
                <span className="font-label-sm text-label-sm uppercase text-mana-black">
                  Attendance
                </span>
                <span className="font-headline-sm text-headline-sm text-primary">
                  {tournament.players} Players
                </span>
              </div>
              <div className="flex flex-col rounded-lg bg-surface-base/80 p-2.5">
                <span className="font-label-sm text-label-sm uppercase text-mana-black">
                  Structure
                </span>
                <span className="font-headline-sm text-headline-sm text-mana-white">
                  4 Rd + Top 4
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-stretch gap-space-sm sm:flex-row lg:items-center">
            <button
              className="group flex items-center justify-center gap-2 rounded-lg bg-surface-elevated px-4 py-2.5 font-label-lg text-label-lg text-mana-white shadow-sm transition-all hover:bg-surface-container-high active:scale-95"
              onClick={() => setExportKind('meta')}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-mana-blue transition-transform group-hover:rotate-12">
                table_chart
              </span>
              <span>
                {exportKind === 'meta' ? 'Exporting CSV...' : 'Metagame Sheet'}
              </span>
            </button>
            <button
              className="flex items-center justify-center gap-2 rounded-lg bg-primary-container px-4 py-2.5 font-label-lg text-label-lg text-white shadow-lg shadow-primary-container/20 transition-all hover:bg-primary-container/90 active:scale-95"
              onClick={() => setExportKind('decks')}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {exportKind === 'decks' ? 'done_all' : 'download'}
              </span>
              <span>
                {exportKind === 'decks'
                  ? 'Zipping Decks...'
                  : 'Export Decklists (.txt)'}
              </span>
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 items-start gap-space-lg lg:grid-cols-12">
        <section className="flex flex-col gap-space-md lg:col-span-8">
          <div className="flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-primary">
                leaderboard
              </span>
              <h2 className="font-headline-sm text-headline-sm text-mana-white">
                Top 8 Standings &amp; Decks
              </h2>
            </div>
            <span className="font-label-sm text-label-sm uppercase text-mana-black">
              Stage 3 Playoff Cut
            </span>
          </div>

          <div className="overflow-hidden rounded-xl bg-surface-card shadow-xl">
            <div className="grid grid-cols-12 bg-surface-elevated/70 px-space-md py-3 font-label-sm text-label-sm uppercase tracking-wider text-mana-black">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-4 md:col-span-4">Player</div>
              <div className="col-span-5 md:col-span-5">Archetype / Colors</div>
              <div className="hidden text-right font-stat-mono md:col-span-1 md:block">
                Rec
              </div>
              <div className="col-span-2 text-right md:col-span-1">Action</div>
            </div>

            <div className="divide-y divide-surface-container-highest/20">
              {standings.map((row) => (
                <div
                  className={`group grid grid-cols-12 items-center px-space-md py-3.5 transition-colors hover:bg-surface-elevated/50 ${row.rank === 1 ? 'bg-arcane-gold/5' : ''}`}
                  key={row.rank}
                >
                  <div className="col-span-1 flex items-center justify-center">
                    {row.rank === 1 ? (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-arcane-gold/20 font-stat-mono text-[13px] font-bold text-arcane-gold shadow-[0_0_10px_rgba(234,179,8,0.25)]">
                        <span
                          className="material-symbols-outlined text-[15px]"
                          style={{fontVariationSettings: '"FILL" 1'}}
                        >
                          emoji_events
                        </span>
                      </div>
                    ) : (
                      <span className="font-stat-mono text-label-lg font-bold text-mana-black">
                        {row.rank}
                      </span>
                    )}
                  </div>

                  <div className="col-span-4 flex flex-col pr-2 md:col-span-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-headline-sm text-body-lg font-semibold text-mana-white transition-colors group-hover:text-primary">
                        {row.player}
                      </span>
                      <span
                        className={`rounded px-1.5 py-[2px] text-[10px] font-bold uppercase tracking-wider ${row.rank === 1 ? 'bg-arcane-gold/20 text-arcane-gold' : 'bg-surface-container-high text-mana-black'}`}
                      >
                        {row.tier}
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-mana-black">
                      {row.club}
                    </span>
                  </div>

                  <div className="col-span-5 flex items-center gap-2 pr-2 md:col-span-5">
                    <div className="flex items-center -space-x-1">
                      {row.colors.map((color, index) => (
                        <span
                          className={`h-3.5 w-3.5 rounded-full ring-1 ring-surface-base ${manaColorClass[color]}`}
                          key={`${row.rank}-${color}-${index}`}
                          title={color}
                        />
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-mana-white">
                        {row.archetype}
                      </span>
                      <span className="font-body-sm text-body-sm text-mana-black">
                        {row.note}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`hidden text-right font-stat-mono text-[14px] font-bold md:col-span-1 md:block ${row.rank === 1 ? 'text-mana-green' : 'text-on-surface'}`}
                  >
                    {row.record}
                  </div>

                  <div className="col-span-2 flex justify-end md:col-span-1">
                    <button
                      className="flex items-center gap-1 rounded bg-surface-elevated px-2.5 py-1.5 font-label-md text-label-md text-mana-white transition-all hover:bg-primary-container hover:text-white"
                      onClick={() => openDeckModal(row)}
                      title="View Registered Decklist"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        style
                      </span>
                      <span className="hidden sm:inline">Deck</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-space-md lg:col-span-4">
          <div className="flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-mana-blue">
                pie_chart
              </span>
              <h2 className="font-headline-sm text-headline-sm text-mana-white">
                Metagame Share
              </h2>
            </div>
            <span className="font-label-sm text-label-sm text-primary">
              N={tournament.players} Decks
            </span>
          </div>

          <div className="flex flex-col gap-space-md rounded-xl bg-surface-card p-space-md shadow-xl">
            <div className="relative flex items-center justify-center py-2">
              <svg className="h-48 w-48 -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="46"
                  stroke="#1c2025"
                  strokeWidth="16"
                />
                {metaSegments.map((segment) => (
                  <circle
                    cx="60"
                    cy="60"
                    fill="transparent"
                    key={segment.label}
                    r="46"
                    stroke={
                      segment.color === 'bg-primary-container'
                        ? '#F97316'
                        : segment.color === 'bg-mana-blue'
                          ? '#06B6D4'
                          : segment.color === 'bg-mana-black'
                            ? '#94A3B8'
                            : '#10B981'
                    }
                    strokeDasharray={segment.dash}
                    strokeDashoffset={segment.offset}
                    strokeWidth="16"
                  />
                ))}
              </svg>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-headline-lg text-headline-lg text-mana-white">
                  {tournament.players}
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-mana-black">
                  Decks
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm">
              {metaSegments.map((segment) => (
                <div
                  className="flex items-center justify-between rounded bg-surface-elevated/40 p-2"
                  key={segment.label}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-3 w-3 rounded-full ${segment.color} shadow-[0_0_8px_rgba(6,182,212,0.6)]`}
                    />
                    <span className="font-label-md text-label-md text-mana-white">
                      {segment.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-stat-mono text-[13px] text-mana-white">
                      {segment.count}
                    </span>
                    <span className="font-stat-mono text-[12px] text-mana-black">
                      {segment.pct}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="group relative h-40 overflow-hidden rounded-lg bg-surface-base shadow-md">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{backgroundImage: `url("${heroImageUrl}")`}}
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-surface-base via-surface-base/60 to-transparent p-3">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-arcane-gold">
                  Champion Tech Highlight
                </span>
                <span className="font-headline-sm text-headline-sm text-mana-white">
                  Questing Druid in Temur Delver
                </span>
                <p className="truncate font-body-sm text-body-sm text-mana-black">
                  Card advantage engine propelling Carles Mesegue to 5-0-1
                  finish.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="flex flex-col gap-space-lg pt-space-md">
        <div className="flex flex-col justify-between gap-space-sm md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-primary">
                analytics
              </span>
              <h2 className="font-headline-lg text-headline-lg text-mana-white">
                Stage 3 Card Breakdown
              </h2>
            </div>
            <p className="font-body-md text-body-md text-mana-black">
              Card registration frequencies across all {tournament.players}{' '}
              submitted decklists (Maindeck &amp; Sideboard)
            </p>
          </div>

          <div className="flex max-w-full items-center gap-1.5 overflow-x-auto rounded-xl border-subtle bg-surface-card p-1.5">
            {cardTabs.map((tab) => {
              const active = activeCardTab === tab.key;

              return (
                <button
                  className={`card-tab flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 font-label-md text-label-md transition-all ${active ? 'bg-primary-container font-bold text-white shadow-sm' : 'text-mana-black hover:bg-surface-elevated hover:text-mana-white'}`}
                  id={`tab-${tab.key}`}
                  key={tab.key}
                  onClick={() => setActiveCardTab(tab.key)}
                  type="button"
                >
                  <span>{tab.label}</span>
                  <span
                    className={`flex items-center gap-1 rounded px-1.5 py-0.5 font-stat-mono text-[10px] ${active ? 'bg-black/80' : 'bg-surface-elevated'}`}
                  >
                    <span className="font-bold text-white">{tab.total}</span>
                    <span className="text-mana-black">|</span>
                    <span className="text-mana-blue">MB: {tab.mainboard}</span>
                    <span className="text-mana-black">·</span>
                    <span className="text-arcane-gold">
                      SB: {tab.sideboard}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-surface-card rounded-xl p-3 border-subtle flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-mana-blue">
                view_agenda
              </span>
              <span className="font-label-md text-label-md text-mana-white">
                Circuit Deck Registration Matrix
              </span>
            </div>
            <span className="hidden text-surface-container-highest sm:inline">
              |
            </span>
            <div className="flex items-center gap-2 font-stat-mono text-[12px]">
              <span className="flex items-center gap-1 rounded bg-mana-blue/20 px-2 py-0.5 font-bold text-mana-blue">
                <span className="h-1.5 w-1.5 rounded-full bg-mana-blue" />
                Mainboard: 480 total (80.0%)
              </span>
              <span className="flex items-center gap-1 rounded bg-arcane-gold/20 px-2 py-0.5 font-bold text-arcane-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-arcane-gold" />
                Sideboard: 120 total (20.0%)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 font-body-sm text-body-sm text-mana-black">
            <span className="material-symbols-outlined text-[16px] text-mana-black">
              info
            </span>
            <span>Across {tournament.players} submitted decklists</span>
          </div>
        </div>

        <div
          className="grid grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-4"
          id="cards-container"
        >
          {cardData[activeCardTab].map((card) => (
            <div
              className="card-item group flex flex-col justify-between rounded-xl bg-surface-card p-space-md shadow-md transition-all hover:bg-surface-elevated/70"
              key={card.name}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-surface-elevated px-2 py-0.5 text-[11px] font-bold uppercase text-mana-white">
                    {card.type}
                  </span>
                  <span className="font-stat-mono text-label-sm font-bold text-primary">
                    {card.pct} Decks
                  </span>
                </div>
                <span className="font-headline-sm text-headline-sm text-mana-white transition-colors group-hover:text-primary">
                  {card.name}
                </span>
                <p className="font-body-sm text-body-sm text-mana-black">
                  {card.note}
                </p>
                <div className="flex items-center gap-1.5 pt-1 font-stat-mono text-[11px]">
                  <span
                    className={`rounded px-2 py-0.5 font-semibold ${card.main ? 'bg-mana-blue/20 text-mana-blue' : 'bg-surface-elevated text-mana-black'}`}
                  >
                    {card.main || '0 MB'}
                  </span>
                  <span className="text-surface-container-highest">/</span>
                  <span
                    className={`rounded px-2 py-0.5 font-bold ${card.side ? 'bg-arcane-gold/20 text-arcane-gold' : 'bg-surface-elevated text-mana-black'}`}
                  >
                    {card.side || '0 SB'}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-subtle pt-3">
                <div className="flex items-center gap-1.5">
                  <div className="flex h-2 w-16 overflow-hidden rounded-full bg-surface-container-high">
                    {card.main && card.side ? (
                      <>
                        <div
                          className="h-full bg-mana-blue"
                          style={{width: card.mainWidth}}
                        />
                        <div
                          className="h-full bg-arcane-gold"
                          style={{width: card.sideWidth}}
                        />
                      </>
                    ) : (
                      <div
                        className={`h-full ${card.barColor}`}
                        style={{width: card.bar}}
                      />
                    )}
                  </div>
                  <span className="font-stat-mono text-[12px] text-mana-white">
                    {card.copies}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-mana-black transition-colors group-hover:text-primary">
                  {card.icon}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center justify-between gap-space-md rounded-xl bg-surface-card p-space-md shadow-lg sm:flex-row">
        <div className="flex items-center gap-space-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-elevated text-primary">
            <span className="material-symbols-outlined text-[20px]">
              location_on
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg text-mana-white">
              Host Venue: Club Magic Vallès
            </span>
            <span className="font-body-sm text-body-sm text-mana-black">
              Carrer Major 42, Granollers • Catalan Legacy Association Certified
            </span>
          </div>
        </div>
      </section>

      {deckModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={closeDeckModal}
        >
          <div
            className="flex max-h-[870px] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-surface-card shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-surface-elevated p-space-md">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className="font-headline-sm text-headline-sm text-mana-white"
                    id="modal-player-name"
                  >
                    {deckModal.player}
                  </span>
                  <span
                    className="rounded bg-primary-container/20 px-2 py-0.5 font-stat-mono text-label-sm text-primary-fixed"
                    id="modal-record"
                  >
                    {deckModal.record}
                  </span>
                </div>
                <span
                  className="font-body-sm text-body-sm text-mana-blue"
                  id="modal-deck-archetype"
                >
                  {deckModal.archetype} ({deckModal.colors})
                </span>
              </div>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container-high text-mana-black transition-colors hover:bg-surface-container-highest hover:text-white"
                onClick={closeDeckModal}
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
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-label-md text-label-md text-mana-white">
                      Maindeck (60 Cards)
                    </span>
                    <span className="font-label-sm text-label-sm text-mana-black">
                      Legacy Format
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-lg bg-surface-base p-3 font-stat-mono text-[13px] text-on-surface/90">
                    {maindeck.map((line, index) => (
                      <p
                        className={
                          line.includes('(')
                            ? 'mt-2 text-[11px] font-bold uppercase tracking-wider ' +
                              (line.startsWith('Creature')
                                ? 'text-mana-blue'
                                : line.startsWith('Spells')
                                  ? 'text-mana-red'
                                  : 'text-mana-green')
                            : ''
                        }
                        key={`${line}-${index}`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-label-md text-label-md text-mana-white">
                      Sideboard (15 Cards)
                    </span>
                    <span className="font-label-sm text-label-sm text-mana-black">
                      Sideboard Tech
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-lg bg-surface-base p-3 font-stat-mono text-[13px] text-on-surface/90">
                    {sideboard.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  <button
                    className="mt-2 flex w-full items-center justify-center gap-1.5 rounded bg-surface-elevated py-2 font-label-md text-label-md text-mana-white transition-all hover:bg-surface-container-high"
                    onClick={copyDeckToClipboard}
                    type="button"
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${copied ? 'text-mana-green' : ''}`}
                    >
                      {copied ? 'check' : 'content_copy'}
                    </span>
                    <span>
                      {copied
                        ? 'Copied to Clipboard!'
                        : 'Copy Decklist to MTGO/Arena'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-surface-elevated/50 p-space-md">
              <span className="font-label-sm text-label-sm text-mana-black">
                Catalan MTG Circuit Verified Registration
              </span>
              <button
                className="rounded bg-primary-container px-4 py-1.5 font-label-md text-label-md text-white"
                onClick={closeDeckModal}
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

export default TournamentComponent;
