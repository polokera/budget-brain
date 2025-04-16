import { Text, View, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function OpeningScreen() {
  return (
    <View style={styles.main}>
      <Text style={styles.welcomeText}>
        Budget brain is going to help you save money by helping you set weekly
        targets, keep your transactions to see trends in spending etc....
      </Text>
      <View style={{ borderWidth: 1, width: "90%" }}>
        <Pressable style={styles.nextButton}>
          <MaterialIcons name="navigate-next" size={44} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
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
  container1: {
    flex: 1,
    height: 100,
  },
});
