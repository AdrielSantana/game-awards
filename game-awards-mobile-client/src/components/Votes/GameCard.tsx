import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

import { clientSendingVotes } from "../../api/api";

import { Game } from "../../interfaces/GameInterface";

const sendingVote = (id: number): void => {
  Alert.alert("Vote send", "Thanks for helping decide the Game Of The Year", [
    { text: "OK", onPress: () => clientSendingVotes(id) },
  ]);
};

const GameCard = (props: { game: Game | any }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardBox}>
        <Image source={{ uri: props.game.cover }} style={styles.card} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{props.game.name}</Text>
        <TouchableOpacity
          onPress={() => {
            sendingVote(props.game.id);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>vote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderBottomColor: "#fff",
    width: "100%",
    flexDirection: "row",
    marginVertical: 16,
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
    width: 170,
    height: 250,
  },
  label: {
    fontSize: 18,
    color: "white",
    fontFamily: "Draper",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 10,
  },
  infoContainer: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#150100",
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5.65,
    elevation: 4,
    overflow: "hidden",
  },
  buttonText: {
    color: "white",
    fontFamily: "Draper",
    fontSize: 16,
  },
});

export default GameCard;
