import { showLocation } from "react-native-map-link";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Button } from "react-native-elements";
import React from "react";

// Style Sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "10%",
    marginRight: "10%",
  },
  buttonStyle: {
    padding: 10,
  },
});

var SearchLocation = (latitude, longitude, title) => {
  showLocation({
    latitude: latitude,
    longitude: longitude,
    title: title,
    googleForceLatLon: false,
    alwaysIncludeGoogle: true,
    appsWhiteList: ["google-maps"],
  });
};

const button = (title, loc, color) => {
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
        onPress={() => SearchLocation(0, 0, loc)}
      />
    </View>
  );
};

const MapComponent = () => {
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        {button("DCP BUILDING", "UF DCP", "#24449b")}
        {button("REITZ UNION", "UF Reitz Union", "#ea6227")}
        {button("LIBRARY WEST", "UF Library West", "#24449b")}
        {button("MARSTON LIBRARY", "UF Marston Library", "#ea6227")}
        {button(
          "BEN HILL GRIFFIN STADIUM",
          "UF Ben Hill Griffin Stadium",
          "#24449b"
        )}
        {button("RAWLINGS HALL", "UF Rawlings Hall", "#ea6227")}
      </View>
    </ImageBackground>
  );
};

export default MapComponent;
