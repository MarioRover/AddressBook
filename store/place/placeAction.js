import { createAsyncThunk } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";

export const addPlaceAction = createAsyncThunk(
  "places/addPlace",
  async (data) => {
    const { selectedImage } = data;
    let newPatch = null;
    if (selectedImage) {
      const fileName = selectedImage.split("/").pop();
      newPatch = FileSystem.documentDirectory + fileName;

      try {
        await FileSystem.moveAsync({
          from: selectedImage,
          to: newPatch,
        });
      } catch (error) {
        throw error;
      }
    }

    return {
      ...data,
      selectedImage: newPatch,
    };
  }
);
