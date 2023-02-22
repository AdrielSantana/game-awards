import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import tga from "../../assets/images/tga.png";

const Header = () => {
  return (
    <View style={styles.header}>
      <View>
        <Image resizeMode="contain" source={tga} style={styles.logo} />
      </View>

      <TouchableOpacity onPress={() => {}}>
        <FontAwesome5 name="bars" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxHeight: 110,
    backgroundColor: "#150100",
    width: "100%",
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.65,
    elevation: 8,
  },
  logo: { width: 260 },
});

export default Header;
