import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

//Component for About Us screen
const About = () => {
  return (
    <ScrollView style={{ backgroundColor: "#b5d5e3" }}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text
            style={{
              fontSize: 29,
              textAlign: "center",
              paddingBottom: "2%",
              color: "#ea6227",
              fontWeight: "bold",
            }}
          >
            College of Design Construction and Planning
          </Text>
          <View
            style={{
              alignItems: "center",
              paddingBottom: 20,
              paddingTop: 20,
            }}
          >
            <Image
              style={{ width: 600, height: 250 }}
              resizeMode="contain"
              source={require("../assets/dcp.png")}
            />
          </View>
          <Text style={styles.paragraphTitle}>Vision</Text>
          <View>
            <Text style={styles.text}>
              DCPA's vision is to be recognized globally as a preeminent College
              for teaching, research, creative scholarship, and outreach in the
              built and natural environments.
            </Text>
          </View>
          <Text style={styles.paragraphTitle}>Mission</Text>
          <View>
            <Text style={styles.text}>
              The mission of the College of Design Construction and Planning is
              to improve the quality of the built and natural environments
              through offering exceptional educational and professional programs
              and research/scholarship initiatives that address the planning,
              design, construction, and preservation of the built and natural
              environments.
            </Text>
          </View>
          <Text
            style={{
              fontSize: 29,
              textAlign: "center",
              paddingBottom: "2%",
              color: "#ea6227",
              fontWeight: "bold",
            }}
          >
            DCP Ambassadors
          </Text>
          <View
            style={{
              alignItems: "center",
              paddingBottom: "2%",
            }}
          >
            <Image
              style={{ width: 325, height: 250 }}
              resizeMode="contain"
              source={require("../assets/dcpa.png")}
            />
          </View>
          <View>
            <Text style={styles.text}>
              DCP Ambassadors are a select group of students in the college who
              have demonstrated outstanding academic success and leadership.
              Their objective is to generate interest and knowledge about the
              college.
            </Text>
          </View>
          <Text style={styles.paragraphTitle}>List of Programs or Events</Text>
          <View>
            <Text style={styles.text}>
              - College Tours{"\n"}- Preview{"\n"}- DCP Career Fair{"\n"}- DCP
              Research Symposium{"\n"}- New Student Showcase{"\n"}- Gator Design
              & Construction Open House{"\n"}- DCP Homecoming Barbeque
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
    height: "10%",
    paddingTop: "10%",
  },
  text: {
    color: "black",
    fontSize: 20,
    paddingBottom: 20,
    alignSelf: "stretch",
    textAlign: "left",
    textBreakStrategy: "simple",
  },
  paragraphTitle: {
    fontSize: 25,
    color: "#ea6227",
    fontWeight: "bold",
    paddingBottom: 20,
  },
});

export default About;
