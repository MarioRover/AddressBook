import React from "react";
import { View, StyleSheet } from "react-native";

export default function Row(props) {
  return <View style={styles.row}>{props.children}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
