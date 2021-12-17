import React from "react";
import { View, StyleSheet, Text, Image, Animated } from "react-native";
import { useAppContext } from "~/contexts/AppContext";
import TouchableFeedback from "~/components/layout/TouchableFeedback";
import { useNavigation } from "@react-navigation/core";
import ScreenNames from "~/constant/ScreenNames";

const AVATAR_SIZE = 60;
const SPACING = 20;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default function PlaceItem({
  title,
  address,
  imageUri,
  id,
  scrollY,
  index,
}) {
  const { appColors } = useAppContext();
  const navigation = useNavigation();

  const pressPlaceHandle = () => {
    navigation.navigate(ScreenNames.newAddress, {
      id,
    });
  };

  const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];

  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0],
  });

  const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)];

  const opacity = scrollY.interpolate({
    inputRange: opacityInputRange,
    outputRange: [1, 1, 1, 0],
  });

  return (
    <TouchableFeedback onPress={pressPlaceHandle}>
      <Animated.View
        style={{ ...styles.container, transform: [{ scale }], opacity }}
      >
        <Image style={styles.avatar} source={{ uri: imageUri }} />
        <View style={styles.infoContaienr}>
          <Text style={{ color: appColors.text, ...styles.title }}>
            {title}
          </Text>
          <Text style={{ color: appColors.plcaeItem.text, ...styles.address }}>
            {address}
          </Text>
        </View>
      </Animated.View>
    </TouchableFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: SPACING,
    backgroundColor: "rgba(255,255,255,0.9)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  infoContaienr: {
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    opacity: 0.8,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: SPACING / 2,
  },
});
