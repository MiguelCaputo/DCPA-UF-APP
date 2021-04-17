import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";

//Component for Contact Us screen
const Contact = () => {
  return (
    <ImageBackground
      source={require("../assets/back.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.text}>
          University of Florida College of Design, Construction and Planning
        </Text>
        <Text style={styles.text}>
          Address: Architecture Building, 1480 Inner Road, Gainesville, FL 32611
        </Text>
        <Text style={styles.text}>Email: dcpambassadors@gmail.com</Text>
        <Text style={styles.text}>Phone Number: (352) 392-4836</Text>
        <Text style={styles.text}>Fax: (352) 392-7266</Text>
        <Text style={styles.paragraphTitle}>Connect</Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("mailto:dcpambassadors@gmail.com");
          }}
          title="dcpambassadors@gmail.com"
          style={styles.link}
        >
          <Image
            style={{ width: 23, height: 23 }}
            resizeMode="contain"
            source={require("../assets/mail.png")}
          />
          <Text style={styles.linktext}>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://www.instagram.com/dcpambassadors/");
          }}
          style={styles.link}
        >
          <Image
            style={{ width: 23, height: 23 }}
            resizeMode="contain"
            source={require("../assets/ig.png")}
          />
          <Text style={styles.linktext}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://twitter.com/ufdcp");
          }}
          style={styles.link}
        >
          <Image
            style={{ width: 23, height: 23 }}
            source={require("../assets/twitter.png")}
            resizeMode="contain"
          />
          <Text style={styles.linktext}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://www.facebook.com/UF.dcp");
          }}
          style={styles.link}
        >
          <Image
            style={{ width: 23, height: 23 }}
            resizeMode="contain"
            source={require("../assets/fb.png")}
          />
          <Text style={styles.linktext}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("https://www.linkedin.com/company/ufdcp/");
          }}
          style={styles.link}
        >
          <Image
            style={{ width: 23, height: 23 }}
            resizeMode="contain"
            source={require("../assets/ld.png")}
          />
          <Text style={styles.linktext}>Linkedin</Text>
        </TouchableOpacity>
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
    paddingBottom: 20,
    marginTop: "10%",
  },
  title: {
    paddingTop: "10%",
    paddingBottom: "3%",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  link: {
    flex: 0,
    flexDirection: "row",
    paddingBottom: 15,
    marginRight: "70%",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 20,
  },
  paragraphTitle: {
    fontSize: 25,
    color: "#ea6227",
    fontWeight: "bold",
    paddingBottom: 20,
  },
  linktext: {
    color: "white",
    fontWeight: "bold",
    paddingLeft: "5%",
    fontSize: 20,
  },
});

export default Contact;
