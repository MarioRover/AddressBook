import React from "react";
import { Text, StyleSheet } from "react-native";
import { useAppContext } from "~/contexts/AppContext";

export default function Label({ style, children }) {
  const { appColors } = useAppContext();
  return (
    <Text style={{ ...style, ...styles.text, color: appColors.text }}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});
