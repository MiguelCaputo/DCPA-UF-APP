import { CalendarList } from "react-native-calendars";
import { ImageBackground } from "react-native";
import React from "react";
import { Font } from "expo";

var CalendarComponent = () => {
  return (
    <ImageBackground
      source={require("../assets/back.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <CalendarList
        firstDay={1}
        style={{
          borderWidth: 0,
          borderColor: "#ffac47",
          height: 1000,
        }}
        onDayPress={(day) => {
          alert(`day pressed, ${day.day}`);
        }}
        pastScrollRange={20}
        futureScrollRange={20}
        theme={{
          backgroundColor: "transparent",
          calendarBackground: "transparent",
          textSectionTitleDisabledColor: "red",
          selectedDayBackgroundColor: "red",
          selectedDayTextColor: "red",
          todayTextColor: "red",
          textDisabledColor: "red",
          dotColor: "#00adf5",
          textSectionTitleColor: "white",
          selectedDotColor: "white",
          monthTextColor: "white",
          indicatorColor: "white",
          dayTextColor: "white",
          textDayFontFamily: "monospace",
          textMonthFontFamily: "monospace",
          textDayHeaderFontFamily: "monospace",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "bold",
          textDayFontSize: 20,
          textMonthFontSize: 30,
          textDayHeaderFontSize: 18,
        }}
      />
    </ImageBackground>
  );
};

export default CalendarComponent;
