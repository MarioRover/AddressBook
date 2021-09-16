import { createAsyncThunk } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";

const saveImageToDirectory = async (imagePath) => {
  try {
    let newPatch = null;
    const fileName = imagePath.split("/").pop();
    newPatch = FileSystem.documentDirectory + fileName;

    await FileSystem.moveAsync({
      from: imagePath,
      to: newPatch,
    });
    return newPatch;
  } catch (error) {
    console.error(error);
  }
};

export const addPlaceAction = createAsyncThunk(
  "places/addPlace",
  async (data) => {
    try {
      const { selectedImage } = data;
      let imagePath = null;

      if (selectedImage) {
        imagePath = await saveImageToDirectory(selectedImage);
      }

      return {
        ...data,
        selectedImage: imagePath,
      };
    } catch (error) {
      console.error(error);
    }
  }
);
