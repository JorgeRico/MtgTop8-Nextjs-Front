'use client';

import './module.css';

import Link from 'next/link';
import {useEffect, useMemo, useState} from 'react';
import endpoints from '@/types/server/endpoints';

type CardEntry = {
  name: string;
  count: string;
  typeLine: string;
  cost: string;
  cmc: string;
  mana: string[];
  oracle: string;
  image: string;
  note?: string;
};

type DeckCardEntry = CardEntry & {
  qty: number;
};

type PreviewCard = {
  name: string;
  cost: string;
  type: string;
  oracle: string;
  image: string;
};

type CardSection = {
  title: string;
  count: string;
  accent: string;
  cards: CardEntry[];
};

type ViewMode = 'table' | 'visual';

type BarItem = {
  label: string;
  value: string;
  width: number;
  color: string;
};

type Matchup = {
  name: string;
  result: string;
  badgeClass: string;
  plan: string;
};

const manaPipColors: Record<string, string> = {
  W: 'bg-[#f8fafc] text-[#0f172a]',
  U: 'bg-[#0ea5e9] text-white',
  B: 'bg-[#475569] text-white',
  R: 'bg-[#ef4444] text-white',
  G: 'bg-[#10b981] text-[#052e16]',
  C: 'bg-surface-container-highest text-on-surface',
  X: 'bg-surface-container-highest text-on-surface',
  '0': 'bg-[#94a3b8] text-[#0b1120]',
  '1': 'bg-[#94a3b8] text-[#0b1120]',
  '2': 'bg-[#94a3b8] text-[#0b1120]',
  '3': 'bg-[#94a3b8] text-[#0b1120]',
  '4': 'bg-[#94a3b8] text-[#0b1120]'
};

const delverImage =
  'https://cards.scryfall.io/large/front/6/5/65d9b6b5-8b0e-4b1e-9b5f-0e2d1a6c1d4f.jpg?1675199284';
const channelerImage =
  'https://cards.scryfall.io/large/front/8/0/80dedb21-39f6-46f3-9a2e-f93594c30a18.jpg?1675199361';
const druidImage =
  'https://cards.scryfall.io/large/front/3/5/35a1c631-42b5-4b0d-a9d9-7dba2b4d3a77.jpg?1717012280';
const minscImage =
  'https://cards.scryfall.io/large/front/6/6/66d4e2f9-6f1a-4b1c-9f0a-6f0b1df7bcf6.jpg?1691500622';
const brainstormImage =
  'https://cards.scryfall.io/large/front/1/b/1b2a8f5b-2b6e-4d50-a5ff-2f9f6dc9d3f8.jpg?1562901037';
const forceWillImage =
  'https://cards.scryfall.io/large/front/5/a/5a7a5e1e-3421-4f9f-8f1b-7a6a1d9c1a1c.jpg?1559591576';
const dazeImage =
  'https://cards.scryfall.io/large/front/6/4/64d1c3e0-8a4e-4c5e-9d7a-9e2f8f6b0a2d.jpg?1562915927';
const boltImage =
  'https://cards.scryfall.io/large/front/a/2/a24b6dc0-8e1d-4a7a-b4a0-4d9ec19b3a9a.jpg?1675200104';
const pierceImage =
  'https://cards.scryfall.io/large/front/e/a/ea281b41-916c-4790-a5be-d5065cee0d75.jpg?1562942428';
const negationImage =
  'https://cards.scryfall.io/large/front/a/c/acbf10c0-3a07-4e48-a0b5-441f17638603.jpg?1562201396';
const ponderImage =
  'https://cards.scryfall.io/large/front/4/6/46f5a2cf-7532-4d1e-9a4b-8d2e8e1b1cc6.jpg?1559591501';
const iterationImage =
  'https://cards.scryfall.io/large/front/1/2/12c3f3b8-3b0d-4a5a-a9b0-2e8cbeb0a05e.jpg?1624591886';
const baubleImage =
  'https://cards.scryfall.io/large/front/e/0/e07d9f2c-9f1f-4d4f-a3a2-2c0a9f5a4d3a.jpg?1562639380';
const sylvanImage =
  'https://cards.scryfall.io/large/front/9/c/9cc4b0e5-3f0d-4b3a-a2a2-9b0e8a0e0a0a.jpg?1562555175';
const wastelandImage =
  'https://cards.scryfall.io/large/front/8/2/82f8b6a6-8f6f-4a1a-b6b4-8c9b7a1ccdf6.jpg?1562800018';
const tarnImage =
  'https://cards.scryfall.io/large/front/9/d/9d176c37-8f4a-4d8e-b3dc-949d4b0dd4d1.jpg?1559591572';
const deltaImage =
  'https://cards.scryfall.io/large/front/e/1/e1acdcbf-9dd7-4b1a-b8b2-4d5f7d1b1a2d.jpg?1562803549';
const volcanicImage =
  'https://cards.scryfall.io/large/front/3/7/37f7e1f1-8fa9-4b8a-a4d4-3aadfd27e7e9.jpg?1559591572';
const tropicalImage =
  'https://cards.scryfall.io/large/front/7/7/77dd7caf-a8f2-4a1c-a4a3-2e8e1e7a7d3f.jpg?1559591572';

