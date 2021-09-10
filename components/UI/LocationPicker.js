import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

export default function LocationPicker() {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 35.665840627698245,
        longitude: 51.4198075771275,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      // pitchEnabled={false}
      // rotateEnabled={false}
      // zoomEnabled={false}
      // scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
