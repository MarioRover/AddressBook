import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useTheme } from "~/contexts/ThemeContext";
import { useSelector } from "react-redux";
import PlaceItem from "~/components/UI/PlaceItem";

export default function AddressListScreen(props) {
  const { color } = useTheme();
  const selectedPlaces = useSelector((state) => state.places.places);

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: color.background,
      }}
    >
      <FlatList
        data={selectedPlaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceItem {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
