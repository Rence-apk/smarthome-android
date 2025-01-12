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
import { signup } from "../api";
import axios from "axios";
const { width, height } = Dimensions.get("window");

import { myLogo } from "../assets/logo.png";

const Register = () => {
  const navigation = useNavigation();
  const [uname, setUname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const containsWhitespace = (str) => {
    return /\s/.test(str); // Returns true if the string contains any whitespace
  };

  const clearFields = () => {
    setUname("");
    setEmail("");
    setPassword("");
  }

  const handleSubmit = async () => {
    const popularEmailDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "icloud.com",
      "aol.com",
      "protonmail.com",
    ];
    // Validate whitespace in username
    if (containsWhitespace(uname)) {
      Alert.alert("Invalid Username", "Username cannot contain whitespace.");
      return;
    }

    // Validate whitespace in email
    if (containsWhitespace(email)) {
      Alert.alert("Invalid Email", "Email cannot contain whitespace.");
      return;
    }

    // Validate whitespace in password
    if (containsWhitespace(password)) {
      Alert.alert("Invalid Password", "Password cannot contain whitespace.");
      return;
    }
    const isValidEmailDomain = (email) => {
      const domain = email.split("@")[1]; // Extract the domain part of the email
      return popularEmailDomains.includes(domain); // Check if the domain is in the list
    };
    if (uname === "" || email === "" || password === "") {
      Alert.alert("Error!", "Please fill all the fields");
      return;
    }
    if (!isValidEmailDomain(email)) {
      Alert.alert(
        "Invalid Email",
        "Please use a valid email from a popular provider (e.g., Gmail, Yahoo, Outlook)."
      );
      return;
    }
    if (password.length < 8) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 8 characters long."
      );
      return;
    }
    try {
      const data = { name: uname, email: email, password: password };
      const response = await axios.post(signup, data);

      Alert.alert("Success!", response.data.message, [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
            clearFields();
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error!", error.response.data.message);
      clearFields();
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
            placeholder="Username"
            value={uname}
            onChangeText={setUname}
            style={styles.inputContainer}
          />
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
            keyboardType="default"
            style={styles.inputContainer}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.inputButton}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.forgotPassword}>Already have an account.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

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
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
