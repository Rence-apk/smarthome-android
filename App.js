import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

//Screens
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import ipcam from "./screens/ipcam";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#31283f"/>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
          <Stack.Screen name="ipcam" component={ipcam} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}