const creatures: CardEntry[] = [
  {
    name: 'Delver of Secrets // Insectile Aberration',
    count: '4x',
    typeLine: 'Creature — Human Wizard (1/1 ➔ 3/2 Volador)',
    cost: '1U',
    cmc: 'CMC 1',
    mana: ['U'],
    oracle:
      'At the beginning of your upkeep, look at the top card of your library. You may reveal that card. If an instant or sorcery card is revealed this way, transform Delver of Secrets.',
    image: delverImage
  },
  {
    name: "Dragon's Rage Channeler",
    count: '4x',
    typeLine: 'Creature — Human Shaman (2/2 — Card Selection Engine)',
    cost: 'R',
    cmc: 'CMC 1',
    mana: ['R'],
    oracle:
      'Whenever you cast a noncreature spell, surveil 1. When this creature attacks, you may discard a card. If you do, draw a card.',
    image: channelerImage
  },
  {
    name: 'Questing Druid // Seek the Beast',
    count: '4x',
    typeLine: 'Creature / Aventura (Card Advantage Motor)',
    cost: '1G',
    cmc: 'CMC 2',
    mana: ['1', 'G'],
    oracle:
      'Whenever Questing Druid enters the battlefield or attacks, look at the top four cards of your library. You may put one card from among them into your hand.',
    image: druidImage
  }
];

const planeswalkers: CardEntry[] = [
  {
    name: 'Minsc & Boo, Timeless Heroes',
    count: '2x',
    typeLine: 'Planeswalker Llegendari — Top-end Finisher',
    cost: '2RG',
    cmc: 'CMC 4',
    mana: ['2', 'R', 'G'],
    oracle:
      'Whenever one or more creatures you control deal combat damage to a player, put a +1/+1 counter on Boo. You may remove three +1/+1 counters from among creatures you control and draw that many cards.',
    image: minscImage
  }
];

const instants: CardEntry[] = [
  {
    name: 'Brainstorm',
    count: '4x',
    typeLine: 'Instant — Roba 3 cartes i filtra robatoris',
    cost: 'U',
    cmc: 'CMC 1',
    mana: ['U'],
    oracle:
      'Draw three cards, then put two cards from your hand on top of your library in any order.',
    image: brainstormImage
  },
  {
    name: 'Force of Will',
    count: '4x',
    typeLine: 'Instant — Contraencanteri gratuït de referència',
    cost: '3UU',
    cmc: 'CMC 5 (0)',
    mana: ['3', 'U', 'U'],
    oracle:
      'You may pay 1 life and exile a blue card from your hand rather than pay this spell’s mana cost. Counter target spell.',
    image: forceWillImage
  },
  {
    name: 'Daze',
    count: '4x',
    typeLine: 'Instant — Tempo gratuït ambigualtat',
    cost: '1U',
    cmc: 'CMC 2 (0)',
    mana: ['1', 'U'],
    oracle:
      'You may return an Island you control to its owner’s hand rather than pay this spell’s mana cost. Counter target spell unless its controller pays 1.',
    image: dazeImage
  },
  {
    name: 'Lightning Bolt',
    count: '4x',
    typeLine: 'Instant — Removal i pus de cara',
    cost: 'R',
    cmc: 'CMC 1',
    mana: ['R'],
    oracle: 'Lightning Bolt deals 3 damage to any target.',
    image: boltImage
  },
  {
    name: 'Spell Pierce',
    count: '2x',
    typeLine: 'Instant — Protecció no-criatura per 1 manà',
    cost: 'U',
    cmc: 'CMC 1',
    mana: ['U'],
    oracle: 'Counter target noncreature spell unless its controller pays 1.',
    image: pierceImage
  },
  {
    name: 'Force of Negation',
    count: '2x',
    typeLine: 'Instant — Contraencanteri gratuït del cicle',
    cost: '1UU',
    cmc: 'CMC 3 (0)',
    mana: ['1', 'U', 'U'],
    oracle:
      'If it’s not your turn, you may exile a blue card from your hand rather than pay this spell’s mana cost. Counter target spell.',
    image: negationImage
  }
];

const sorceries: CardEntry[] = [
  {
    name: 'Ponder',
    count: '4x',
    typeLine: 'Sorcery — Cantrip de selecció',
    cost: 'U',
    cmc: 'CMC 1',
    mana: ['U'],
    oracle:
      'Look at the top three cards of your library, then put them back in any order. You may shuffle. Draw a card.',
    image: ponderImage
  },
  {
    name: 'Expressive Iteration',
    count: '2x',
    typeLine: 'Sorcery — Card advantage de dos colors',
    cost: 'UR',
    cmc: 'CMC 2',
    mana: ['U', 'R'],
    oracle:
      'Look at the top three cards of your library. Put one into your hand and the rest on the bottom in any order. Then exile a card from your graveyard.',
    image: iterationImage
  }
];

const artifacts: CardEntry[] = [
  {
    name: "Mishra's Bauble",
    count: '4x',
    typeLine: 'Artifact — Cantrip de delver',
    cost: '0',
    cmc: 'CMC 0',
    mana: ['0'],
    oracle:
      'Look at the top card of target player’s library. You may put that card on the bottom of that player’s library. Draw a card at the beginning of the next turn’s upkeep.',
    image: baubleImage
  },
  {
    name: 'Sylvan Library',
    count: '1x',
    typeLine: 'Enchantment — 1-of tech main',
    cost: '1G',
    cmc: 'CMC 2',
    mana: ['1', 'G'],
    oracle:
      'At the beginning of your draw step, you may draw two additional cards. If you do, choose two cards in your hand drawn this turn. For each of those cards, pay 4 life or put the card on top of your library.',
    image: sylvanImage,
    note: '1-OF TECH MAIN'
  }
];

