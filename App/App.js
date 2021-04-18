import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import TourFormComponent from "./Screens/TourForm";
import MapComponent from "./Screens/Map";
import HomeComponent from "./Screens/Home";
import { Event } from "./Screens/Events";
import { AdminEvent } from "./Screens/AdminEvents";
import About from "./Screens/AboutUs";
import Contact from "./Screens/ContactUs";
import ScheduleTourComponent from "./Screens/ScheduleTours";
import DashboardComponent from "./Screens/Dashboard";
import Axios from "axios";

const Stack = createStackNavigator();
const AuthContext = React.createContext();

//Function to easily create a stack screen
const createScreen = (name, comp, color, trans) => {
  return (
    <Stack.Screen
      name={name}
      options={{
        title: " ",
        headerTintColor: color,
        headerTransparent: trans,
      }}
      component={comp}
    />
  );
};

function LogOutComponent() {
  //Initializing the context for sign out
  const { signOut } = React.useContext(AuthContext);
  signOut();

  //Rendering
  return signOut;
}

//Function to render the login form
function LoginComponent() {
  //Setting up the variables
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  //Initializing the context for sign in
  const { signIn } = React.useContext(AuthContext);

  //Rendering
  return (
    <ImageBackground
      source={require("./assets/back.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>DCPA SIGN IN</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button
            title="Sign In"
            titleStyle={{
              color: "white",
              fontSize: 20,
            }}
            buttonStyle={{
              backgroundColor: "#ea6227",
              borderRadius: 10,
              marginLeft: 15,
              marginRight: 15,
            }}
            onPress={() => {
              signIn({ username, password });
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

//Main component of the app
const App = () => {
  //Checking the state of the login
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  // Get the server url
  getURL = () => {
    var current_url = "http://localhost:3001";
    if (process.env.NODE_ENV.localeCompare("development") == 0)
      current_url = process.env.URL;
    return current_url;
  };

  //Confirming the login with the database
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        var username = data.username;
        var password = data.password;
        var url = getURL();
        console.log(url);
        console.log(process.env.URL);
        console.log(process.env.URI);
        const res1 = await Axios.get(url + "/login", {
          headers: {
            "content-type": "text/json",
          },
        });
        var creds = res1.data.message[0];
        if (creds.username == username && creds.password == password) {
          dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
        } else {
          alert("Re-enter username and password!");
        }
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  // Navigate between multiple screens
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            <>
              {createScreen("Home", HomeComponent, "#ea6227", true)}
              {createScreen("Map", MapComponent, "#ea6227", true)}
              {createScreen("Event", Event, "#ea6227", false)}
              {createScreen("About Us", About, "#ea6227", true)}
              {createScreen("Contact Us", Contact, "#ea6227", true)}
              {createScreen(
                "Schedule Tours",
                ScheduleTourComponent,
                "#ea6227",
                true
              )}
              {createScreen("Login", LoginComponent, "#ea6227", true)}
              {createScreen(
                "Schedule Tour_",
                TourFormComponent,
                "#ea6227",
                true
              )}
            </>
          ) : (
            // User is signed in
            <>
              {createScreen("Dashboard", DashboardComponent, "#ea6227", true)}
              {createScreen("Calendar", CalendarComponent, "#ea6227", true)}
              {createScreen("Map", MapComponent, "#ea6227", true)}
              {createScreen("Admin Event", AdminEvent, "#ea6227", false)}
              {createScreen("About Us", About, "#ea6227", true)}
              {createScreen("Contact Us", Contact, "#ea6227", true)}
              {createScreen("Log Out", LogOutComponent, "#ea6227", true)}
              {createScreen(
                "Schedule Tours",
                ScheduleTourComponent,
                "#ea6227",
                true
              )}
              {createScreen(
                "Schedule Tour_",
                TourFormComponent,
                "#ea6227",
                true
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    marginLeft: "7%",
    marginRight: "7%",
    paddingBottom: 20,
    justifyContent: "center",
  },
  buttonStyle: {
    padding: 10,
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
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  inputContainer: {
    padding: 10,
  },
  title: {
    paddingTop: "10%",
    paddingBottom: "3%",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
});
