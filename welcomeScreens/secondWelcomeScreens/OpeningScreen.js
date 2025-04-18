import { Text, View, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function OpeningScreen({goNext}) {
  return (
    <View style={styles.main}>
      <Text style={styles.welcomeText}>
        Budget brain is going to help you save money by helping you set weekly
        targets, keep your transactions to see trends in spending etc....
      </Text>
      <View style={{ width: "90%",marginTop:100, }}>
        <Pressable style={styles.nextButton} onPress={goNext}>
          <MaterialIcons name="navigate-next" size={65} color="black" />
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
    borderBottomWidth:4.1,
    borderRightWidth:2.05,
  },
  container1: {
    flex: 1,
    height: 100,
  },
});
