import React from "react";
import { View, StyleSheet, Switch } from "react-native";
import { useTheme } from "~/contexts/ThemeContext";
import Row from "~/components/UI/Row";
import Label from "~/components/UI/Label";

export default function SettingsScreen() {
  const { isDark, color, toggleTheme } = useTheme();
  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: color.background,
      }}
    >
      <View style={styles.form}>
        <View style={styles.row}>
          <Row>
            <Label style={{ color: color.text }}>Dark Mode Theme</Label>
            <Switch
              value={isDark}
              onValueChange={() => toggleTheme(isDark ? "light" : "dark")}
            />
          </Row>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 15,
  },
});
