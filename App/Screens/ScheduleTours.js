import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet, View, Text, ImageBackground } from "react-native";

//Function to easily create a button
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
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate(nav)}
      />
    </View>
  );
};

//Rendering screen that gives information about the tours
const ScheduleTourComponent = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/back.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>SCHEDULE A TOUR</Text>

        <Text style={styles.text}>
          {"\n"}
          Tour with the University of Florida College of Design, Construction
          and Planning!
          {"\n"}
          {"\n"}
          Tours are available on weekdays from 10 AM to 5 PM
          {"\n"}
          {"\n"}
          Send us an email or schedule one here to let us know you are
          interested!{"\n"}
        </Text>
        {button("Schedule Tour", "Schedule Tour_", navigation, "#ea6227")}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    marginLeft: "7%",
    marginRight: "7%",
    justifyContent: "center",
    paddingBottom: 20,
  },
  title: {
    paddingTop: "10%",
    paddingBottom: "3%",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    paddingBottom: "5%",
    fontSize: 20,
  },
});

export default ScheduleTourComponent;
