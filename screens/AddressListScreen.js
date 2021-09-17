import React, { useEffect, useMemo } from "react";
import { View, StyleSheet, FlatList, Text, Button } from "react-native";
import { useAppContext } from "~/contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import PlaceItem from "~/components/UI/PlaceItem";
// import * as LocalAuthentication from "expo-local-authentication";
import _ from "lodash";
import { clearAllPlacesAction } from "~/store/place/placeAction";
import globalStyles from "~/styles/globalStyles";

export default function AddressListScreen(props) {
  const { appColors } = useAppContext();
  const dispatch = useDispatch();

  const selectedPlace = useSelector((state) => {
    return state.places.places;
  });

  const memoizedPlaces = useMemo(() => {
    return _.values(selectedPlace);
  }, [selectedPlace]);

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: appColors.background,
      }}
    >
      {/* <Button
        title="Clear State"
        onPress={() => dispatch(clearAllPlacesAction())}
      /> */}
      {memoizedPlaces.length ? (
        <FlatList
          data={memoizedPlaces}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlaceItem {...item} />}
        />
      ) : (
        <View style={{ ...globalStyles.centerScreen }}>
          <Text style={{ color: appColors.text, ...styles.text }}>
            An address has not been created yet
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
