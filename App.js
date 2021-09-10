import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "~/contexts/ThemeContext";
import Routes from "./routes";

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </NavigationContainer>
  );
}
