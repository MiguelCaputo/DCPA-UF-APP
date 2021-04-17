import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
} from "react-native";
import { Button } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "30%",
    marginRight: "30%",
  },
  form: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "#fdc082",
    borderRadius: 10,
    padding: 15,
    width: 165,
    height: 40,
    fontSize: 18,
    textAlign: "center",
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
          borderRadius: 10,
          marginTop: "67%",
          height: 40,
        }}
        onPress={() => navigation.navigate(nav)}
      />
    </View>
  );
};

const LoginComponent = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
            source={require("../assets/DCP-Logo.png")}
          />
          <View style={styles.form}>
            <View style={{ marginTop: 10, marginBottom: 20 }}>
              <TextInput placeholder=" Username" style={styles.input} />
            </View>
            <View style={{ marginTop: 30 }}>
              <TextInput
                secureTextEntry={true}
                placeholder=" Password"
                style={styles.input}
              />
            </View>
          </View>
        </View>
        {button("Login", "Dashboard", navigation, "#24449b")}
      </View>
    </ImageBackground>
  );
};

export default LoginComponent;
