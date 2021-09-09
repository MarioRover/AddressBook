import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "~/contexts/ThemeContext";

export default function Label({ style, children }) {
  const { color } = useTheme();
  return (
    <Text style={{ ...style, ...styles.text, color: color.text }}>
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
