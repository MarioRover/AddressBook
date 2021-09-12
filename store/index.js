import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import placeReducer from "./place/placeReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["places"],
};

export const store = configureStore({
  reducer: {
    places: persistReducer(persistConfig, placeReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const presistor = persistStore(store);
