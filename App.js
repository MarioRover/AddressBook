import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ContextProvider } from "~/contexts/AppContext";
import Routes from "./routes";
import { store, presistor } from "~/store";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={presistor}>
        <NavigationContainer>
          <ContextProvider>
            <Routes />
          </ContextProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
