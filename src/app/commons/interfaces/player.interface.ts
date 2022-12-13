export interface Player {
  id: string;
  name: string;
  decks: Deck[];
}

interface Deck {
  name: string;
  cards: number;
}
