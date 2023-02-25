import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";

import { clientAddVote } from "../../api/api";
import { Category } from "../../interfaces/CategoryInterface";

import { CategoryGame } from "../../interfaces/GameInterface";
import { StackNavigationContext } from "../../services/contexts/StackNavigationContext";

type Props = {
  game: CategoryGame;
  category: Category;
};

const GameCard = ({ game, category }: Props) => {
  const sendingVote = (): void => {
    Alert.alert(
      `Vote sent to ${game.name}`,
      `Thanks for helping decide the ${category.name}`,
      [{ text: "OK", onPress: () => clientAddVote(category.id, game.id) }]
    );
  };

  const { goToGameScreen } = useContext(StackNavigationContext);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardBox}>
        <TouchableOpacity
          onPress={() => {
            goToGameScreen(game);
          }}
        >
          <Image source={{ uri: game.cover }} style={styles.card} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{game.name}</Text>
        <TouchableOpacity
          onPress={() => {
            sendingVote();
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
    paddingBottom: 32,
    paddingHorizontal: 16,
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
    paddingBottom: 16,
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
