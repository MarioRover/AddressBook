import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TouchableFeedback from "~/components/layout/TouchableFeedback";

export default function CustomButton({
  title,
  buttonStyle,
  titleStyle,
  ...props
}) {
  return (
    <TouchableFeedback {...props}>
      <View style={{ ...styles.button, ...buttonStyle }}>
        <Text style={{ ...styles.title, ...titleStyle }}>{title}</Text>
      </View>
    </TouchableFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
});
