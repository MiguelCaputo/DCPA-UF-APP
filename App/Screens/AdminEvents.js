import React, { useState, setState, Component } from "react";
import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  Modal,
  Platform,
  LogBox,
} from "react-native";
import { Button } from "react-native-elements";
import EventCalendar from "react-native-events-calendar";
import Axios from "axios";

// Ignoring warnings of the app
LogBox.ignoreAllLogs(); //Ignore all log notifications

//get the size of device
let { width, height } = Dimensions.get("window");

// Event class for the event tab
export class AdminEvent extends Component {
  // Constructor for the class
  constructor(props) {
    super(props);

    // Initializing all the variables that we will use
    this.state = {
      events: [], // contains all the events
      isModalVisible: false,
      isEventVisible: false,
      isStartTimeVisible: false,
      isEndTimeVisible: false,
      title: "",
      startDate: new Date(),
      startTime: "",
      endDate: new Date(),
      endTime: "",
      description: "",
      currEvent: {},
    };

    //Binding functions to this
    this.eventClicked = this.eventClicked.bind(this);
    this.toggleEvent = this.toggleEvent.bind(this);
  }

  // Set the modal visible and invisible
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  //Set the clicked event visible and invisible
  toggleEvent = () => {
    this.setState({ isEventVisible: !this.state.isEventVisible });
  };

