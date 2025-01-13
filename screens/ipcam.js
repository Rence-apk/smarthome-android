import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';

const Ipcam = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { ip } = route.params;
    console.log(ip);
  return (
    <View style={{ flex: 1 }}>       
      <WebView
        source={{ uri: `http://${ip}`}}
        style={{ marginTop: 20,}}
      />
      <TouchableOpacity onPress={() => navigation.goBack()} style={{backgroundColor: "#3e6a89", justifyContent: "center", alignItems: "center"}}>
        <Text style={styles.backbtn}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Ipcam;

const styles = StyleSheet.create({
    backbtn: {
        color: "#fff",
        margin: 10,
        width: 100,
        textAlign: "center",
        backgroundColor: "#3e6a89",
        padding: 10,
        fontSize: 20,
    },
});
