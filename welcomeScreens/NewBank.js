import { View, StyleSheet, Modal, Text, TextInput,Pressable } from "react-native";
import { useState } from "react";

export default function NewBank({add,hide,visible}) {
    const [newWalletName,setnewWalletname] = useState("")
    const addNewWallet = () =>{
        add(newWalletName)
        hide()
        setnewWalletname("")
    }
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text>Add a new money wallet</Text>
          <TextInput style={styles.input} value={newWalletName} onChangeText={setnewWalletname} />
          <View style={{ flexDirection: "row" }}>
            <Pressable 
            onPress={()=>addNewWallet()}
            style={[styles.button, { backgroundColor: "lightgreen" }]}
            >
              <Text>Add</Text>
            </Pressable>
            <Pressable
              onPress={hide}
              style={[styles.button, { backgroundColor: "#f50000" }]}
            >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0000001a",
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      width: 220,
      height: 230,
      backgroundColor: "#fff5e0",
      elevation: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      backgroundColor: "#fff",
      width: 160,
      height: 40,
      borderRadius: 20,
      borderWidth: 0.4,
      paddingHorizontal: 10,
      marginVertical: 20,
    },
    button: {
      width: 90,
      height: 35,
      // backgroundColor: "#ee9e8e",
      borderRadius: 15,
      marginRight:4 ,
      // marginTop: 220,
      justifyContent:"center",
      alignItems: "center",
      elevation: 4,
    },
  });