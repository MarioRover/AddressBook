import React from "react";
import { View, Text } from "react-native";
import globalStyle from "~/styles/globalStyles";
import Label from "~/components/UI/Label";
import { useTheme } from "~/contexts/ThemeContext";

export default function NewAddressScreen() {
  const { color } = useTheme();
  return (
    <View
      style={{ ...globalStyle.centerScreen, backgroundColor: color.background }}
    >
      <Label>New Address</Label>
    </View>
  );
}
