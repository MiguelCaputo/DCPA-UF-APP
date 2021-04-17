import React, { Component } from "react";
import { View, StyleSheet, Image, ImageBackground, Text } from "react-native";
import { Button } from "react-native-elements";
import Axios from "axios";
import { ObjectID } from "bson";

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

const button = (title, color) => {
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
      />
    </View>
  );
};

const TestComponent = ({ navigation }) => {
  const res1 = Axios.get("http://localhost:3001/event", {
    headers: {
      "content-type": "text/json",
    },
  });

  var data = JSON.stringify({
    start: "test",
    end: "2021-05-12T04:03:45.000+00:00",
    title: "",
    summary: "",
  });

  var config = {
    method: "post",
    url: "http://localhost:3001/addEvent",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  Axios(config);

  var event_type;
  var date;

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
      </View>
    </ImageBackground>
  );
};

export default TestComponent;
