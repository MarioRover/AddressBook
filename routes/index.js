import React from "react";
import { StatusBar } from "expo-status-bar";
import AppDrawerNavigator from "./AppDrawerNavigator";
import { useTheme } from "~/contexts/ThemeContext";

export default function Routes() {
  const { isDark } = useTheme();
  return (
    <React.Fragment>
      <StatusBar style={isDark ? "dark" : "light"} />
      <AppDrawerNavigator />
    </React.Fragment>
  );
}
