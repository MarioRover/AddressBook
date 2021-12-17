import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Colors } from "~/constant/Colors";
import { useAppContext } from "~/contexts/AppContext";

export default function Input({
  title,
  placeholder,
  required,
  style,
  validation = true,
  ...props
}) {
  const [isFocus, setIsFocus] = useState(false);
  const { appColors } = useAppContext();

  return (
    <View style={styels.container}>
      <Text style={{ ...styels.label, color: appColors.input.label }}>
        {title} {required && <Text style={styels.required}>*</Text>}
      </Text>
      <TextInput
        style={{
          ...styels.input,
          ...style,
          borderColor: validation
            ? isFocus
              ? Colors.lightBlue
              : appColors.input.border
            : Colors.red,
          color: appColors.input.text,
          backgroundColor: appColors.input.background,
        }}
        autoCorrect={false}
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        placeholderTextColor={appColors.input.palceholder}
        {...props}
      />
      {/* <Text style={styels.error}>There is Error</Text> */}
    </View>
  );
}

const styels = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    marginBottom: 15,
  },
  label: {
    color: Colors.midGray,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  error: {
    fontSize: 12,
    color: Colors.red,
    marginTop: 5,
  },
  required: {
    color: Colors.red,
    fontSize: 14,
  },
});
