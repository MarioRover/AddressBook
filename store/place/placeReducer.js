import { createSlice } from "@reduxjs/toolkit";
import PlaceModel from "~/models/placeModel";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { addPlaceAction } from "~/store/place/placeAction";

const initialState = {
  places: [],
};

const placeSlice = createSlice({
  name: "places",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addPlaceAction.fulfilled, (state, { payload }) => {
      const { title, phone, email, address, desc, selectedImage } = payload;
      const newPlace = new PlaceModel(
        uuid(),
        title,
        phone,
        email,
        address,
        desc,
        selectedImage,
        null
      );
      state.places.push(newPlace);
    });
  },
});

// export const { addPlace } = placeSlice.actions;
export default placeSlice.reducer;
