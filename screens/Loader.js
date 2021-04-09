import spinner from "./spinner.gif";

import React from "react";
import { View, Text } from "react-native";

const Loader = () => {
  return (
    <View>
      <Image source={spinner} />
      <Text>Fetching Data</Text>
    </View>
  );
};

export default Loader;
