import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";

import Header from "../components/Header";

import { clientGetGames } from "../api/api";

import background from "../../assets/images/bg.png";

import { Game } from "../interfaces/GameInterface";
import GameCard from "../components/Votes/GameCard";

const VotesScreen = () => {
  const [gameList, setGameList] = useState<[Game] | []>([]);

  useEffect(() => {
    (async () => {
      const response = await clientGetGames();
      setGameList(response);
    })();
  }, [gameList]);

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >      
      <ScrollView style={styles.gamesContainer}>
        {gameList.length > 0 ? (
          gameList.map((game, i) => {
            return <GameCard key={i} game={game} />;
          })
        ) : (
          <></>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#191919",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  gamesContainer: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    flex: 1,
  },
  
});

export default VotesScreen;
