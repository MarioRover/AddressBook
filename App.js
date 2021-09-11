import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { ThemeProvider } from "~/contexts/ThemeContext";
import Routes from "./routes";
import store from "~/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
}
