import React, { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapComponent from "~/components/UI/MapComponent";
import { useAppContext } from "~/contexts/AppContext";
import { useNavigation } from "@react-navigation/core";
import ScreenNames from "~/constant/ScreenNames";
import HeaderButton from "~/components/UI/HeaderButton";
import { Colors } from "~/constant/Colors";

export default function MapScreen({ route }) {
  const { position } = useAppContext();
  const navigation = useNavigation();
  const [markerPos, setMarkerPos] = React.useState();

  const setMarkerHandler = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerPos({ latitude, longitude });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          title="Save"
          color={Colors.lightBlue}
          onPress={() => {
            navigation.navigate({
              name: ScreenNames.newAddress,
              params: { markerPos },
              merge: true,
            });
          }}
        />
      ),
    });
  }, [navigation, markerPos]);

  React.useEffect(() => {
    if (route.params && route.params.markerPosition) {
      setMarkerPos(route.params.markerPosition);
    }
  }, [route]);

  return (
    <View style={styles.screen}>
      <MapComponent
        region={markerPos}
        markerPosition={markerPos}
        markerTitle="Your Place"
        setMarkerHandler={setMarkerHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
