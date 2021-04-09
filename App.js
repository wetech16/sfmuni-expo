import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Map from "./screens/GoogleMap";
import xml2js from "react-native-xml2js";

const allRoutes = ["8", "8AX", "9"];

export default function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selfLocation, setSelfLocation] = useState({
    latitude: 37.718134,
    longitude: -122.39425,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.01221,
  });

  useEffect(() => {
    const getGeolocaiton = () => {
      navigator.geolocation
        ? navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords);
            setSelfLocation(position.coords);
          })
        : console.log("Geolocation is not supported by this browser");
    };

    const fetchEvents = async () => {
      let newEventData = [];
      await Promise.all(
        allRoutes.map(async (route) => {
          console.log("2");
          const parser = new xml2js.Parser();
          const res = await fetch(
            `http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=sf-muni&r=${route}&t=0`,
            {
              "Content-Type": "application/xml; charset=utf-8",
            }
          );
          const data = await res.text();
          console.log("3");
          parser.parseString(data, (err, res) => {
            let temp = { route, vehicle: res.body.vehicle };
            newEventData.push(temp);
            console.log("4");
          });
        })
      );
      console.log("5");
      setEventData(newEventData);
    };
    setLoading(true);
    getGeolocaiton();
    fetchEvents();
    const timer = setInterval(() => fetchEvents(), 8000);
    setLoading(false);

    return () => {
      setLoading(true);
      getGeolocaiton();
      clearInterval(timer);
      setLoading(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {!loading ? (
        <Map eventData={eventData} selfLocation={selfLocation} />
      ) : (
        <Loader />
      )}
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
});
