import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddressListScreen from "~/screens/AddressListScreen";
import ScreenNames from "~/constant/ScreenNames";
import HeaderButton from "~/components/common/HeaderButton";
import NewAddressScreen from "~/screens/NewAddressScreen";
import { useAppContext } from "~/contexts/AppContext";
import { useNavigation } from "@react-navigation/core";
import SettingsScreen from "~/screens/SettingsScreen";
import MapScreen from "~/screens/MapScreen";

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
  const { appColors } = useAppContext();
  const navigation = useNavigation();

  return (
    <HeaderButton
      name="menu"
      color={appColors.header.title}
      onPress={() => navigation.toggleDrawer()}
    />
  );
};

export function MainStackNavigator() {
  const { appColors } = useAppContext();
  return (
    <Stack.Navigator screenOptions={screenOptions(appColors)}>
      <Stack.Screen
        name={ScreenNames.addressListName}
        component={AddressListScreen}
        options={({ navigation }) => ({
          title: "All Address",
          headerRight: () => (
            <HeaderButton
              name="add"
              color={appColors.header.title}
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

      <Stack.Screen
        name={ScreenNames.map}
        component={MapScreen}
        options={{
          title: "Map",
        }}
      />
    </Stack.Navigator>
  );
}

export function SettingsStackNavigator() {
  const { appColors } = useAppContext();
  return (
    <Stack.Navigator screenOptions={screenOptions(appColors)}>
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
