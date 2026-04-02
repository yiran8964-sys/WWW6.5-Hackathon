export interface SelectedCard {
  id: string;
  position: number;
  isRevealed: boolean;
}

export interface CardReading {
  spreadType: string;
  cards: SelectedCard[];
  timestamp: number;
}

export interface WordCard {
  id: string;
  word: string;
  meaning: string;
  trackId?: number; // 所属轨迹ID（1-6）
}
