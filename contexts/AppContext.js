import React, { useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { lightColors, darkColors } from "~/constant/Colors";

const AppContext = React.createContext({
  isDark: false,
  appColors: lightColors,
  position: null,
  toggleTheme: () => {},
  setPosition: () => {},
});

export const ContextProvider = (props) => {
  const colorSchema = useColorScheme();
  const [isDark, setIsDark] = useState(colorSchema === "dark");
  const [position, _setPosition] = useState(null);

  useEffect(() => {
    setIsDark(colorSchema);
  }, [colorSchema]);

  const defaultValue = {
    isDark,
    appColors: isDark ? darkColors : lightColors,
    position,
    toggleTheme: (value) => setIsDark(value === "dark"),
    setPosition: (value) => _setPosition(value),
  };

  return (
    <AppContext.Provider value={defaultValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
