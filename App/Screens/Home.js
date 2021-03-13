import React from "react";
import { View, StyleSheet, Image, ImageBackground } from "react-native";
import { Button } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "30%",
    marginRight: "30%",
  },
  buttonStyle: {
    padding: 5,
  },
});

const button = (title, nav, navigation, color) => {
  return (
    <View style={styles.buttonStyle}>
      <Button
        title={title}
        titleStyle={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
        }}
        buttonStyle={{
          backgroundColor: color,
          borderRadius: 100,
        }}
        onPress={() => navigation.navigate(nav)}
      />
    </View>
  );
};

const HomeComponent = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
            source={require("../assets/DCP-Logo.png")}
          />
        </View>
        {button("SCHEDULE TOURS", "", navigation, "#24449b")}
        {button("EVENTS", "", navigation, "#ea6227")}
        {button("CALENDAR", "Calendar", navigation, "#24449b")}
        {button("MAP", "Map", navigation, "#ea6227")}
        {button("ABOUT US", "", navigation, "#24449b")}
        {button("CONTACT US", "", navigation, "#ea6227")}
        {button("DCP LOGIN", "", navigation, "#24449b")}
      </View>
    </ImageBackground>
  );
};

export default HomeComponent;