const lands: CardEntry[] = [
  {
    name: 'Wasteland',
    count: '4x',
    typeLine: 'Land — Disrupció de mana',
    cost: '',
    cmc: 'TERRA',
    mana: [],
    oracle: 'Destroy target nonbasic land.',
    image: wastelandImage,
    note: 'Disrupció Mana'
  },
  {
    name: 'Scalding Tarn',
    count: '4x',
    typeLine: 'Land — Fetch UR',
    cost: '',
    cmc: 'TERRA',
    mana: ['U', 'R'],
    oracle:
      'Pay 1 life, sacrifice Scalding Tarn, and search your library for an Island or Mountain card, put it onto the battlefield, then shuffle.',
    image: tarnImage,
    note: 'Fetch UR'
  },
  {
    name: 'Polluted Delta',
    count: '4x',
    typeLine: 'Land — Fetch U',
    cost: '',
    cmc: 'TERRA',
    mana: ['U', 'B'],
    oracle:
      'Pay 1 life, sacrifice Polluted Delta, and search your library for an Island or Swamp card, put it onto the battlefield, then shuffle.',
    image: deltaImage,
    note: 'Fetch U'
  },
  {
    name: 'Volcanic Island',
    count: '3x',
    typeLine: 'Land — Dual U/R',
    cost: '',
    cmc: 'TERRA',
    mana: ['U', 'R'],
    oracle:
      'Volcanic Island enters the battlefield tapped unless you control two or fewer lands. It adds U or R.',
    image: volcanicImage,
    note: 'Reserved List Dual'
  },
  {
    name: 'Tropical Island',
    count: '2x',
    typeLine: 'Land — Dual U/G',
    cost: '',
    cmc: 'TERRA',
    mana: ['U', 'G'],
    oracle:
      'Tropical Island enters the battlefield tapped unless you control two or fewer lands. It adds G or U.',
    image: tropicalImage,
    note: 'Reserved List Dual (Mana Fix Verd)'
  }
];

const sideboardCards: CardEntry[] = [
  {
    name: 'Pyroblast',
    count: '3x',
    typeLine: 'Instant — Sideboard',
    cost: 'R',
    cmc: 'SB',
    mana: ['R'],
    oracle:
      'Choose one — Counter target spell if it is blue; or destroy target permanent if it is blue.',
    image:
      'https://cards.scryfall.io/large/front/0/8/08b2f8f0-3e2b-4b9a-9a2b-9f2e2b1c7c6d.jpg?1562371103'
  },
  {
    name: 'Red Elemental Blast',
    count: '2x',
    typeLine: 'Instant — Sideboard',
    cost: 'R',
    cmc: 'SB',
    mana: ['R'],
    oracle:
      'Choose one — Counter target blue spell; or destroy target blue permanent.',
    image:
      'https://cards.scryfall.io/large/front/5/1/51a1a7a6-5c1f-4b1e-9c4b-8e1e1f6a1b2c.jpg?1562912670'
  },
  {
    name: 'Surgical Extraction',
    count: '2x',
    typeLine: 'Instant — Sideboard',
    cost: 'B/P',
    cmc: 'SB',
    mana: ['B'],
    oracle:
      'Choose target card in a graveyard other than a basic land card. Search its controller’s graveyard, hand, and library for all cards with the same name as that card and exile them.',
    image:
      'https://cards.scryfall.io/large/front/2/1/21d7f5b2-1a2f-4d6c-8a9f-2c2b2f3f4f4f.jpg?1576384090'
  },
  {
    name: 'Meltdown',
    count: '2x',
    typeLine: 'Sorcery — Sideboard',
    cost: 'XR',
    cmc: 'SB',
    mana: ['X', 'R'],
    oracle: 'Destroy each artifact with mana value X or less.',
    image:
      'https://cards.scryfall.io/large/front/3/0/30b6b1a2-4d1e-4c3a-9a3a-2c4b0a1f2c6d.jpg?1562927797'
  },
  {
    name: 'Hydroblast',
    count: '2x',
    typeLine: 'Instant — Sideboard',
    cost: 'U',
    cmc: 'SB',
    mana: ['U'],
    oracle:
      'Choose one — Counter target spell if it is red; or destroy target permanent if it is red.',
    image:
      'https://cards.scryfall.io/large/front/8/2/82d4a7b8-5a3e-4b6e-8a9f-3c2f1d4e5f6a.jpg?1562929970'
  },
  {
    name: 'Submerge',
    count: '2x',
    typeLine: 'Instant — Sideboard',
    cost: '4U',
    cmc: 'SB',
    mana: ['4', 'U'],
    oracle:
      'You may reveal a Island card from your hand rather than pay this spell’s mana cost. Put target creature on top of its owner’s library.',
    image:
      'https://cards.scryfall.io/large/front/6/3/63e2d4c2-7d9f-4a4e-8e0f-4d2b1a3c5f6e.jpg?1562918569'
  },
  {
    name: 'Force of Vigor',
    count: '1x',
    typeLine: 'Instant — Sideboard',
    cost: '2G',
    cmc: 'SB',
    mana: ['2', 'G'],
    oracle:
      'If it’s not your turn, you may exile a green card from your hand rather than pay this spell’s mana cost. Destroy up to two target artifacts and/or enchantments.',
    image:
      'https://cards.scryfall.io/large/front/0/4/04a1d2b2-3f7c-4a4d-8f9a-1c2b3d4e5f6a.jpg?1562201448'
  },
  {
    name: "Grafdigger's Cage",
    count: '1x',
    typeLine: 'Artifact — Sideboard',
    cost: '1',
    cmc: 'SB',
    mana: ['1'],
    oracle:
      'Creature cards in graveyards and libraries can’t enter the battlefield. Players can’t cast spells from graveyards or libraries.',
    image:
      'https://cards.scryfall.io/large/front/5/0/5064a999-37f0-47b5-a954-3a9f4bfae254.jpg?1562001440'
  }
];

