import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";

const CustomView = ({ coordinate }) => {
  return (
    <View>
      <Avatar
        size="small"
        rounded
        title="MT"
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />
    </View>
  );
};

export default CustomView;
