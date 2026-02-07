import { View, Text, StyleSheet, Pressable } from "react-native";
import NewUsernameModal from "./NewUsername";
import { useState } from "react";

export default function TopSection({goToNextPage,showDeletePopUp,showToast}) {
  const [mdlUsernameVisible, setMdlUsernameVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <NewUsernameModal
          visible={mdlUsernameVisible}
          showToast={showToast}
          hide={() => setMdlUsernameVisible(false)}
        />
        <Pressable //username 
          onPress={() => setMdlUsernameVisible(true)}
          style={styles.item}
        >
          <Text style={styles.itemText}>Username</Text>
        </Pressable>
        <Pressable //theme 
        
        style={styles.item}> 
          <Text style={styles.itemText}>Theme</Text>
        </Pressable>
        <Pressable //send feedback
        onPress={()=>goToNextPage('Feedback')}
        style={[styles.item, { borderBottomWidth: 0 }]}>
          <Text style={styles.itemText}>Send feedback</Text>
        </Pressable>
      </View>
      <View style={styles.box}>
        <Pressable 
        onPress={()=>goToNextPage('About')}
        style={styles.item}>
          <Text style={[styles.itemText, { fontSize: 14 }]}>
            About budget brain (A yap session)
          </Text>
        </Pressable>
        <Pressable 
        onPress={showDeletePopUp}
        style={[styles.item, { borderBottomWidth: 0 }]}>
          <Text style={[styles.itemText,{color:"red"}]}>Delete all app data</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 2,
    borderColor: "grey",
    height: 50,
    justifyContent: "center",
    padding: 10,
  },
  itemText: {
    fontSize: 18,
    verticalAlign: "bottom",
    // borderWidth:1,
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#ffe5ae",
    padding: 20,
    width: "80%",
    elevation: 2,
    borderRadius: 9,
    borderWidth: 0.8,
    marginVertical:15,
  },
});
