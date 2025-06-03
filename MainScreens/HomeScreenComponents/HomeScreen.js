import { View, Text, StyleSheet, FlatList, Button,ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import openDatabase from "../../CustomModules/DbModule";
import AsyncStorage from "@react-native-async-storage/async-storage";
import generalStyles from "../../CustomModules/generalStyles";
import HomeScreenStyles from "./HomeScreenStyles";
import ProgressBox from "./ProgressBox";
import CashTotalBox from "./CashTotalBox";
import TransactionBox from "./TransactionsBox";
import Fab from "./FAB";
import { getCashTotal, getHomeScreenDetails, getSpentinWeek, getWeeklyTarget,Test } from "../../CustomModules/HomeScreenDbModules";

export default function HomeScreen({navigation}) {
  //this is where all the main tabs will be
  const [transes,setTranses] = useState(null);
  const [userName, setUserName] = useState(null);
  const [cashTotal,setCashTotal] = useState(null)
  const [weeklyGoal,setWeeklyGoal] = useState(null)
  const [spentThisWeek,setSpentThisWeek] = useState(null);
  const [isLoading,setIsLoading] = useState(true)
  const getUserName = async () => {
    try {
      const UserName = await AsyncStorage.getItem("userName");
      setUserName(UserName);
      //setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteDb=async()=>{
    const dbx=await openDatabase();
    const result = await dbx.runAsync(`DELETE from wallets`)
    const result2 = await dbx.runAsync(`DELETE from target`)
    //const result3 = await dbx.runAsync(`DELETE from transactions`)
    if(result.changes > 0 && result2.changes >0){
      console.log("all 3 tables deleted")
    }
    else{
      console.log("gaza");
    }
  }
  const getHomeScreenDeets=async()=>{
    await getUserName()
    const total = await getCashTotal();
    console.log("total is ",total)
    setCashTotal(total)
    const maTrans = await getHomeScreenDetails();
    setTranses(maTrans)
    const trgt = await getWeeklyTarget();
    setWeeklyGoal(trgt)
    const spent = await getSpentinWeek()
    setSpentThisWeek(spent)
  }
  useEffect(()=>{
    getHomeScreenDeets();

    return()=>{
      deleteDb()
    }
  },[])
  useEffect(()=>{
    if(userName && cashTotal && transes && weeklyGoal && spentThisWeek && transes){
      setIsLoading(false)
    }
  },[userName,cashTotal,weeklyGoal,spentThisWeek,weeklyGoal,transes])
  if(isLoading){
    return(
        <View style={generalStyles.main}>
            <Text>Loading loading</Text>
        </View>
    )
  }
  const goToTransactionPage=()=>{
    navigation.navigate("Transaction")
    console.log("lmao")
  }
  return(
    
    <View style={[generalStyles.main,{marginTop:-8,alignItems:"center",}]}>
        <Fab goToNext={goToTransactionPage}/>
        <View style={styles.container}>
          <View style={styles.welcomeMsg}>
            <Text style={styles.welcomeMsgText}>Hello, {userName}</Text>
          </View>
            <FlatList
            //data={}
            // renderItem={({item})=>{
            //   return(
            //       <TransactionBox item={item}/>
            //   )
            // }}
             ListFooterComponent={()=>{
              return(
                <View style={[styles.transactionBox,HomeScreenStyles.boxes]}>
                  <Text style={HomeScreenStyles.boxTitle}>Recent Transactionss</Text>
                  {transes == null || transes.length == 0?<Text>No transactions to show!</Text>:transes.map((item)=>{
                    return <TransactionBox key={item.transId} item={item}/>
                  })}
                <Pressable style={styles.viewHistoryButton} onPress={()=>console.log("yafwifwa")}>
                  <Text style={styles.viewHistoryButton}>...View full History</Text>
                </Pressable>
                  
                </View>
              )
            }}
            //contentContainerStyle={[HomeScreenStyles.boxes,styles.transactionBox]}
            ListHeaderComponent={()=>{
              return(
                <View>
                  <CashTotalBox cashTtl={cashTotal}/>
                  <ProgressBox goal={weeklyGoal} spent={spentThisWeek}/>
                </View>
              )
            }}
            />
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    width:"90%",
    paddingBottom:20,
  },
  welcomeMsg:{
    minWidth:100,
    height:60,
    marginTop:-13,
    justifyContent:"center",
    alignItems:"flex-start",
    //borderWidth:1,
  },
  welcomeMsgText:{
    fontSize:24,
  },
  progressBox:{
    backgroundColor:"#bdffff",
    height:170,
    width:320,
  },
  transactionBox:{
    backgroundColor:"#fEEEEE",
    minHeight:250,
    alignItems:"center",
    width:320,
    paddingBottom:20,
  },
  viewHistoryButton:{
     width:"91%",
     textAlign:"right", 
     marginVertical:6,
  },
  viewHistoryText:{
    color:"#034949",
    textAlign:"right",
  },
});
