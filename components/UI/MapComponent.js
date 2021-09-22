import React, { useLayoutEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Colors } from "~/constant/Colors";

const DEFAULT_LATITUDE = 37.327823;
const DEFAULT_LONGITUDE = -122.01981479;
const DEFAULT_ZOOM = 0.09;

export default function MapComponent({
  region,
  markerPosition,
  zoom = DEFAULT_ZOOM,
  markerTitle = null,
  setMarkerHandler,
}) {
  const [mapRegion, setMapRegion] = React.useState(null);

  React.useLayoutEffect(() => {
    if (region) {
      setMapRegion({
        latitude: region && region.latitude,
        longitude: region && region.longitude,
        latitudeDelta: zoom,
        longitudeDelta: zoom,
      });
    }
  }, [region]);

  // console.log({ region });

  return (
    <MapView
      style={styles.map}
      initialRegion={mapRegion}
      onLongPress={setMarkerHandler}
      onDoublePress={setMarkerHandler}
    >
      {markerPosition && (
        <Marker
          title={markerTitle}
          coordinate={{
            latitude: markerPosition.latitude,
            longitude: markerPosition.longitude,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
