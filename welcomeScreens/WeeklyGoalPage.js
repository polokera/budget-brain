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
import { removeCommas } from "../CustomModules/generalModules";
import { initial } from "lodash";

export default function MoneyWallet({navigation,route,setIsUserSignedUp}) {
  const {walletsArray} = route.params
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [nextPressed, setNextPressed] = useState(false);
  const showNext = ()=>{
    setNextPressed(true)
  }
  const addWalletsToDb = async(weeklyTarget)=>{
    const dbx = await openDatabase();
    const formattedWallets = walletsArray.map((wallet)=>{
      const formattedAmount = removeCommas(wallet.initialAmount)
      return(
        {...wallet,initialAmount:formattedAmount}
      )
    })
    try{
        for(const wlt of formattedWallets){
        //inserts wallets from the previous page into the database.
        await dbx.runAsync(`INSERT INTO wallets(walletId,wName,balance,themeColor)values(?,?,?,?)`,[wlt.id,wlt.wName,wlt.initialAmount,wlt.themeColor])
        }
        console.log("wallets Inserted");
        await dbx.runAsync(`INSERT into target(targetId,target)values(?,?)`,[1,weeklyTarget])
<<<<<<< HEAD
=======
        await AsyncStorage.setItem("isSignedUp","true");
>>>>>>> d4953a5 (trying to merge and stuff so yeah)
        setIsUserSignedUp(true)
        console.log("target inserted");
    }
    catch(e){
      console.log(e);
    }
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
        <Text style={styles.title}>Welcome, <Text style={{color:"#ee9e8e"}}>{userName}</Text></Text>
       <View style={{height:600,width:"90%"}}>
         {nextPressed? <SetTargetPage
          addWalletsToDb={addWalletsToDb}
          walletsArray={walletsArray}
          setIsUserSignedUp={setIsUserSignedUp}
          /> : <OpeningScreen goNext={showNext}/>}
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
    backgroundColor:"#e0fbfb"
  },
  container1:{
    flex:1,
    height:100,
  }
});
