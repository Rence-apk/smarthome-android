import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ledStatus, setLedStatus] = useState(null); // Track LED status
  const navigation = useNavigation();
  useEffect(() => {
    // Fetch temperature
    const fetchTemperature = async () => {
      try {
        const response = await fetch(
          "https://homesmart-xfs0.onrender.com/api/sensor/latest"
        );
        const result = await response.json();
        setTemperature(result.data.temperature); // Access the temperature from the data object
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    // Fetch LED status
    const fetchLedStatus = async () => {
      try {
        const response = await fetch(
          "https://homesmart-xfs0.onrender.com/api/light"
        );
        const result = await response.json();
        setLedStatus(result.data.status === "on"); // Map status string to boolean
      } catch (error) {
        // Handle error silently
      }
    };

    // Fetch temperature and LED status initially
    fetchTemperature();
    fetchLedStatus();

    // Fetch LED status every 1 second
    const ledIntervalId = setInterval(fetchLedStatus, 1000);

    // Fetch temperature every 1 second
    const tempIntervalId = setInterval(fetchTemperature, 1000);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(ledIntervalId);
      clearInterval(tempIntervalId);
    };
  }, []);

  const toggleLed = async () => {
    try {
      const response = await fetch(
        "https://homesmart-xfs0.onrender.com/api/uplight",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: !ledStatus }), // Toggle LED status
        }
      );

      //   console.log(response.ok);

      if (response.ok) {
        setLedStatus((prevStatus) => !prevStatus);
        Alert.alert("Success", `LED is now ${!ledStatus ? "on" : "off"}`);
      }

      //   const result = await response.json();
      //   console.log(result);

      //   // Check if the response contains the expected success field or status
      //   if (result.success !== undefined) {
      //     setLedStatus((prevStatus) => !prevStatus); // Toggle LED status locally after success
      //     Alert.alert('Success', `LED is now ${!ledStatus ? 'on' : 'off'}`);
      //   } else {
      //     Alert.alert('Error', 'Failed to update LED status');
      //   }
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "An error occurred while toggling the LED"
      );
    }
  };
  const [ip, setIp] = useState([]);

  const getCamIp = async () => {
    try {
      const response = await axios.get(
        "https://homesmart-xfs0.onrender.com/fetch"
      );
      //   console.log(response.data.ips.map((ips) => ips.ip).toString());
      setIp(response.data.ips.map((ips) => ips.ip).toString());
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(ip)
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.Cardcontainer}>
              <Text style={{ fontSize: 45, color: "white" }}>
                {temperature}°C
              </Text>
            </View>
            <View style={styles.Cardcontainer}>
              <Button
                title={ledStatus ? "Light's off" : "Light's on"}
                onPress={toggleLed}
                color="#007BFF"
              />
            </View>
          </View>
          <TouchableOpacity onPress={getCamIp} style={styles.showCam}>
            <Text
              style={{ color: "#fff", textAlign: "center", borderRadius: 20 }}
            >
              Show Cameras
            </Text>
          </TouchableOpacity>
          <View style={styles.IPcon}>
            {ip && (
              <TouchableOpacity
                onPress={() => navigation.navigate("ipcam", { ip: ip })}
              >
                <Text style={styles.text}>{ip}</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
              <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#31283f",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  showCam: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    backgroundColor: "#428ea5",
    padding: 10,
  },
  Cardcontainer: {
    backgroundColor: "#428ea5",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: 175,
    height: 175,
    justifyContent: "center",
    alignItems: "center",
  },
  IPcon: {
    backgroundColor: "#428ea5",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: "100%",
    height: 450,
  },
  logout: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#ae5b6b",
  },
});
