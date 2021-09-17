import React, { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapComponent from "~/components/UI/MapComponent";
import { useAppContext } from "~/contexts/AppContext";
import { useNavigation } from "@react-navigation/core";
import ScreenNames from "~/constant/ScreenNames";
import HeaderButton from "~/components/UI/HeaderButton";
import { Colors } from "~/constant/Colors";

export default function MapScreen() {
  const { position } = useAppContext();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          title="Save"
          color={Colors.lightBlue}
          onPress={() => {
            navigation.navigate(ScreenNames.newAddress, {
              position,
            });
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <MapComponent markerPosition={position} markerTitle="Your Place" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
