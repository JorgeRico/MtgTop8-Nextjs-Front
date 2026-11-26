import statsTypes from '@/types/server/stats-types';

export type StatsOptionId = 'top-cards' | 'mainboard' | 'sideboard';

export type CardTypeId =
  | 'artifacts'
  | 'sorceries'
  | 'enchantments'
  | 'planeswalkers'
  | 'lands'
  | 'creatures'
  | 'instants';

export type StatsSectionId = StatsOptionId | CardTypeId;

export const STATS_OPTIONS: Record<StatsOptionId, string> = {
  'top-cards': statsTypes.TOP,
  mainboard: statsTypes.MAINBOARD,
  sideboard: statsTypes.SIDEBOARD
};

export const CARD_TYPE_OPTIONS: Record<CardTypeId, string> = {
  artifacts: statsTypes.ARTIFACT,
  sorceries: statsTypes.SORCERY,
  enchantments: statsTypes.ENCHANTMENT,
  planeswalkers: statsTypes.PLANESWALKER,
  lands: statsTypes.LAND,
  creatures: statsTypes.CREATURE,
  instants: statsTypes.INSTANT
};

export const isCardTypeSection = (
  section: StatsSectionId
): section is CardTypeId =>
  Object.prototype.hasOwnProperty.call(CARD_TYPE_OPTIONS, section);

const statsSchema = {
  STATS_OPTIONS,
  CARD_TYPE_OPTIONS,
  isCardTypeSection
};

export default statsSchema;
