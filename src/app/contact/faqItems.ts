/** FAQ items for the Obsidian Arcana FAQ component.
 *  These questions and answers are specific to the Catalan MTG Legacy Circuit.
 */

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "faq1",
    question: "How do I register for an upcoming weekend stage?",
    answer:
      "Tournament registration opens on Mondays at 20:00 CET via our official partner store links and Discord. Decklists must be uploaded to MTG Legacy Stats prior to Round 1 pairings announcement on Saturday morning.",
  },
  {
    id: "faq2",
    question: "How are circuit points calculated for the Catalan Final?",
    answer:
      "Each local tournament awards circuit points based on attendance: 3 match points per win, 1 per draw, plus scaling bonus points for Top 8 finalists (10 pts for 1st, 6 pts for 2nd, 4 pts for Top 4). The top 16 seasonal players earn automatic invites to the Catalan Final.",
  },
  {
    id: "faq3",
    question: "What is the circuit policy regarding playtest cards / proxies?",
    answer:
      "To maximize competitive accessibility across vintage card pools, select unsanctioned Catalan regional stages permit up to 15 high-quality, clear color playtest cards (including dual lands and reserved list staples). Sanctioned WPN qualifiers remain strictly 100% authentic. Always check individual stage details.",
  },
];