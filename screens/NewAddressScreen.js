import React, { useState, useLayoutEffect, useReducer } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useTheme } from "~/contexts/ThemeContext";
import { isEmpty, isEmail, isMobilePhone } from "~/helpers/validator";
import { useNavigation } from "@react-navigation/core";
import { Colors } from "~/constant/Colors";
import { useDispatch } from "react-redux";
import { addPlaceAction } from "~/store/place/placeAction";

// Component
import HeaderButton from "~/components/UI/HeaderButton";
import Input from "~/components/UI/Input";
import ImagePicker from "~/components/UI/ImagePicker";
import LocationPicker from "~/components/UI/LocationPicker";
import ScreenNames from "~/constant/ScreenNames";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  const { type, value, input, isValid } = action;
  if (type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [input]: value,
    };
    const updatedValidaties = {
      ...state.inputvalidaties,
      [input]: isValid,
    };

    let updatedFormIsValid = true;

    for (const key in updatedValidaties) {
      updatedFormIsValid = updatedFormIsValid && updatedValidaties[key];
    }

    return {
      ...state,
      inputValues: updatedValues,
      inputvalidaties: updatedValidaties,
      formIsValid: updatedFormIsValid,
    };
  }
};

export default function NewAddressScreen() {
  const { color } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: "",
      phone: "",
      email: "",
      address: "",
      desc: "",
    },
    inputvalidaties: {
      title: false,
      phone: true,
      email: true,
      address: true,
      desc: true,
    },
    formIsValid: false,
  });

  let FormContent = View;
  if (Platform.OS === "ios") {
    FormContent = KeyboardAvoidingView;
  }

  const textChangeInput = (input, text) => {
    let isValid = true;

    switch (input) {
      case "title":
        if (isEmpty(text)) {
          isValid = false;
        }
        break;
      case "email":
        if (!isEmail(text)) {
          isValid = false;
        }
        break;

      case "phone":
        if (!isMobilePhone(text, "fa-IR")) {
          isValid = false;
        }
        break;
      default:
        break;
    }

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      input,
      isValid,
    });
  };

  const handleSubmitForm = () => {
    if (formState.formIsValid) {
      dispatch(addPlaceAction({ ...formState.inputValues, selectedImage }));
    } else {
      Alert.alert("Form Validation!", "Please fill field with currect value.", [
        {
          style: "default",
          text: "Okey",
        },
      ]);
    }
    navigation.navigate(ScreenNames.addressListName);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          name="ios-save"
          color={Colors.lightBlue}
          onPress={handleSubmitForm}
        />
      ),
    });
  }, [navigation, formState, selectedImage]);

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
          <ImagePicker onTakeImage={setSelectedImage} />

          <Input
            title="Title"
            required
            value={formState.inputValues.title}
            onChangeText={textChangeInput.bind(this, "title")}
          />
          <Input
            title="Phone"
            placeholder="123456789"
            keyboardType="phone-pad"
            value={formState.inputValues.phone}
            onChangeText={textChangeInput.bind(this, "phone")}
          />
          <Input
            title="Email"
            placeholder="example@email.com"
            keyboardType="email-address"
            value={formState.inputValues.email}
            onChangeText={textChangeInput.bind(this, "email")}
            autoCapitalize="none"
          />
          <Input
            title="Address"
            multiline
            value={formState.inputValues.address}
            onChangeText={textChangeInput.bind(this, "address")}
          />
          <Input
            title="Description"
            multiline
            value={formState.inputValues.desc}
            onChangeText={textChangeInput.bind(this, "desc")}
            style={{ height: 100 }}
          />
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
