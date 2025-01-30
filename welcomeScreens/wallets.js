import {
  View,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import NewBank from "./NewBank";

export default function WelcomeScreen({ navigation }) {
  const [selectedWallets, setSelectedWallets] = useState([]);
  const [ModalVisible, setModalVisible] = useState(false);
  const [wallets, setWallets] = useState([
    { id: 1, wName: "Mpamba", themeColor: "#2fdb45", selected: false },
    { id: 2, wName: "Airtel Money", themeColor: "#f61f1f", selected: false },
    { id: 3, wName: "Standard Bank", themeColor: "#1437a0", selected: false },
    { id: 4, wName: "National Bank", themeColor: "#6985db", selected: false },
    { id: 5, wName: "FDH Bank", themeColor: "#4e5a80", selected: false },
    {
      id: 6,
      wName: "Cash in hand",
      themeColor: "#hsl(60, 96%, 52%)",
      selected: false,
    },
    { id: 7, wName: "others", themeColor: "grey", selected: false },
  ]);
  const addWallet = (wallet) => {
    const targetId = wallet.id - 1;
    if (wallet.wName === "others") {
      //if the others button is selected the modal popup for adding a new 
      //wallet is now shown
      setModalVisible(true);
    } else {
      // this changes the value of the "selected" property of each array item
      //if selected was true it turns false and if selected was false it turns true.
      setWallets((w) =>
        w.map((wlt, index) =>
          index === targetId ? { ...wlt, selected: !wallet.selected } : wlt
        )
      );
    }
  };
  useEffect(() => {
    //this takes the wallets array and filters it
    //it takes all the objects where the selected property is true.
    setSelectedWallets(wallets.filter((wlt) => wlt.selected === true));
  }, [wallets]);

  const goToDetails = () => {
    if (selectedWallets) {
      navigation.navigate("Details", {
        wallets: selectedWallets,
      });
      console.log(selectedWallets);
    } else {
      Alert.alert("Invalid Input", "Please select some wallets first");
    }
  };

  const addCustomWallet = (newWalletName) => {
    /*
    first the "others" object is stored in a variable
    second that object is removed from the array using pop
    third the newWallet is created
    then the new array is created 
    order 
    array without "others" object
    new wallet
    others object
    this ensures "others" is always at the end of the array
    */
    const others = wallets[wallets.length - 1];
    const newId = wallets.length + 1;
    wallets.pop();
    const newWallet = {
      id: newId,
      wName: newWalletName,
      themeColor: "green",
      selected: false,
    };
    setWallets((w) => [...w, newWallet, others]);
  };
  const hideFunction = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.insturctionText}>
          Tap on the money wallets you wish to keep track of....
        </Text>
        <NewBank
          add={addCustomWallet}
          hide={hideFunction}
          visible={ModalVisible}
        />
        <View style={styles.list}>
          <FlatList
            data={wallets}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() => {
                    addWallet(item);
                  }}
                >
                  <View
                    style={[
                      styles.walletContainer,
                      {
                        backgroundColor: item.themeColor,
                        borderWidth: item.selected ? 3 : 0,
                      },
                    ]}
                    key={item.id}
                  >
                    <Text style={styles.walletText}>{item.wName}</Text>
                  </View>
                </Pressable>
              );
            }}
            ItemSeparatorComponent={<View style={{ height: 20 }} />}
          />
        </View>
        <Button title="Next" onPress={() => goToDetails()} />
        <Pressable>
          <Text>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff5e0",
    flex: 1,
  },
  container: {
    // ,
    alignItems: "center",
    flex: 1,
  },
  walletContainer: {
    width: 200,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    paddingHorizontal: 15,
    borderColor: "blue",
    // borderWidth:3,
  },
  walletText: {
    textAlign: "left",
    color: "#190933",
  },
  insturctionText: {
    fontSize: 25,
    fontWeight: "light",
    marginVertical: 10,
  },
  list: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 29,
    elevation: 3,
    borderRadius: 12,
    height: 450,
  },
});
