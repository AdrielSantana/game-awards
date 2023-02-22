import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";

import Winner from "../components/Winner/Winner";

import { clientGetWinner } from "../api/api";

import background from "../../assets/images/bg.png";
import tgaTrophy from "../../assets/images/tgaTrophy.png";

import { Game } from "../interfaces/GameInterface";
import { Category } from "../interfaces/CategoryInterface";

const WinnerScreen = (props: { category: Category; navigation: any }) => {
  const [winner, setWinner] = useState<Game | undefined>();

  useEffect(() => {
    (async () => {
      const response = await clientGetWinner(props.category.id);
      setWinner(response);
    })();
  }, [winner]);

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <Image source={tgaTrophy} style={styles.tgaTrophy} resizeMode="contain" />
      <ScrollView style={styles.winnerContainer}>
        <Text style={styles.categoryAward}>{props.category.name}</Text>
        {winner != undefined ? (
          <Winner navigation={props.navigation} game={winner} />
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
  winnerContainer: {
    paddingTop: 32,
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    flex: 1,
  },
  categoryAward: {
    paddingBottom: 32,
    fontFamily: "Draper",
    color: "white",
    fontSize: 32,
    alignSelf: "center",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 13,
  },
  tgaTrophy: { position: "absolute", top: "75%" },
});

export default WinnerScreen;
