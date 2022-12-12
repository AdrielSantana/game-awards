import React from "react";
import {
  View,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
} from "react-native";

import background from "../../assets/images/bg.png";

const Loading = () => {
  return (
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.background}
      >
        <ActivityIndicator
          color="#bc2b78"
          size="large"
          style={styles.activityIndicator}
        />
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
});

export default Loading;
