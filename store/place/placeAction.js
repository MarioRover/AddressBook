import { createAsyncThunk } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const clearAllPlacesAction = createAsyncThunk(
  "places/clearAll",
  async () => {
    try {
      let key;
      await AsyncStorage.getAllKeys((error, keys) => {
        if (error) throw error;
        key = keys[0];
      });
      if (key) {
        console.log("CLEEEAARRRRR");
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error(error);
    }
  }
);

//////////////////////////////////////
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
