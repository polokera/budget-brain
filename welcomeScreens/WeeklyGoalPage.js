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
import openDatabase from "../CustomModules/DbModule";

export default function MoneyWallet({navigation,route}) {
  const {walletsArray} = route.params
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [nextPressed, setNextPressed] = useState(false);
  const showNext = ()=>{
    setNextPressed(true)
  }
  const addWalletsToDb = async(weeklyTarget)=>{
    const dbx = await openDatabase();
    try{
        for(const wlt of walletsArray){
        //inserts wallets from the previous page into the database.
        await dbx.runAsync(`INSERT INTO wallets(walletId,wName,balance,themeColor)values(?,?,?,?)`,[wlt.id,wlt.wName,wlt.initialAmount,wlt.themeColor])
        }
        console.log("wallets Inserted");
        await dbx.runAsync(`INSERT into target(targetId,target)values(?,?)`,[1,weeklyTarget])
//         await dbx.runAsync(`
// INSERT INTO transactions ("transId", "walletId", "transTitle", "transDescription", "amount", "transDate", "transTime") VALUES ('101', '1', 'lunch-cloud 9', 'went to buy phwanya there myself', '2500', '2025-05-18
// ', '2330');

//           `)
        console.log("target inserted");
    }
    catch(e){
      console.log(e);
    }
  }
  const goToHome=()=>{
    //go to the home page
    navigation.navigate('Main Tabs')
  }
  const getUserName = async () => {
    try {
      const UserName = await AsyncStorage.getItem("userName");
      setUserName(UserName);
      setIsLoading(false);
    } catch (e) {
      console.log(e)
    }
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
         {nextPressed? <SetTargetPage
          showHome={goToHome} 
          addWalletsToDb={addWalletsToDb}
          walletsArray={walletsArray}/> : <OpeningScreen goNext={showNext}/>}
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
