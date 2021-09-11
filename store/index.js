import { configureStore } from "@reduxjs/toolkit";
import placeReducer from "./place/placeReducer";

export default configureStore({
  reducer: {
    places: placeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
