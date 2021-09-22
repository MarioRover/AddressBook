import React, {
  useState,
  useLayoutEffect,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Vibration,
  SafeAreaView,
  Text,
} from "react-native";
import { useAppContext } from "~/contexts/AppContext";
import { isEmpty, isEmail, isMobilePhone } from "~/helpers/validator";
import { useNavigation } from "@react-navigation/core";
import { Colors } from "~/constant/Colors";
import { useDispatch, useSelector } from "react-redux";
import { addPlaceAction } from "~/store/place/placeAction";
import { updatePlace, deletePlace } from "~/store/place/placeReducer";

// Component
import HeaderButton from "~/components/UI/HeaderButton";
import Input from "~/components/UI/Input";
import ImagePicker from "~/components/UI/ImagePicker";
import ScreenNames from "~/constant/ScreenNames";
import CustomButton from "~/components/UI/CustomButton";

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

export default function NewAddressScreen({ route }) {
  const { appColors, position } = useAppContext();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedPlace = useSelector((state) => {
    if (route.params && route.params.id) {
      return state.places.places[route.params.id];
    } else {
      return null;
    }
  });
  const [selectedImage, setSelectedImage] = useState(
    selectedPlace && selectedPlace.imageUri
  );
  const [selectedPosition, setSelectedPosition] = useState(
    selectedPlace ? selectedPlace.location : null
  );
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: selectedPlace ? selectedPlace.title : "",
      phone: selectedPlace ? selectedPlace.phone : "",
      email: selectedPlace ? selectedPlace.email : "",
      address: selectedPlace ? selectedPlace.address : "",
      desc: selectedPlace ? selectedPlace.desc : "",
    },
    inputvalidaties: {
      title: Boolean(selectedPlace),
      phone: true,
      email: true,
      address: true,
      desc: true,
    },
    formIsValid: Boolean(selectedPlace),
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
    if (!formState.formIsValid) {
      Vibration.vibrate();
      Alert.alert("Form Validation!", "Please fill field with currect value.", [
        {
          style: "default",
          text: "Okey",
        },
      ]);
    } else {
      if (!selectedPlace) {
        // Create New Place
        dispatch(
          addPlaceAction({
            ...formState.inputValues,
            selectedImage,
            selectedPosition,
          })
        );
      } else {
        // Update Place
        dispatch(
          updatePlace({
            ...formState.inputValues,
            selectedImage,
            selectedPosition,
            id: selectedPlace.id,
          })
        );
      }

      navigation.navigate(ScreenNames.addressListName);
    }
  };

  const deletePlaceHandler = async () => {
    await dispatch(
      deletePlace({
        id: selectedPlace.id,
      })
    );
    navigation.navigate(ScreenNames.addressListName);
  };

  const checkParams = useCallback(() => {
    if (route.params && route.params.markerPos) {
      setSelectedPosition(route.params.markerPos);
    }
  }, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          title="Save"
          color={Colors.lightBlue}
          onPress={handleSubmitForm}
        />
      ),
    });
  }, [navigation, formState, selectedImage, selectedPosition]);

  useEffect(() => {
    checkParams();
  }, [route]);

  return (
    <SafeAreaView
      style={{ ...styles.screen, backgroundColor: appColors.background }}
    >
      <FormContent
        style={{ ...styles.screen, backgroundColor: appColors.background }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 15 }}>
            <ImagePicker
              onTakeImage={setSelectedImage}
              selectedImage={selectedImage}
            />

            <View style={styles.btnContainer}>
              <CustomButton
                buttonStyle={{
                  width: 200,
                  height: 50,
                  backgroundColor: Colors.lightBlue,
                  marginVertical: 20,
                }}
                onPress={() =>
                  navigation.navigate(ScreenNames.map, {
                    markerPosition: selectedPosition,
                  })
                }
              >
                <Text style={styles.btnTitle}>
                  {`${selectedPosition ? "Change" : "Set"} Map Position`}
                </Text>
              </CustomButton>
            </View>

            <View style={styles.form}>
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
            {selectedPlace && (
              <View style={styles.btnContainer}>
                <CustomButton
                  buttonStyle={{
                    width: 200,
                    height: 50,
                    backgroundColor: Colors.red,
                    marginVertical: 20,
                  }}
                  onPress={deletePlaceHandler}
                >
                  <Text style={styles.btnTitle}>Delete</Text>
                </CustomButton>
              </View>
            )}
          </View>
        </ScrollView>
      </FormContent>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  form: {
    flexDirection: "column",
  },
  btnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
});
