import { CategoryGame, ShowCategoryGame } from "../interfaces/GameInterface";
import {
  GetCategoryGamesResponse,
  WinnerResponse,
} from "../interfaces/Response";
import Constants from "expo-constants";

const baseApiURL: string = `${Constants.expoConfig?.extra?.apiUrl}`;

const clientGetGames = async (): Promise<[CategoryGame] | []> => {
  const requestOption = {
    method: "GET",
  };
  try {
    const response = await fetch(`${baseApiURL}/categories/8`, requestOption);

    const json: GetCategoryGamesResponse = await response.json();
    const games: [CategoryGame] = json.games;
    return games;
  } catch (error) {
    console.log(error);
  }
  return [];
};

const clientSendingVotes = async (id: number): Promise<void> => {
  const requestOption = {
    method: "POST",
  };
  try {
    await fetch(`${baseApiURL}/categories/8/${id}/vote`, requestOption);
  } catch (error) {
    console.log(error);
  }
};

const clientGetWinner = async (): Promise<ShowCategoryGame | undefined> => {
  const requestOption = {
    method: "GET",
  };

  try {
    const response = await fetch(
      `${baseApiURL}/categories/8/winner`,
      requestOption
    );
    const json: WinnerResponse = await response.json();
    const GOTY = json.winner;
    return GOTY;
  } catch (error) {
    console.log(error);
  }
};

export { clientGetGames, clientGetWinner, clientSendingVotes };
