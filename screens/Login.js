import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { login } from "../api";
import axios from "axios";
const { width, height } = Dimensions.get("window");
import { storage } from "../checkLogin";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Please fill all fields");
      return;
    }
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(login, data);
      console.log(response.data);
      Alert.alert("Success!", "You have logged in successfully", [
        {
          text: "OK",
          onPress: () => {
            storage.set("isLoggedIn", true);
            navigation.navigate("Home");
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error!", "Please check your credentials");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../assets/logo.png")} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.inputContainer}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            keyboardType="phone-pad                                  "
            style={styles.inputContainer}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.inputButton}
            onPress={() => {
              handleLogin();
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.inputButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    backgroundColor: "#31283f",
    height: height,
    width: width,
  },
  logo: {
    marginTop: 75,
  },
  inputContainer: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    width: width - 75,
    borderRadius: 15,
  },
  inputButton: {
    backgroundColor: "#428ea5",
    margin: 10,
    padding: 10,
    width: width - 150,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPassword: {
    color: "#7dd7c4",
    margin: 10,
  },
  btnContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
