import React, { useState, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const DEFAULT_LATITUDE = 37.327823;
const DEFAULT_LONGITUDE = -122.01981479;
const DEFAULT_ZOOM = 0.09;

export default function MapComponent({
  markerPosition,
  zoom = DEFAULT_ZOOM,
  markerTitle = null,
}) {
  const [position, setPosition] = useState({
    latitude: markerPosition ? markerPosition.latitude : DEFAULT_LATITUDE,
    longitude: markerPosition ? markerPosition.longitude : DEFAULT_LONGITUDE,
    latitudeDelta: zoom,
    longitudeDelta: zoom,
  });

  const longPressHandler = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setPosition((prevState) => ({
      ...prevState,
      latitude,
      longitude,
    }));
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={position}
      onLongPress={longPressHandler}
      onDoublePress={longPressHandler}
    >
      {markerPosition && (
        <Marker
          title={markerTitle}
          coordinate={{
            latitude: position.latitude,
            longitude: position.longitude,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
