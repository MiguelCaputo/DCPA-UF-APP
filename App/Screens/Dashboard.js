import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonStyle: {
    padding: 5,
  },
});

//Get dimensions of the phone
let { width, height } = Dimensions.get("window");

//Function to easily create a button
const button = (title, nav, navigation, color) => {
  return (
    <View style={styles.buttonStyle}>
      <Button
        title={title}
        titleStyle={{
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
        }}
        buttonStyle={{
          backgroundColor: color,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate(nav)}
      />
    </View>
  );
};

//Rendering the home page for admins
const DashboardComponent = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/back.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: width, height: height * 0.4, marginBottom: 20 }}
            resizeMode="contain"
            source={require("../assets/DCP-Logo.png")}
          />
        </View>
        {button("SCHEDULE TOURS", "Schedule Tours", navigation, "#24449b")}
        {button("EVENTS", "Admin Event", navigation, "#ea6227")}
        {button("MAP", "Map", navigation, "#24449b")}
        {button("ABOUT US", "About Us", navigation, "#ea6227")}
        {button("CONTACT US", "Contact Us", navigation, "#24449b")}
        {button("LOG OUT", "Log Out", navigation, "#ea6227")}
      </View>
    </ImageBackground>
  );
};

export default DashboardComponent;
