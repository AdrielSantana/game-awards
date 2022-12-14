import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import { Game } from "../../interfaces/GameInterface";

const Winner = (props: { game: Game | any }) => {
  return (
    <View style={styles.winnerCard}>
      <View style={styles.cardBox}>
        <Image source={{ uri: props.game.cover }} style={styles.card} />
      </View>
      <Text style={styles.gameName}>{props.game.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  winnerCard: {
    display: "flex",
    alignItems: "center",
  },
  cardBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.65,
    elevation: 8,
    overflow: "hidden",
    backgroundColor: "#000",
    borderRadius: 16,
  },
  card: {
    borderRadius: 16,
    width: 200,
    height: 300,
  },
  gameName: {
    paddingVertical: 32,
    fontFamily: "Draper",
    color: "white",
    fontSize: 24,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 13,
  },
});

export default Winner;
