import { Game } from "../interfaces/GameInterface";

const baseApiURL = "http://192.168.0.112:8080/api/";

const clientGetGames = async (): Promise<[Game] | []> => {
  const requestOption = {
    method: "GET",
  };
  const response = await fetch(`${baseApiURL}games`, requestOption);
  const json: [Game] = await response.json();
  return json;
};

const clientSendingVotes = async (id: number): Promise<void> => {
  const requestOption = {
    method: "PATCH",
  };
  fetch(`${baseApiURL}games/${id}/vote`, requestOption);
};

const clientGetWinner = async (): Promise<Game | undefined> => {
  const requestOption = {
    method: "GET",
  };
  const response = await fetch(`${baseApiURL}games`, requestOption);
  const json: [Game] = await response.json();
  const GOTY = json[0];
  return GOTY;
};

export { clientGetGames, clientGetWinner, clientSendingVotes };