  // Create a new event
  createEvent = (start, end, title, summary) => {
    //Push the events into the events array
    this.state.events.push({
      start: start,
      end: end,
      title: title,
      summary: summary,
    });

    //Making the event a string
    var data = JSON.stringify({
      start: start,
      end: end,
      title: title,
      summary: summary,
    });

    const url = getURL();
    //Sending the event to the database
    var config = {
      method: "post",
      url: url + "/addEvent",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    Axios(config);
  };

  // Delete an event
  deleteEvent = (currentEvent) => {
    //Making the event a string
    var data = JSON.stringify({
      start: currentEvent.start,
      end: currentEvent.end,
      title: currentEvent.title,
      summary: currentEvent.summary,
    });

    const url = getURL();
    //Sending the event to the database
    var config = {
      method: "post",
      url: url + "/delete",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    this.getEvents();
    Axios(config);
  };

  // When an event is clicked
  eventClicked = (event) => {
    //Show event modal
    this.toggleEvent();
    this.setState({ currEvent: event });
  };

  // Transforms a time and a date object into a string for the event
  getDate = (tim, dat) => {
    var time = tim;
    var date = dat;
    //Cleaning the time and date data
    time = time.substring(12, 20);
    var hour = parseInt(time.substring(0, 2));
    //Library has a bug that adds 4 hours to chosen time
    if (hour >= 4) hour = hour - 4;
    else {
      hour = hour - 4;
      hour = 24 - Math.abs(hour);
    }
    hour = hour.toString();
    if (hour.length == 1) hour = "0" + hour;
    time = hour + time.substring(2, time.length);
    date = date + " " + time;
    return date;
  };

  // Add a new event
  addEvent = () => {
    // initialize all the variables
    let start = JSON.stringify(this.state.startDate);
    let end = JSON.stringify(this.state.endDate);
    let startT = JSON.stringify(this.state.startTime);
    let endT = JSON.stringify(this.state.endTime);
    let startHour = parseInt(
      startT.substring(53, startT.length - 8).substring(0, 2)
    );
    let endHour = parseInt(endT.substring(53, endT.length - 8).substring(0, 2));
    start = start.substring(1, 11);
    end = end.substring(1, 11);

    // Check for validation of the input
    if (this.state.title == "") alert("Please Add a Title For The Event");
    else if (this.state.startTime == "")
      alert("Please Select a Starting Time For The Event");
    else if (this.state.endTime == "")
      alert("Please Select an Ending Time For The Event");
    else if (this.state.description == "")
      alert("Please Add a Description For The Event");
    else {
      // If all the input is valid
      const newStartDate = this.getDate(startT, start);
      const newEndDate = this.getDate(endT, end);

      // Create the new event
      this.createEvent(
        newStartDate,
        newEndDate,
        this.state.title,
        this.state.description
      );
      // Restart the variables
      this.cleanState();
      // Hide the modal
      this.toggleModal();
      alert("Event Added Successfully!");
    }
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

  // Get the server url
  getURL = () => {
    var current_url = "http://localhost:3001";
    if (process.env.NODE_ENV.localeCompare("development") == 0) {
      current_url = process.env.URL;
    } else if (process.env.NODE_ENV.localeCompare("production") == 0) {
      current_url = process.env.URL;
    }
    return current_url;
  };

  getEvents = async () => {
    const ev = await Axios.get(getURL() + "/event", {
      headers: {
        "content-type": "text/json",
      },
    }).catch((error) => console.log(error));
    let arr = ev.data.message;
    this.setState({ events: [] });
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
        <View
          style={{
            width: "100%",
            flex: 0,
            paddingRight: 8,
            paddingTop: "10%",
            alignItems: "flex-end",
          }}
        >
          <Button
            title={"Edit"}
            titleStyle={{
              color: "black",
              fontSize: 18,
            }}
            buttonStyle={{
              backgroundColor: "transparent",
            }}
            onPress={this.toggleModal}
          />
        </View>

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
            backgroundColor: "#b5d5e3",
          }}
          visible={this.state.isModalVisible}
        >
          <ScrollView style={{ flex: 1, backgroundColor: "#b5d5e3" }}>
            <Text style={styles.title}>ADD A NEW EVENT</Text>
            <View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Enter Event Title</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  onFocus={() =>
                    this.setState({
                      isEndTimeVisible: false,
                      isStartTimeVisible: false,
                    })
                  }
                  onChangeText={(text) => {
                    this.setState({ title: text });
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Select Start Date</Text>
                <DatePicker
                  selected={new Date()}
                  minDate={new Date()}
                  maxDate={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() + 1)
                    )
                  }
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  date={this.state.startDate}
                  customStyles={{
                    dateIcon: {
                      position: "absolute",
                      left: 0,
                      top: 4,
                      marginLeft: 12,
                    },
                    dateInput: {
                      marginLeft: 50,
                    },
                  }}
                  onDateChange={(date) => {
                    this.setState({
                      startDate: date,
                      isEndTimeVisible: false,
                      isStartTimeVisible: false,
                    });
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Select Start Time</Text>
                <Button
                  title={"See Timer"}
                  titleStyle={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  buttonStyle={{
                    backgroundColor: "#ea6227",
                    borderRadius: 8,
                    marginLeft: 12,
                    width: "40%",
                  }}
                  onPress={() =>
                    this.setState({
                      isStartTimeVisible: true,
                      isEndTimeVisible: false,
                    })
                  }
                />
                {this.state.isStartTimeVisible && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(event, data) => {
                      if (Platform.OS == "android") {
                        this.setState({
                          startTime: data,
                          isEndTimeVisible: false,
                          isStartTimeVisible: false,
                        });
                      } else {
                        this.setState({
                          startTime: data,
                          isEndTimeVisible: false,
                        });
                      }
                    }}
                  />
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Select End Date</Text>
                <DatePicker
                  selected={this.state.endDate}
                  minDate={this.state.startDate}
                  maxDate={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() + 1)
                    )
                  }
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: "absolute",
                      left: 0,
                      top: 4,
                      marginLeft: 12,
                    },
                    dateInput: {
                      marginLeft: 50,
                    },
                  }}
                  onDateChange={(date) => {
                    this.setState({
                      endDate: date,
                      isEndTimeVisible: false,
                      isStartTimeVisible: false,
                    });
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Select End Time</Text>
                <Button
                  title={"See Timer"}
                  titleStyle={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  buttonStyle={{
                    backgroundColor: "#ea6227",
                    borderRadius: 8,
                    marginLeft: 12,
                    width: "40%",
                  }}
                  onPress={() =>
                    this.setState({
                      isEndTimeVisible: true,
                      isStartTimeVisible: false,
                    })
                  }
                />
                {this.state.isEndTimeVisible && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(event, data) => {
                      if (Platform.OS == "android") {
                        this.setState({
                          endTime: data,
                          isEndTimeVisible: false,
                          isStartTimeVisible: false,
                        });
                      } else {
                        this.setState({
                          endTime: data,
                          isStartTimeVisible: false,
                        });
                      }
                    }}
                  />
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Enter Event Description</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  onFocus={() =>
                    this.setState({
                      isEndTimeVisible: false,
                      isStartTimeVisible: false,
                    })
                  }
                  multiline={true}
                  onChangeText={(text) => {
                    this.setState({ description: text });
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                marginTop: 7,
              }}
            >
              <Button
                title={"Add Event"}
                titleStyle={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
                buttonStyle={{
                  backgroundColor: "#ea6227",
                  borderRadius: 8,
                  marginRight: 12,
                  width: 120,
                }}
                onPress={() => {
                  this.addEvent();
                }}
              />
              <Button
                title={"Cancel"}
                titleStyle={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
                buttonStyle={{
                  backgroundColor: "#ea6227",
                  borderRadius: 8,
                  marginLeft: 12,
                  width: 120,
                }}
                onPress={() => {
                  this.cleanState();
                  this.toggleModal();
                }}
              />
            </View>
          </ScrollView>
        </Modal>

        <Modal
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            backgroundColor: "#b5d5e3",
          }}
          visible={this.state.isEventVisible}
        >
          <View style={{ flex: 1, backgroundColor: "#b5d5e3" }}>
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
                color: "#ea6227",
              }}
            >
              More Information
            </Text>
            <View style={styles.infoContainer}>
              <Text style={styles.inputTitle}>
                {this.state.currEvent.summary}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                marginTop: 7,
              }}
            >
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
              <Button
                title={"Delete"}
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
                  this.deleteEvent(this.state.currEvent);
                  this.toggleEvent();
                  alert("Event Successfully Deleted");
                }}
              />
            </View>
          </View>
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
    color: "#ea6227",
  },
  input: {
    height: 40,
    marginLeft: 12,
    marginRight: 12,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  inputTitle: {
    marginLeft: 12,
    marginBottom: 5,
    color: "black",
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
