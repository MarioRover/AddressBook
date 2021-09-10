import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "~/contexts/ThemeContext";
import HeaderButton from "./HeaderButton";

export default function ImagePicker() {
  const { color } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.5}>
        <View
          style={{
            ...styles.pickerWrap,
            backgroundColor: color.input.background,
            borderColor: color.input.border,
          }}
        >
          <HeaderButton name="camera" color={color.input.border} size={50} />
          <Text style={{ ...styles.label, color: color.input.palceholder }}>
            Upload a Image
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  pickerWrap: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
