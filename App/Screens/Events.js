import React, { useState, setState, Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Modal,
  ImageBackground,
  LogBox,
} from "react-native";
import { Button } from "react-native-elements";
import EventCalendar from "react-native-events-calendar";
import Axios from "axios";

LogBox.ignoreAllLogs(); //Ignore all log notifications

//get the size of device
let { width, height } = Dimensions.get("window");

// Event class for the event tab
export class Event extends Component {
  // Constructor for the class
  constructor(props) {
    super(props);

    // Initializing all the variables that we will use
    this.state = {
      events: [], // contains all the events
      isEventVisible: false,
      currEvent: {},
    };

    //Binding functions to this
    this.eventClicked = this.eventClicked.bind(this);
    this.toggleEvent = this.toggleEvent.bind(this);
  }

  //Set the clicked event visible and invisible
  toggleEvent = () => {
    this.setState({ isEventVisible: !this.state.isEventVisible });
  };

  // When an event is clicked
  eventClicked = (event) => {
    this.toggleEvent();
    this.setState({ currEvent: event });
  };

  // Get the server url
  getURL = () => {
    var current_url = "http://localhost:3001";
    if (process.env.NODE_ENV.localeCompare("development") == 0)
      current_url = process.env.URL;
    return current_url;
  };

  // Set all the variables to their original state
  cleanState = () => {
    this.setState({
      title: "",
      startDate: new Date(),
      startTime: "",
      endDate: new Date(),
      endTime: "",
      description: "",
    });
  };

  //Get all events from database
  getEvents = async () => {
    const ev = await Axios.get(getURL() + "/event", {
      headers: {
        "content-type": "text/json",
      },
    }).catch((error) => console.log(error));
    let arr = ev.data.message;
    //Pushing all events to the events array
    for (let i = 0; i < arr.length; i++) {
      this.state.events.push({
        start: arr[i].start,
        end: arr[i].end,
        title: arr[i].title,
        summary: arr[i].summary,
      });
    }
  };

  //Rendering all events before render
  componentDidMount() {
    this.getEvents();
  }

  // Render all the components
  render() {
    return (
      // Container for the page
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <EventCalendar
            eventTapped={this.eventClicked}
            events={this.state.events}
            width={width}
            size={30}
            scrollToFirst
          />
        </View>

        <Modal
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
          visible={this.state.isEventVisible}
        >
          <ImageBackground
            source={require("../assets/back.png")}
            style={{ width: "100%", height: "100%" }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{this.state.currEvent.title}</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>
                  Begins: {this.state.currEvent.start}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.inputTitle}>
                  Ends: {this.state.currEvent.end}
                </Text>
              </View>
              <Text
                style={{
                  paddingTop: "3%",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 30,
                  color: "white",
                }}
              >
                More Information
              </Text>
              <View style={styles.infoContainer}>
                <Text style={styles.inputTitle}>
                  {this.state.currEvent.summary}
                </Text>
              </View>
              <View style={styles.bottomContainer}>
                <Button
                  title={"Close"}
                  titleStyle={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  buttonStyle={{
                    backgroundColor: "#ea6227",
                    borderRadius: 8,
                    marginLeft: 12,
                    width: 100,
                  }}
                  onPress={() => {
                    this.toggleEvent();
                  }}
                />
              </View>
            </View>
          </ImageBackground>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    padding: 5,
  },
  title: {
    paddingTop: "20%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  inputTitle: {
    marginLeft: 12,
    marginBottom: 5,
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  inputContainer: {
    padding: 10,
  },
  infoContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
  },
  bottomContainer: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
