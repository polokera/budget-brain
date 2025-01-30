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

export default function WelcomeScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const validation = () => {
    const uName = userName.trim();
    if (uName) {
      navigation.navigate("Wallets", {
        name: userName,
      });
    } else {
      Alert.alert("Invalid Input", "Please enter a name first.");
    }
  };
  return (
    <View style={styles.main}>
        <View style={styles.container}>
          <View>
            <Text>Name</Text>
            <TextInput
              value={userName}
              onChangeText={setUserName}
              style={styles.input}
            />
          </View>
          <Pressable onPress={validation} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
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
  button: {
    backgroundColor: "#ee9e8e",
    borderRadius: 15,
    marginTop: 220,
    width: 150,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  buttonText: {
    fontSize: 20,
    verticalAlign: "middle",
  },
  input: {
    backgroundColor: "#fff",
    width: 200,
    borderRadius: 20,
    borderWidth: 0.4,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  form: {
    gap: 10,
  },
});
