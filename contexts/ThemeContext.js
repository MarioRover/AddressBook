import React, { useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { lightColors, darkColors } from "~/constant/Colors";

const ThemeContext = React.createContext({
  isDark: false,
  color: lightColors,
  toggleTheme: () => {},
});

export const ThemeProvider = (props) => {
  const colorSchema = useColorScheme();
  const [isDark, setIsDark] = useState(colorSchema === "dark");

  useEffect(() => {
    setIsDark(colorSchema);
  }, [colorSchema]);

  const defaultValue = {
    isDark,
    color: isDark ? darkColors : lightColors,
    toggleTheme: (value) => setIsDark(value === "dark"),
  };

  return (
    <ThemeContext.Provider value={defaultValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
