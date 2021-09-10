import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "~/contexts/ThemeContext";
import Input from "~/components/UI/Input";
import ImagePicker from "~/components/UI/ImagePicker";
import LocationPicker from "~/components/UI/LocationPicker";

export default function NewAddressScreen() {
  const { color } = useTheme();

  let FormContent = View;
  if (Platform.OS === "ios") {
    FormContent = KeyboardAvoidingView;
  }

  return (
    <FormContent
      style={{ ...styles.screen, backgroundColor: color.background }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ ...styles.mapView, backgroundColor: color.input.background }}
        >
          <LocationPicker />
        </View>

        <View style={{ padding: 15 }}>
          <ImagePicker />

          <Input title="Title" required />
          <Input
            title="Phone"
            placeholder="123456789"
            keyboardType="phone-pad"
          />
          <Input
            title="Email"
            placeholder="example@email.com"
            keyboardType="email-address"
          />
          <Input title="Address" multiline />
          <Input title="Description" multiline />
        </View>
      </ScrollView>
    </FormContent>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  mapView: {
    width: "100%",
    height: 250,
    backgroundColor: "#fff",
  },
});
