import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "~/contexts/ThemeContext";

// import AppStackNavigator from "./routes/AppStackNavigator";
import AppDrawerNavigator from "./routes/AppDrawerNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <StatusBar style="auto" />
        <AppDrawerNavigator />
      </ThemeProvider>
    </NavigationContainer>
  );
}
