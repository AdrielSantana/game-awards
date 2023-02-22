export interface Game {
  id: number;
  name: string;
  description: string;
  cover: string;
}

export interface CategoryGame extends Game {
  categoryGames: {
    votes: number;
  };
}

export interface ShowCategoryGame extends Game {
  category: string;
  votes: number;
}
