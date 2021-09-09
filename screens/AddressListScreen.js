import React, { useContext } from "react";
import { View, Text, StyleSheet, useColorScheme, Switch } from "react-native";
import { useTheme } from "~/contexts/ThemeContext";
import globalStyles from "~/styles/globalStyles";
import Label from "~/components/UI/Label";

export default function AddressListScreen(props) {
  const { color } = useTheme();

  return (
    <View
      style={{
        ...globalStyles.centerScreen,
        backgroundColor: color.background,
      }}
    >
      <Label>Address List Page</Label>
    </View>
  );
}

const styles = StyleSheet.create({});
