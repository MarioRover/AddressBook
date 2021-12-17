import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "~/constant/Colors";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import TouchableFeedback from "~/components/layout/TouchableFeedback";
import ScreenNames from "~/constant/ScreenNames";

const menuItems = [
  {
    title: "All Address",
    icon: <Entypo name="address" size={24} color={Colors.white} />,
    link: ScreenNames.mainStack,
  },
  {
    title: "Settings",
    icon: <Ionicons name="ios-settings-sharp" size={24} color={Colors.white} />,
    link: ScreenNames.settingsStack,
  },
];

const SlideMenu = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        {menuItems.map((item, index) => (
          <TouchableFeedback
            key={index}
            onPress={() => navigation.navigate(item.link)}
          >
            <View style={styles.itemRow}>
              {item.icon}
              <Text style={styles.titleRow}>{item.title}</Text>
            </View>
          </TouchableFeedback>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightBlue,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  titleRow: {
    marginLeft: 25,
    color: Colors.white,
  },
});

export default SlideMenu;
