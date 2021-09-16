import { createSlice } from "@reduxjs/toolkit";
import PlaceModel from "~/models/placeModel";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { addPlaceAction } from "~/store/place/placeAction";

const initialState = {
  places: {},
};

const placeSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    clearAllPlaces(state) {
      for (let key in state.places) {
        delete state.places[key];
      }
    },
    updatePlace(state, { payload }) {
      const { title, phone, email, address, desc, selectedImage, id } = payload;
      const newPlace = new PlaceModel(
        id,
        title,
        phone,
        email,
        address,
        desc,
        selectedImage,
        null
      );
      state.places[id] = newPlace;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPlaceAction.fulfilled, (state, { payload }) => {
      const { title, phone, email, address, desc, selectedImage } = payload;
      const id = uuid();
      const newPlace = new PlaceModel(
        id,
        title,
        phone,
        email,
        address,
        desc,
        selectedImage,
        null
      );
      state.places[id] = newPlace;
    });
  },
});

export const { clearAllPlaces, updatePlace } = placeSlice.actions;
export default placeSlice.reducer;