const deckCards: DeckCardEntry[] = [
  ...creatures,
  ...planeswalkers,
  ...instants,
  ...sorceries,
  ...artifacts,
  ...lands
].map((card) => ({...card, qty: Number.parseInt(card.count, 10)}));

const visualCards = [
  {
    name: 'Delver of Secrets',
    meta: '4x · 1U · 1/1 ➔ 3/2',
    image: delverImage,
    accent: 'text-primary',
    card: creatures[0]
  },
  {
    name: "Dragon's Rage Channeler",
    meta: '4x · R · 2/2',
    image: channelerImage,
    accent: 'text-secondary',
    card: creatures[1]
  },
  {
    name: 'Minsc & Boo',
    meta: '2x · 2RG · PW',
    image: minscImage,
    accent: 'text-tertiary',
    card: planeswalkers[0]
  },
  {
    name: 'Force of Will',
    meta: '4x · 3UU · Free counter',
    image: forceWillImage,
    accent: 'text-primary',
    card: instants[1]
  },
  {
    name: 'Volcanic Island',
    meta: '3x · U/R · Dual land',
    image: volcanicImage,
    accent: 'text-secondary',
    card: lands[3]
  }
];

const detailedSections: CardSection[] = [
  {
    title: 'Criatures (12)',
    count: '12 CARTES',
    accent: 'bg-primary',
    cards: creatures
  },
  {
    title: 'Planeswalkers (2)',
    count: '2 CARTES',
    accent: 'bg-tertiary',
    cards: planeswalkers
  },
  {
    title: 'Instantanis (20)',
    count: '20 CARTES',
    accent: 'bg-primary-container',
    cards: instants
  }
];

const compactSections: CardSection[] = [
  {
    title: 'Conjurs (6)',
    count: '6 CARTES',
    accent: 'bg-secondary',
    cards: sorceries
  },
  {
    title: 'Artefactes & Tech (5)',
    count: '5 CARTES',
    accent: 'bg-tertiary',
    cards: artifacts
  }
];

const manaCurve = [
  {label: '0', value: 4},
  {label: '1', value: 28},
  {label: '2', value: 6},
  {label: '3', value: 2},
  {label: '4+', value: 3}
];

const colorSources: BarItem[] = [
  {label: 'U', value: '52%', width: 52, color: 'bg-[#0ea5e9]'},
  {label: 'R', value: '28%', width: 28, color: 'bg-[#ef4444]'},
  {label: 'G', value: '20%', width: 20, color: 'bg-[#10b981]'}
];

const typeDistribution: BarItem[] = [
  {label: 'Instantani', value: '33% (20)', width: 33, color: 'bg-primary'},
  {label: 'Terra', value: '28% (17)', width: 28, color: 'bg-tertiary'},
  {label: 'Criatura', value: '20% (12)', width: 20, color: 'bg-secondary'},
  {label: 'Conjurs', value: '10% (6)', width: 10, color: 'bg-mana-blue'},
  {label: 'Artefacte', value: '7% (4)', width: 7, color: 'bg-outline'},
  {label: 'PW', value: '3% (2)', width: 3, color: 'bg-arcane-gold'}
];

const matchupGuide: Matchup[] = [
  {
    name: 'Delver Mirror',
    result: 'Favorable · 60/40',
    badgeClass: 'bg-mana-green/15 text-mana-green',
    plan: 'Controla el combat amb Bolt i Daze; porta Pyroblast i RED Blast per protegir el contraencanteri.'
  },
  {
    name: 'Control (UWx / Miracles)',
    result: 'Even · 50/50',
    badgeClass: 'bg-arcane-gold/15 text-arcane-gold',
    plan: 'Força el counter amb Wasteland i Daze. Submerge entra per Ground Pound i Birds.'
  },
  {
    name: 'Combo Storm / Show & Tell',
    result: 'Unfavorable · 40/60',
    badgeClass: 'bg-error/15 text-error',
    plan: 'Prioritza Force of Will i Surgical Extraction. Meltdown guanya jocs de Leaden Mace iartifacts.'
  },
  {
    name: 'Depths / Lands',
    result: 'Even · 50/50',
    badgeClass: 'bg-arcane-gold/15 text-arcane-gold',
    plan: 'Wasteland és la carta clau. Fes servir Surgical sobre Marit Lage abans de quedar sense resposta.'
  }
];

const fullTextDeckExport = `Deck: Temur Delver
Pilot: Carles Mesegue
Format: Legacy 1.5

Maindeck (60)
4 Delver of Secrets // Insectile Aberration
4 Dragon's Rage Channeler
4 Questing Druid // Seek the Beast
2 Minsc & Boo, Timeless Heroes
4 Brainstorm
4 Force of Will
4 Daze
4 Lightning Bolt
2 Spell Pierce
2 Force of Negation
4 Ponder
2 Expressive Iteration
4 Mishra's Bauble
1 Sylvan Library
4 Wasteland
4 Scalding Tarn
4 Polluted Delta
3 Volcanic Island
2 Tropical Island

Sideboard (15)
3 Pyroblast
2 Red Elemental Blast
2 Surgical Extraction
2 Meltdown
2 Hydroblast
2 Submerge
1 Force of Vigor
1 Grafdigger's Cage
`;

