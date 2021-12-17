import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ScreenNames from "~/constant/ScreenNames";
import HeaderButton from "~/components/common/HeaderButton";
import { Colors } from "~/constant/Colors";
import {
  MainStackNavigator,
  SettingsStackNavigator,
} from "./AppStackNavigator";
import SlideMenu from "./SlideMenu";
import { useRoute } from "@react-navigation/core";

const Drawer = createDrawerNavigator();

const DrawerIcons = ({ name }) => {
  return <HeaderButton name={name} color={Colors.white} />;
};

export default function AppDrawerNavigator() {
  const getDrawerContent = (navigation) => {
    return <SlideMenu navigation={navigation} />;
  };

  return (
    <Drawer.Navigator
      drawerContent={({ navigation }) => getDrawerContent(navigation)}
      // screenOptions={{
      //   drawerStyle: {
      //     backgroundColor: Colors.primary,
      //   },
      //   drawerActiveBackgroundColor: Colors.lightBlue,
      //   drawerLabelStyle: {
      //     color: Colors.white,
      //   },
      // }}
    >
      <Drawer.Screen
        name={ScreenNames.mainStack}
        component={MainStackNavigator}
        options={{
          title: "All Address",
          headerShown: false,
          drawerIcon: () => <DrawerIcons name="home" />,
        }}
      />

      <Drawer.Screen
        name={ScreenNames.settingsStack}
        component={SettingsStackNavigator}
        options={{
          title: "Settings",
          headerShown: false,
          drawerIcon: () => <DrawerIcons name="ios-settings-sharp" />,
        }}
      />
    </Drawer.Navigator>
  );
}
