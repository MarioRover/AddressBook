import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { ThemeProvider } from "~/contexts/ThemeContext";
import Routes from "./routes";
import { store, presistor } from "~/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={presistor}>
        <NavigationContainer>
          <ThemeProvider>
            <Routes />
          </ThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
