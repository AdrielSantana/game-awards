import { CategoryGame, ShowCategoryGame } from "../interfaces/GameInterface";
import {
  GetCategoryGamesResponse,
  GetGameCategoriesResponse,
  WinnerResponse,
} from "../interfaces/Response";
import Constants from "expo-constants";
import { Category, GameCategory } from "../interfaces/CategoryInterface";

const baseApiURL: string = `${Constants.expoConfig?.extra?.apiUrl}`;

export const clientGetCategories = async (): Promise<[Category] | []> => {
  const requestOption = {
    method: "GET",
  };
  try {
    const response = await fetch(`${baseApiURL}/categories`, requestOption);

    const json: [Category] = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const clientGetCategoryGames = async (
  categoryId: number
): Promise<[CategoryGame] | []> => {
  const requestOption = {
    method: "GET",
  };
  try {
    const response = await fetch(
      `${baseApiURL}/categories/${categoryId}`,
      requestOption
    );

    const json: GetCategoryGamesResponse = await response.json();
    const games: [CategoryGame] = json.games;
    return games;
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const clientGetGameCategories = async (
  gameId: number
): Promise<[GameCategory] | []> => {
  const requestOption = {
    method: "GET",
  };
  try {
    const response = await fetch(
      `${baseApiURL}/games/${gameId}`,
      requestOption
    );

    const json: GetGameCategoriesResponse = await response.json();
    const categories: [GameCategory] = json.categories;
    return categories;
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const clientAddVote = async (
  categoryId: number,
  gameId: number
): Promise<void> => {
  const requestOption = {
    method: "POST",
  };
  try {
    await fetch(
      `${baseApiURL}/categories/${categoryId}/${gameId}/vote`,
      requestOption
    );
  } catch (error) {
    console.log(error);
  }
};

export const clientGetWinner = async (
  categoryId: number
): Promise<ShowCategoryGame | undefined> => {
  const requestOption = {
    method: "GET",
  };

  try {
    const response = await fetch(
      `${baseApiURL}/categories/${categoryId}/winner`,
      requestOption
    );
    const json: WinnerResponse = await response.json();
    const GOTY = json.winner;
    return GOTY;
  } catch (error) {
    console.log(error);
  }
};
