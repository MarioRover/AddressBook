import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddressListScreen from "~/screens/AddressListScreen";
import ScreenNames from "~/constant/ScreenNames";
import HeaderButton from "~/components/UI/HeaderButton";
import NewAddressScreen from "~/screens/NewAddressScreen";
import { useTheme } from "~/contexts/ThemeContext";
import { useNavigation } from "@react-navigation/core";
import SettingsScreen from "~/screens/SettingsScreen";

const Stack = createNativeStackNavigator();

const screenOptions = (color) => {
  return {
    headerStyle: {
      backgroundColor: color.header.background,
    },
    headerTintColor: color.header.title,
    headerTitleAlign: "center",
  };
};

const DrawerToggleIcon = () => {
  const { color } = useTheme();
  const navigation = useNavigation();

  return (
    <HeaderButton
      name="menu"
      color={color.header.title}
      onPress={() => navigation.toggleDrawer()}
    />
  );
};

export function MainStackNavigator() {
  const { color } = useTheme();
  return (
    <Stack.Navigator screenOptions={screenOptions(color)}>
      <Stack.Screen
        name={ScreenNames.addressListName}
        component={AddressListScreen}
        options={({ navigation }) => ({
          title: "All Address",
          headerRight: () => (
            <HeaderButton
              name="add"
              color={color.header.title}
              onPress={() => navigation.navigate(ScreenNames.newAddress)}
            />
          ),
          headerLeft: () => <DrawerToggleIcon />,
        })}
      />

      <Stack.Screen
        name={ScreenNames.newAddress}
        component={NewAddressScreen}
        options={{
          title: "New Address",
        }}
      />
    </Stack.Navigator>
  );
}

export function SettingsStackNavigator() {
  const { color } = useTheme();
  return (
    <Stack.Navigator screenOptions={screenOptions(color)}>
      <Stack.Screen
        name={ScreenNames.settings}
        component={SettingsScreen}
        options={{
          title: "Settings App",
          headerLeft: () => <DrawerToggleIcon />,
        }}
      />
    </Stack.Navigator>
  );
}
