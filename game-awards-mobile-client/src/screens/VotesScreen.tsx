import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";

import { clientGetCategoryGames } from "../api/api";

import background from "../../assets/images/bg.png";

import { CategoryGame } from "../interfaces/GameInterface";
import GameCard from "../components/Votes/GameCard";
import { Category } from "../interfaces/CategoryInterface";

type Props = {
  category: Category;
};

const VotesScreen = ({ category }: Props) => {
  const [gameList, setGameList] = useState<[CategoryGame] | []>([]);

  useEffect(() => {
    (async () => {
      const response = await clientGetCategoryGames(category.id);
      setGameList(response);
    })();
  }, []);

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <ScrollView style={styles.gamesContainer}>
        {gameList.length > 0 ? (
          gameList.map((game, i) => {
            return <GameCard key={i} game={game} category={category} />;
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
    paddingTop: 16,
    flex: 1,
  },
});

export default VotesScreen;
