import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
///////////////
import AppDrawerNavigator from "./AppDrawerNavigator";
import { useAppContext } from "~/contexts/AppContext";

export default function Routes() {
  const { isDark, setPosition } = useAppContext();

  const configPermissionesApp = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        let currentPosition = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });
        if (currentPosition) {
          setPosition({
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    configPermissionesApp();
  }, []);

  return (
    <React.Fragment>
      <StatusBar style={isDark ? "dark" : "light"} />
      <AppDrawerNavigator />
    </React.Fragment>
  );
}
