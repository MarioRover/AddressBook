import React, { useMemo } from "react";
import { View, StyleSheet, Text, Button, Image, Animated } from "react-native";
import { useAppContext } from "~/contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import PlaceItem from "~/components/common/PlaceItem";
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

  const scrollY = React.useRef(new Animated.Value(0)).current;

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
        <React.Fragment>
          <Image
            source={require("~/assets/rose.jpg")}
            style={StyleSheet.absoluteFillObject}
            resizeMode="contain"
            blurRadius={10}
          />
          <Animated.FlatList
            data={memoizedPlaces}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: scrollY } },
                },
              ],
              {
                useNativeDriver: true,
              }
            )}
            contentContainerStyle={{
              padding: 15,
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <PlaceItem {...item} scrollY={scrollY} index={index} />
            )}
          />
        </React.Fragment>
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
