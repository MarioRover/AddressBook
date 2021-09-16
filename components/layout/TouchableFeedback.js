import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

export default function TouchableFeedback({ children, ...props }) {
  let TouchableComponet = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 6) {
    TouchableComponet = TouchableNativeFeedback;
  }

  return (
    <TouchableComponet activeOpacity={0.6} {...props}>
      {children}
    </TouchableComponet>
  );
}
