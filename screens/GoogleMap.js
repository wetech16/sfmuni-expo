import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import pic8 from "./8.png";
import pic8AX from "./8AX.png";
import pic9 from "./9.png";
import pic9R from "./9R.png";

const picNum = (name) => {
  switch (name.toString()) {
    case "8":
      return pic8;
    case "8AX":
      return pic8AX;
    case "9":
      return pic9;
    case "9R":
      return pic9R;
  }
};

export default function App({ eventData, selfLocation }) {
  const markers = eventData.map((data, index) => {
    return data.vehicle?.map((i, ind) => {
      return (
        <Marker
          key={i.$.id}
          coordinate={{
            latitude: parseFloat(i.$.lat),
            longitude: parseFloat(i.$.lon),
          }}
          title={i.$.routeTag}
          description={i.$.speedKmHr}
          image={picNum(data.route)}
        />
      );
    });
  });
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={selfLocation}>
        {markers}
        <Marker
          coordinate={{
            latitude: parseFloat(selfLocation.latitude),
            longitude: parseFloat(selfLocation.longitude),
          }}
          title={"Me"}
          description={"MyLocation"}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
