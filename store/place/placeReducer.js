import { createSlice } from "@reduxjs/toolkit";
import PlaceModel from "~/models/placeModel";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import {
  addPlaceAction,
  clearAllPlacesAction,
} from "~/store/place/placeAction";

const initialState = {
  places: {},
};

const placeSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    updatePlace(state, { payload }) {
      const newPlace = new PlaceModel(
        payload.id,
        payload.title,
        payload.phone,
        payload.email,
        payload.address,
        payload.desc,
        payload.selectedImage,
        payload.selectedPosition
      );
      state.places[payload.id] = newPlace;
    },
    deletePlace(state, { payload }) {
      if (payload.id) {
        delete state.places[payload.id];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPlaceAction.fulfilled, (state, { payload }) => {
      const id = uuid();
      const newPlace = new PlaceModel(
        id,
        payload.title,
        payload.phone,
        payload.email,
        payload.address,
        payload.desc,
        payload.selectedImage,
        payload.selectedPosition
      );
      state.places[id] = newPlace;
    });
    builder.addCase(clearAllPlacesAction.fulfilled, (state) => {
      for (let key in state.places) {
        delete state.places[key];
      }
    });
  },
});

export const { updatePlace, deletePlace } = placeSlice.actions;
export default placeSlice.reducer;
