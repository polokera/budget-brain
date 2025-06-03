import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  Pressable,
  Alert,
  Keyboard,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import externalStyles from '../CustomModules/generalStyles'

export default function WelcomeScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const validation = () => {
    const uName = userName.trim();
    if (uName) {
      storeUserName(uName)
      navigation.navigate("Wallets", {
        name: userName,
      });
    } else {
      Alert.alert("Invalid Input", "Please enter a name first.");
    }
  };
  const storeUserName = async (value)=>{
    try{
      await AsyncStorage.setItem('userName',value)
    }
    catch(e){
      Alert.alert('Error',"there was an error saving your username")
    }
  }
  return (
    <View style={styles.main}>
        <View style={styles.container}>
          <View>
            <Text style={{fontSize:24,}}>Name</Text>
            <TextInput
              value={userName}
              onChangeText={setUserName}
              style={[styles.input,externalStyles.input]}
            />
          </View>
          <Pressable onPress={validation} style={[externalStyles.button,styles.button]}>
            <Text style={externalStyles.buttonText}>Next</Text>
          </Pressable>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff5e0",
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    marginTop: 100,
    alignItems: "center",
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    width: 200,
    height:40,
  },
  form: {
    gap: 10,
  },
  button:{
    width: 150,
    height: 60,
    marginTop:220,
  }
});
