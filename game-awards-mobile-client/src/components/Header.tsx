import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import tga from "../../assets/images/tga.png";

const Header = (props: { title: string }) => {
  return (
    <View style={styles.header}>
      <View>
        <Image resizeMode="contain" source={tga} style={styles.logo} />
      </View>

      <View>
        <Text style={styles.label}>{props.title}</Text>
      </View>
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
  label: {
    fontFamily: "Draper",
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  logo: { width: 260 },
});

export default Header;