const ManaPips = ({
  symbols,
  className = ''
}: {
  symbols: string[];
  className?: string;
}) => (
  <span className={`inline-flex items-center gap-1 ${className}`}>
    {symbols.map((symbol, index) => (
      <span
        key={`${symbol}-${index}`}
        className={`inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-black shadow-sm ring-1 ring-white/10 ${manaPipColors[symbol] ?? manaPipColors.C}`}
      >
        {symbol}
      </span>
    ))}
  </span>
);

const DetailedCardRow = ({
  card,
  onPreview
}: {
  card: CardEntry;
  onPreview: (card: CardEntry) => void;
}) => (
  <button
    type="button"
    className="group flex w-full cursor-pointer items-center gap-4 rounded-lg bg-surface-container-lowest p-3 text-left transition-all hover:-translate-y-0.5 hover:bg-surface-container-low hover:shadow-md"
    onClick={() => onPreview(card)}
  >
    <span className="relative h-[68px] w-[48px] shrink-0 overflow-hidden rounded-md bg-surface-container-high shadow-md ring-1 ring-white/10">
      <img
        alt={card.name}
        className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        src={card.image}
      />
    </span>
    <span className="min-w-0 flex-1">
      <span className="flex flex-wrap items-center gap-2">
        <span className="font-headline-sm text-headline-sm text-mana-white">
          {card.name}
        </span>
        <ManaPips symbols={card.mana} />
      </span>
      <span className="mt-1 block font-body-sm text-body-sm text-mana-black">
        {card.typeLine}
      </span>
      <span className="mt-1 block font-body-xs text-body-xs text-secondary">
        {card.cost}
      </span>
    </span>
    <span className="flex shrink-0 flex-col items-end gap-1">
      <span className="rounded bg-surface-container-high px-2 py-1 font-label-sm text-label-sm text-on-surface-variant">
        {card.cmc}
      </span>
      <span className="font-label-sm text-label-sm text-primary">
        {card.count}
      </span>
    </span>
  </button>
);

const CompactCardRow = ({
  card,
  onPreview
}: {
  card: CardEntry;
  onPreview: (card: CardEntry) => void;
}) => (
  <button
    type="button"
    className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-outline-variant/20 bg-surface-container-lowest/60 px-3 py-2.5 transition hover:border-secondary/40 hover:bg-surface-container-low/60"
    onClick={() => onPreview(card)}
  >
    <span className="flex min-w-0 items-center gap-2">
      <span className="truncate font-body-md text-body-md text-mana-white">
        {card.count} {card.name}
      </span>
      <ManaPips symbols={card.mana} />
    </span>
    <span className="material-symbols-outlined shrink-0 text-[14px] text-outline">
      open_in_new
    </span>
  </button>
);

const LandCardRow = ({
  card,
  onPreview
}: {
  card: CardEntry;
  onPreview: (card: CardEntry) => void;
}) => (
  <button
    type="button"
    className="group flex w-full cursor-pointer items-center justify-between rounded-lg bg-surface-container-lowest p-2.5 transition hover:bg-surface-container-low"
    onClick={() => onPreview(card)}
  >
    <span className="flex min-w-0 items-center gap-2">
      <span className="h-2 w-2 shrink-0 rounded-full bg-mana-blue/50 ring-2 ring-mana-blue/10 transition-all group-hover:bg-mana-blue"></span>
      <span className="truncate font-body-md text-body-md text-mana-white">
        {card.count} {card.name}
      </span>
      <ManaPips symbols={card.mana} />
    </span>
    <span className="ml-2 shrink-0 font-label-sm text-label-sm text-outline">
      {card.note}
    </span>
  </button>
);

const DetailSection = ({
  section,
  onPreview
}: {
  section: CardSection;
  onPreview: (card: CardEntry) => void;
}) => (
  <section className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container/40 shadow-lg">
    <header className="flex items-center justify-between border-b border-outline-variant/15 bg-surface-container-low/40 px-5 py-3">
      <h3 className="flex items-center gap-2 font-headline-sm text-headline-sm text-mana-white">
        <span className={`h-2 w-2 rounded-full ${section.accent}`}></span>
        {section.title}
      </h3>
      <span className="font-label-sm text-label-sm text-outline">
        {section.count}
      </span>
    </header>
    <div className="space-y-2 p-3">
      {section.cards.map((card) => (
        <DetailedCardRow
          key={`${section.title}-${card.name}`}
          card={card}
          onPreview={onPreview}
        />
      ))}
    </div>
  </section>
);

const CompactSection = ({
  section,
  onPreview
}: {
  section: CardSection;
  onPreview: (card: CardEntry) => void;
}) => (
  <section className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container/40 shadow-lg">
    <header className="flex items-center justify-between border-b border-outline-variant/15 bg-surface-container-low/40 px-5 py-3">
      <h3 className="flex items-center gap-2 font-headline-sm text-headline-sm text-mana-white">
        <span className={`h-2 w-2 rounded-full ${section.accent}`}></span>
        {section.title}
      </h3>
      <span className="font-label-sm text-label-sm text-outline">
        {section.count}
      </span>
    </header>
    <div className="grid grid-cols-1 gap-2 p-3 md:grid-cols-2">
      {section.cards.map((card) => (
        <CompactCardRow
          key={`${section.title}-${card.name}`}
          card={card}
          onPreview={onPreview}
        />
      ))}
    </div>
  </section>
);

