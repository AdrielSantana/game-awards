export interface Category {
  id: number;
  name: string;
}

export interface GameCategory extends Category {
  categoryGames: {
    votes: number;
  };
}
