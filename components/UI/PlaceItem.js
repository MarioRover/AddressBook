import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useAppContext } from "~/contexts/AppContext";
import TouchableFeedback from "~/components/layout/TouchableFeedback";
import { useNavigation } from "@react-navigation/core";
import ScreenNames from "~/constant/ScreenNames";

export default function PlaceItem({ title, address, imageUri, id }) {
  const { appColors } = useAppContext();
  const navigation = useNavigation();

  const pressPlaceHandle = () => {
    navigation.navigate(ScreenNames.newAddress, {
      id,
    });
  };

  return (
    <TouchableFeedback onPress={pressPlaceHandle}>
      <View style={styles.container}>
        <View
          style={{
            ...styles.imgContainer,
            backgroundColor: appColors.plcaeItem.background,
          }}
        >
          <View style={styles.image}>
            <Image
              style={styles.image}
              source={{ uri: imageUri }}
              resizeMethod="resize"
            />
          </View>
        </View>
        <View style={styles.infoContaienr}>
          <Text style={{ color: appColors.text, ...styles.title }}>
            {title}
          </Text>
          <Text style={{ color: appColors.plcaeItem.text, ...styles.address }}>
            {address}
          </Text>
        </View>
      </View>
    </TouchableFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  imgContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
    overflow: "hidden",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    fontSize: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
