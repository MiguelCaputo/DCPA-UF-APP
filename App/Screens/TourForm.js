import React, { useState } from "react";
import { Formik } from "formik";
import RNPickerSelect from "react-native-picker-select";
import { RadioButton } from "react-native-paper";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Linking,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";

//Rendering the form to send emails
const TourFormComponent = () => {
  const [value, setValue] = useState("");

  return (
    <ScrollView style={{ backgroundColor: "#b5d5e3" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Tour Schedule Form</Text>
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            ufid: "",
            useremail: "",
            tourtime: "",
            tourday: "",
            tourType: "In person",
          }}
          onSubmit={(values) => {
            if (values.firstname == "") alert("Please Add First Name");
            else if (values.lastname == "") alert("Please Add Last Name");
            else if (values.useremail == "") alert("Please Add Email");
            else if (values.tourtime == "") alert("Please Select Tour Time");
            else if (values.tourday == "") alert("Please Select Tour Date");
            else if (value == "") alert("Please Select Tour Type");
            else {
              let email = `Hello,\n\nMy name is ${values.firstname} ${values.lastname}. I am sending this email because I would like to schedule a tour with the UF College of Design, Construction, and Planning Ambassadors. I would like to schedule ${value} tour on your next available ${values.tourday} at ${values.tourtime} Please confirm if this is possible.\n\nThank you for your time,\n\n${values.firstname} ${values.lastname}\n${values.useremail}\n${values.ufid}`;
              Linking.openURL(
                `mailto:dcpambassadors@gmail.com?subject=Schedule Tour&body=${email}`
              );
            }
          }}
        >
          {(props) => (
            <View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>First Name</Text>
                <TextInput
                  onChangeText={props.handleChange("firstname")}
                  value={props.values.firstname}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Last Name</Text>
                <TextInput
                  onChangeText={props.handleChange("lastname")}
                  value={props.values.lastname}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>UF ID (optional)</Text>
                <TextInput
                  onChangeText={props.handleChange("ufid")}
                  value={props.values.ufid}
                  style={styles.input}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput
                  onChangeText={props.handleChange("useremail")}
                  value={props.values.useremail}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Select a Tour Time</Text>

                <RNPickerSelect
                  items={[
                    { label: "10:00 A.M.", value: "10:00 A.M." },
                    { label: "10:30 A.M.", value: "10:30 A.M." },
                    { label: "11:00 A.M.", value: "11:00 A.M." },
                    { label: "11:30 A.M.", value: "11:30 A.M." },
                    { label: "12:00 P.M.", value: "12:00 P.M." },
                    { label: "12:30 P.M.", value: "12:30 P.M." },
                    { label: "1:00 P.M.", value: "1:00 P.M." },
                    { label: "1:30 P.M.", value: "1:30 P.M." },
                    { label: "2:00 P.M.", value: "2:00 P.M." },
                    { label: "2:30 P.M.", value: "2:30 P.M." },
                    { label: "3:00 P.M.", value: "3:00 P.M." },
                    { label: "3:30 P.M.", value: "3:30 P.M." },
                    { label: "4:00 P.M.", value: "4:00 P.M." },
                    { label: "4:30 P.M.", value: "4:30 P.M." },
                  ]}
                  useNativeAndroidPickerStyle={false}
                  onValueChange={props.handleChange("tourtime")}
                  style={{
                    inputAndroid: {
                      color: "black",
                      height: 40,
                      marginLeft: 12,
                      marginRight: 12,
                      borderWidth: 1,
                      paddingHorizontal: 5,
                    },
                    inputIOS: {
                      color: "black",
                      height: 40,
                      marginLeft: 12,
                      marginRight: 12,
                      borderWidth: 1,
                      paddingHorizontal: 5,
                    },
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Select a Tour Day</Text>

                <RNPickerSelect
                  items={[
                    { label: "Monday", value: "Monday" },
                    { label: "Tuesday", value: "Tuesday" },
                    { label: "Wednesday", value: "Wednesday" },
                    { label: "Thursday", value: "Thursday" },
                    { label: "Friday", value: "Friday" },
                    { label: "Saturday", value: "Saturday" },
                  ]}
                  useNativeAndroidPickerStyle={false}
                  onValueChange={props.handleChange("tourday")}
                  style={{
                    inputAndroid: {
                      color: "black",
                      height: 40,
                      marginLeft: 12,
                      marginRight: 12,
                      borderWidth: 1,
                      paddingHorizontal: 5,
                    },
                    inputIOS: {
                      color: "black",
                      height: 40,
                      marginLeft: 12,
                      marginRight: 12,
                      borderWidth: 1,
                      paddingHorizontal: 5,
                    },
                  }}
                />
              </View>
              <Text></Text>

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
                <RadioButton.Group
                  onValueChange={(value) => setValue(value)}
                  value={value}
                >
                  <RadioButton.Item
                    label="In Person"
                    labelStyle={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                    style={{
                      backgroundColor: "#ea6227",
                      borderRadius: 8,
                      width: Dimensions.get("window").width - 96,
                      height: 50,
                    }}
                    value="an in-person"
                  />
                  <Text></Text>
                  <RadioButton.Item
                    label="Virtual"
                    labelStyle={{
                      color: "white",
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                    style={{
                      backgroundColor: "#ea6227",
                      borderRadius: 8,

                      height: 50,
                    }}
                    value="a virtual"
                  />
                </RadioButton.Group>
              </View>
              <Text></Text>
              <Button
                title="Send Email"
                titleStyle={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
                buttonStyle={{
                  backgroundColor: "#ea6227",
                  borderRadius: 10,
                  marginLeft: 18,
                  marginRight: 18,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={props.handleSubmit}
              />
            </View>
          )}
        </Formik>
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
    marginTop: "10%",
    paddingBottom: 20,
  },
  title: {
    paddingTop: "10%",
    paddingBottom: "3%",
    color: "#ea6227",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
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
});

export default TourFormComponent;
