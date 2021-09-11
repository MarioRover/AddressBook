import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useTheme } from "~/contexts/ThemeContext";

export default function PlaceItem({ title, address, imageUri }) {
  const { color } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.imgContainer,
          backgroundColor: color.plcaeItem.background,
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
        <Text style={{ color: color.text, ...styles.title }}>{title}</Text>
        <Text style={{ color: color.plcaeItem.text, ...styles.address }}>
          {address}
        </Text>
      </View>
    </View>
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
    width: 55,
    height: 55,
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
