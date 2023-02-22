import { Category, GameCategory } from "./CategoryInterface";
import { CategoryGame, Game, ShowCategoryGame } from "./GameInterface";

export interface GeneralResponse {
  message: string;
  found: boolean;
}

export interface GetCategoryGamesResponse extends GeneralResponse, Category {
  games: [CategoryGame];
}

export interface GetGameCategoriesResponse extends GeneralResponse, Game {
  categories: [GameCategory];
}

export interface AddVoteResponse extends GeneralResponse {
  votes: number;
  gameName: string;
  categoryName: string;
}

export interface WinnerResponse extends GeneralResponse {
  winner: ShowCategoryGame;
}
