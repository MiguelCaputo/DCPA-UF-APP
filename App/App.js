import React from "react";
import { StyleSheet, Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CalendarComponent from "./Screens/Calendar";
import MapComponent from "./Screens/Map";
import HomeComponent from "./Screens/Home";

const Stack = createStackNavigator();

const App = () => {
  return (
    // Navigate between multiple screens
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            title: " ",
            headerTintColor: "#ea6227",
            headerTransparent: true,
          }}
          component={HomeComponent}
        />
        <Stack.Screen
          name="Calendar"
          options={{
            title: " ",
            headerTintColor: "#ea6227",
            headerTransparent: true,
          }}
          component={CalendarComponent}
        />
        <Stack.Screen
          name="Map"
          options={{
            title: " ",
            headerTintColor: "#ea6227",
            headerTransparent: true,
          }}
          component={MapComponent}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

/*export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.buttonStyle}>
              <Button
              title= 'Map'
              color= 'blue'
              fontWeight = 'bold'
              onPress = {() => goTo(0,0,'5175 SW 13th Pl') }
              />
          </View>
          <View style={styles.buttonStyle}>
              <Button
              title= 'Calendar'
              color= 'orange'
              fontWeight = 'bold'
              onPress = {() => <Calendario />}
              />
          </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginLeft: '10%',
      marginRight: '10%'
},
buttonStyle: {
      padding: 10,
}
});
*/
