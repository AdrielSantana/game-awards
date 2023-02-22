import { useEffect, useState } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
} from "react-native";

import background from "../../assets/images/bg.png";
import { clientGetGameCategories } from "../api/api";
import { GameCategory } from "../interfaces/CategoryInterface";

type Props = {
  navigation: any;
  route: any;
};

const GameScreen = ({ navigation, route }: Props) => {
  const [categories, setCategories] = useState<[GameCategory] | []>([]);

  useEffect(() => {
    (async () => {
      const response = await clientGetGameCategories(route.params.game.id);
      setCategories(response);
    })();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <ScrollView style={styles.gamesContainer}>
        <View style={styles.container}>
          <Text style={styles.gameName}>{route.params.game.name}</Text>
          <View style={styles.cardBox}>
            <Image
              source={{ uri: route.params.game.cover }}
              style={styles.card}
            />
          </View>

          <View style={styles.descriptionCard}>
            <Text style={styles.description}>
              {"\t"}
              {route.params.game.description}
            </Text>
          </View>

          <Text style={styles.categoriesTitle}>Nominated Categories</Text>
          <View style={styles.categoriesCard}>
            {categories ? (
              categories.map((category) => {
                return (
                  <View key={category.id}>
                    <Text style={styles.category}>{category.name}</Text>
                  </View>
                );
              })
            ) : (
              <></>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={() => goBack()}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  gameName: {
    paddingBottom: 32,
    fontFamily: "Draper",
    color: "white",
    fontSize: 24,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 13,
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
  descriptionCard: {
    marginVertical: 32,
    backgroundColor: "#150100",
    borderRadius: 16,
    padding: 20,
  },
  categoriesCard: {
    marginBottom: 28,
    backgroundColor: "#150100",
    borderRadius: 16,
    padding: 20,
  },
  description: {
    color: "white",
    fontSize: 18,
    fontFamily: "Monteserrat",
    textAlign: "left",
  },
  categoriesTitle: {
    paddingBottom: 16,
    fontFamily: "Draper",
    color: "white",
    fontSize: 20,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 13,
  },
  category: {
    fontFamily: "Monteserrat",
    color: "white",
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 8,
  },
  card: {
    borderRadius: 16,
    width: 270,
    height: 380,
  },
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
  container: {
    paddingHorizontal: 32,
    paddingVertical: 32,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Draper",
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#150100",
    borderRadius: 32,
    width: 200,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
});

export default GameScreen;
