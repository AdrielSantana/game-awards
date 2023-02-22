import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";

import { clientGetCategoryGames } from "../api/api";

import background from "../../assets/images/bg.png";

import { CategoryGame } from "../interfaces/GameInterface";
import GameCard from "../components/Votes/GameCard";
import { Category } from "../interfaces/CategoryInterface";

const VotesScreen = (props: { category: Category; navigation: any }) => {
  const [gameList, setGameList] = useState<[CategoryGame] | []>([]);

  useEffect(() => {
    (async () => {
      const response = await clientGetCategoryGames(props.category.id);
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
            return (
              <GameCard
                navigation={props.navigation}
                key={i}
                game={game}
                category={props.category}
              />
            );
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