const DecklistDetail = () => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [preview, setPreview] = useState<PreviewCard>({
    name: 'Delver of Secrets',
    cost: '1U',
    type: creatures[0].typeLine,
    oracle: creatures[0].oracle,
    image: delverImage
  });
  const [handOpen, setHandOpen] = useState(false);
  const [hand, setHand] = useState<CardEntry[]>([]);

  const deckPool = useMemo(
    () =>
      deckCards.flatMap(({qty, ...card}) =>
        Array.from({length: qty}, () => card)
      ),
    []
  );

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const showCardPreview = (card: CardEntry) => {
    setPreview({
      name: card.name.split(' // ')[0],
      cost: card.cost,
      type: card.typeLine,
      oracle: card.oracle,
      image: card.image
    });
  };

  const copyDecklist = async () => {
    try {
      await navigator.clipboard.writeText(fullTextDeckExport);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const downloadTextDecklist = () => {
    const blob = new Blob([fullTextDeckExport], {
      type: 'text/plain;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'temur-delver-carles-mesegue.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const generateSampleHand = () => {
    const shuffled = [...deckPool];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [
        shuffled[swapIndex],
        shuffled[index]
      ];
    }

    setHand(shuffled.slice(0, 7));
  };

  const openHandSimulator = () => {
    generateSampleHand();
    setHandOpen(true);
  };

  const toggleViewMode = (mode: ViewMode) => setViewMode(mode);

  return (
    <div className="deck-detail-stats w-full">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 font-label-sm text-label-sm text-outline"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 transition hover:text-primary"
          >
            <span className="material-symbols-outlined text-[14px]">home</span>
            Inici
          </Link>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <Link
            href={endpoints.HTTP_TOURNAMENT}
            className="transition hover:text-primary"
          >
            Tornejos
          </Link>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <Link
            href={`${endpoints.HTTP_TOURNAMENT}34`}
            className="transition hover:text-primary"
          >
            Lliga del Vallès #34
          </Link>
          <span className="material-symbols-outlined text-[14px]">
            chevron_right
          </span>
          <span className="font-medium text-mana-white">Temur Delver</span>
        </nav>

        <section className="relative overflow-hidden rounded-2xl border border-outline-variant/20 bg-gradient-to-br from-surface-container via-surface-container-low to-surface-dim p-6 shadow-2xl md:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-24 right-1/3 h-64 w-64 rounded-full bg-mana-blue/10 blur-3xl"></div>
          <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-primary-container/20 px-2.5 py-0.5 font-label-sm text-label-sm uppercase tracking-wider text-primary">
                  Deck analysis
                </span>
                <span className="font-body-sm text-body-sm text-mana-black">
                  • Legacy 1.5
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display-hero text-headline-lg-mobile text-mana-white tracking-tight md:text-display-hero">
                  Temur Delver
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-arcane-gold/15 px-3 py-1 font-label-sm text-label-sm text-arcane-gold ring-1 ring-arcane-gold/30">
                  <span className="material-symbols-outlined text-[18px]">
                    trophy
                  </span>
                  1r Lloc — Campió
                </span>
              </div>
              <p className="max-w-2xl font-body-lg text-body-lg text-mana-black">
                Tempo agressiu amb Delver, Cheese Escapade i un paquet de
                protecció fiable. L'objectiu és pressió primerenca, interrupció
                flexible i tancar amb Minsc &amp; Boo.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-elevated px-3 py-1 font-label-sm text-label-sm text-mana-white shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-arcane-gold">
                    casino
                  </span>
                  Aggro-Control / Tempo
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-elevated px-3 py-1 font-label-sm text-label-sm text-mana-white shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-mana-blue">
                    style
                  </span>
                  U/R/G
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-elevated px-3 py-1 font-label-sm text-label-sm text-mana-white shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    groups
                  </span>
                  VALLÈS TEAM
                </span>
              </div>
            </div>
            <div className="grid min-w-full grid-cols-2 gap-3 md:min-w-[420px] md:grid-cols-4">
              {[
                {label: 'Pilot', value: 'Carles Mesegue', icon: 'badge'},
                {label: 'Rècord', value: '5 - 0 - 1', icon: 'sports_score'},
                {label: 'Maindeck', value: '60 cartes', icon: 'layers'},
                {label: 'Sideboard', value: '15 cartes', icon: 'inventory_2'}
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex min-w-28 flex-col gap-1 rounded-xl border border-outline-variant/15 bg-surface-container-lowest/70 p-3 shadow-sm backdrop-blur"
                >
                  <span className="flex items-center gap-1 font-label-sm text-label-sm text-outline">
                    <span className="material-symbols-outlined text-[14px]">
                      {stat.icon}
                    </span>
                    {stat.label}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-mana-white">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-outline-variant/20 bg-surface-container/60 p-3 shadow-lg">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary/15 px-3 py-2 font-label-md text-label-md text-primary transition hover:bg-primary/25"
              onClick={copyDecklist}
            >
              <span className="material-symbols-outlined text-[18px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              {copied ? 'Copiat!' : 'Copiar Llista'}
            </button>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-mana-blue/15 px-3 py-2 font-label-md text-label-md text-mana-blue transition hover:bg-mana-blue/25"
              onClick={downloadTextDecklist}
            >
              <span className="material-symbols-outlined text-[18px]">
                download
              </span>
              Exportar .TXT
            </button>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-mana-red/15 px-3 py-2 font-label-md text-label-md text-mana-red transition hover:bg-mana-red/25"
              onClick={() => window.print()}
            >
              <span className="material-symbols-outlined text-[18px]">
                picture_as_pdf
              </span>
              Fitxa PDF
            </button>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-mana-green/15 px-3 py-2 font-label-md text-label-md text-mana-green transition hover:bg-mana-green/25"
              onClick={openHandSimulator}
            >
              <span className="material-symbols-outlined text-[18px]">
                draw
              </span>
              Simular Mà Inicial
            </button>
          </div>
          <div className="flex gap-1 rounded-full bg-surface-container-high p-1">
            <button
              type="button"
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-label-sm text-label-sm transition ${
                viewMode === 'table'
                  ? 'bg-surface text-mana-white shadow'
                  : 'text-outline'
              }`}
              onClick={() => toggleViewMode('table')}
            >
              <span className="material-symbols-outlined text-[16px]">
                format_list_bulleted
              </span>
              Llista Compacta
            </button>
            <button
              type="button"
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-label-sm text-label-sm transition ${
                viewMode === 'visual'
                  ? 'bg-surface text-mana-white shadow'
                  : 'text-outline'
              }`}
              onClick={() => toggleViewMode('visual')}
            >
              <span className="material-symbols-outlined text-[16px]">
                grid_view
              </span>
              Galeria Visual
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {viewMode === 'table' ? (
              <>
                {detailedSections.map((section) => (
                  <DetailSection
                    key={section.title}
                    section={section}
                    onPreview={showCardPreview}
                  />
                ))}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  {compactSections.map((section) => (
                    <CompactSection
                      key={section.title}
                      section={section}
                      onPreview={showCardPreview}
                    />
                  ))}
                </div>
                <section className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container/40 shadow-lg">
                  <header className="flex items-center justify-between border-b border-outline-variant/15 bg-surface-container-low/40 px-5 py-3">
                    <h3 className="flex items-center gap-2 font-headline-sm text-headline-sm text-mana-white">
                      <span className="h-2 w-2 rounded-full bg-mana-blue"></span>
                      Terres (17)
                    </h3>
                    <span className="font-label-sm text-label-sm text-outline">
                      17 CARTES
                    </span>
                  </header>
                  <div className="grid grid-cols-1 gap-2 p-3 md:grid-cols-2">
                    {lands.map((card) => (
                      <LandCardRow
                        key={card.name}
                        card={card}
                        onPreview={showCardPreview}
                      />
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <section
                id="visual-deck-grid"
                className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container/40 p-5 shadow-lg"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-mana-white">
                      Galeria Visual
                    </h3>
                    <p className="font-body-sm text-body-sm text-mana-black">
                      Les peces clau del deck i el seu paper al pla de joc.
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/15 px-3 py-1 font-label-sm text-label-sm text-primary">
                    5 CARDS
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
                  {visualCards.map((card) => (
                    <button
                      key={card.name}
                      type="button"
                      className="group cursor-pointer overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest text-left shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                      onClick={() => showCardPreview(card.card)}
                    >
                      <span className="block aspect-[5/7] overflow-hidden bg-surface-container-high">
                        <img
                          alt={card.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={card.image}
                        />
                      </span>
                      <span className="block p-3">
                        <span
                          className={`block truncate font-body-md text-body-md ${card.accent}`}
                        >
                          {card.name}
                        </span>
                        <span className="mt-1 block font-label-sm text-label-sm text-outline">
                          {card.meta}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <section className="sticky top-20 z-10 overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container/80 shadow-2xl backdrop-blur">
              <header className="flex items-center justify-between border-b border-outline-variant/15 px-4 py-3">
                <h3 className="font-headline-sm text-headline-sm text-mana-white">
                  Vista prèvia de carta
                </h3>
                <span className="material-symbols-outlined text-[18px] text-outline">
                  visibility
                </span>
              </header>
              <div className="space-y-4 p-4">
                <div className="relative mx-auto h-64 w-44 overflow-hidden rounded-xl bg-surface-container-high shadow-xl ring-1 ring-white/10">
                  <img
                    alt={preview.name}
                    className="h-full w-full object-cover object-top"
                    src={preview.image}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-headline-sm text-headline-sm text-mana-white">
                    {preview.name}
                  </h4>
                  <span className="rounded-full bg-surface-container-highest px-2 py-0.5 font-label-sm text-label-sm text-on-surface-variant">
                    {preview.cost}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary">
                  {preview.type}
                </p>
                <p className="font-body-sm text-body-sm leading-relaxed text-mana-black">
                  {preview.oracle}
                </p>
                <div className="flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 font-label-sm text-label-sm text-outline">
                  <span className="material-symbols-outlined text-[16px]">
                    mouse_click
                  </span>
                  Cliqueja qualsevol carta de la llista per veure'n els detalls.
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container/40 shadow-lg">
              <header className="flex items-center justify-between border-b border-outline-variant/15 bg-surface-container-low/40 px-5 py-3">
                <h3 className="flex items-center gap-2 font-headline-sm text-headline-sm text-mana-white">
                  <span className="h-2 w-2 rounded-full bg-mana-red"></span>
                  Banqueta / Sideboard
                </h3>
                <span className="font-label-sm text-label-sm text-outline">
                  15 CARTES
                </span>
              </header>
              <div className="space-y-2 p-3">
                {sideboardCards.map((card) => (
                  <CompactCardRow
                    key={card.name}
                    card={card}
                    onPreview={showCardPreview}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-6 rounded-xl border border-outline-variant/20 bg-surface-container/40 p-5 shadow-lg">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-headline-sm text-headline-sm text-mana-white">
                    Corba de manà
                  </h3>
                  <span className="font-label-sm text-label-sm text-outline">
                    MAINDECK
                  </span>
                </div>
                <div className="relative h-40 w-full rounded-lg bg-surface-container-lowest p-2">
                  <svg
                    aria-hidden="true"
                    className="h-full w-full"
                    viewBox="0 0 240 70"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="manaCurveFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#f97316"
                          stopOpacity="0.45"
                        />
                        <stop
                          offset="100%"
                          stopColor="#f97316"
                          stopOpacity="0.04"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 5 65 L 5 54 L 52 54 L 52 10 L 99 10 L 99 44 L 146 44 L 146 54 L 193 54 L 193 50 L 235 50 L 235 65 Z"
                      fill="url(#manaCurveFill)"
                    />
                    <path
                      d="M 5 54 L 52 10 L 99 44 L 146 54 L 193 50 L 235 50"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                      strokeDashoffset="0"
                    />
                    {[
                      {x: 5, y: 54},
                      {x: 52, y: 10},
                      {x: 99, y: 44},
                      {x: 146, y: 54},
                      {x: 193, y: 50},
                      {x: 235, y: 50}
                    ].map((point) => (
                      <circle
                        key={point.x}
                        cx={point.x}
                        cy={point.y}
                        r="3"
                        fill="#f97316"
                        stroke="#101419"
                        strokeWidth="2"
                      />
                    ))}
                  </svg>
                  <div className="absolute bottom-0 left-0 flex w-full justify-around px-2 font-label-sm text-label-sm text-outline">
                    {manaCurve.map((item) => (
                      <span key={item.label}>{item.label}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-headline-sm text-headline-sm text-mana-white">
                  Fonts de color
                </h3>
                <div className="space-y-2">
                  {colorSources.map((source) => (
                    <div key={source.label} className="flex items-center gap-2">
                      <span className="w-6 font-label-sm text-label-sm text-mana-white">
                        {source.label}
                      </span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface-container-high">
                        <span
                          className={`block h-full rounded-full ${source.color}`}
                          style={{width: `${source.width}%`}}
                        ></span>
                      </span>
                      <span className="w-10 text-right font-label-sm text-label-sm text-outline">
                        {source.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-headline-sm text-headline-sm text-mana-white">
                  Distribució per tipus
                </h3>
                <div className="space-y-2">
                  {typeDistribution.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className="w-20 font-label-sm text-label-sm text-mana-white">
                        {item.label}
                      </span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface-container-high">
                        <span
                          className={`block h-full rounded-full ${item.color}`}
                          style={{width: `${item.width}%`}}
                        ></span>
                      </span>
                      <span className="w-20 text-right font-label-sm text-label-sm text-outline">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container/40 shadow-lg">
              <header className="border-b border-outline-variant/15 bg-surface-container-low/40 px-5 py-3">
                <h3 className="font-headline-sm text-headline-sm text-mana-white">
                  Guia de banqueta
                </h3>
              </header>
              <div className="space-y-3 p-3">
                {matchupGuide.map((matchup) => (
                  <div
                    key={matchup.name}
                    className="rounded-lg border border-outline-variant/15 bg-surface-container-lowest/60 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-body-md text-body-md text-mana-white">
                        {matchup.name}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 font-label-sm text-label-sm ${matchup.badgeClass}`}
                      >
                        {matchup.result}
                      </span>
                    </div>
                    <p className="mt-2 font-body-sm text-body-sm leading-relaxed text-mana-black">
                      {matchup.plan}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>

      {handOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Simulador de mà inicial"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setHandOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-outline-variant/20 px-5 py-4">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-mana-white">
                  Simulador de mà inicial
                </h2>
                <p className="font-body-sm text-body-sm text-mana-black">
                  7 cartes aleatòries del maindeck de Temur Delver.
                </p>
              </div>
              <button
                type="button"
                className="cursor-pointer rounded-full p-2 text-outline transition hover:bg-surface-container-high hover:text-mana-white"
                onClick={() => setHandOpen(false)}
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </header>
            <div className="max-h-[65vh] overflow-y-auto p-5">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {hand.map((card, index) => (
                  <button
                    key={`${card.name}-${index}`}
                    type="button"
                    className="group cursor-pointer overflow-hidden rounded-lg border border-outline-variant/20 bg-surface-container-lowest text-left transition hover:border-primary/50"
                    onClick={() => {
                      showCardPreview(card);
                      setHandOpen(false);
                    }}
                  >
                    <span className="block aspect-[5/7] overflow-hidden">
                      <img
                        alt={card.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        src={card.image}
                      />
                    </span>
                    <span className="block p-2">
                      <span className="block truncate font-body-sm text-body-sm text-mana-white">
                        {card.name}
                      </span>
                      <ManaPips className="mt-1" symbols={card.mana} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <footer className="flex justify-end gap-2 border-t border-outline-variant/20 px-5 py-4">
              <button
                type="button"
                className="rounded-lg px-4 py-2 font-label-md text-label-md text-outline transition hover:bg-surface-container-high hover:text-mana-white"
                onClick={() => setHandOpen(false)}
              >
                Tanca
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-lg bg-primary px-4 py-2 font-label-md text-label-md text-white transition hover:bg-primary/90"
                onClick={generateSampleHand}
              >
                Roba una altra mà
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecklistDetail;
