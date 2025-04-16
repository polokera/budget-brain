import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { useState, useEffect } from "react";
import OpeningScreen from "./secondWelcomeScreens/OpeningScreen";
import SetTargetPage from "./secondWelcomeScreens/SetTargetpage";

export default function MoneyWallet() {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [nextPressed, setNextPressed] = useState(true);
  const showNext = ()=>{
    setNextPressed(true)
  }
  const getUserName = async () => {
    try {
      const UserName = await AsyncStorage.getItem("userName");
      setUserName(UserName);
      setIsLoading(false);
    } catch (e) {}
  };
  useEffect(() => {
    getUserName();
  }, []);
  if (isLoading) {
    return (
      <View
        style={[
          styles.main,
          { flex: 1, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Loading By Central Cee...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {userName}</Text>
       <View style={{height:600,width:"90%"}}>
         {nextPressed? <SetTargetPage/> : <OpeningScreen/>}
       </View>
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  main: {
    backgroundColor: "#fff5e0",
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    marginTop: 80,
    alignItems: "center",
  },
  welcomeText: {
    width: "80%",
    fontSize: 24,
    fontWeight: "ultralight",
  },
  nextButton: {
    alignSelf: "flex-end",
    borderWidth: 1,
  },
  container1:{
    flex:1,
    height:100,
  }
});
