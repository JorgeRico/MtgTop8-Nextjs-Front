export const FORMATS = ["Legacy", "Vintage", "Modern", "Pauper", "Pioneer"] as const;

export type Format = (typeof FORMATS)[number];

export const SAMPLE_MAINBOARD = `4 Dragon's Rage Channeler
4 Delver of Secrets
2 Murktide Regent
4 Brainstorm
4 Ponder
4 Expressive Iteration
4 Force of Will
3 Daze
1 Spell Pierce
4 Lightning Bolt
1 Unholy Heat
4 Mishra's Bauble
4 Wasteland
4 Flooded Strand
4 Polluted Delta
3 Volcanic Island
2 Steam Vents
3 Island`;

export const SAMPLE_SIDEBOARD = `2 Pyroblast
2 Red Elemental Blast
2 Surgical Extraction
2 Meltdown
2 Submerge
2 Flusterstorm
1 Grafdigger's Cage
1 Null Rod
1 Maddening Hex`;