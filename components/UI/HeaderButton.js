import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HeaderButton = ({
  name,
  size = 24,
  color = "#000",
  onPress,
  title = null,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      {title ? (
        <Text style={{ color: color, fontSize: 16, fontWeight: "600" }}>
          {title}
        </Text>
      ) : (
        <Ionicons name={name} size={size} color={color} />
      )}
    </TouchableOpacity>
  );
};

export default HeaderButton;
