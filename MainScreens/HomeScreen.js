import { View, Text, StyleSheet, FlatList, Button,ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import openDatabase from "../CustomModules/DbModule";
import AsyncStorage from "@react-native-async-storage/async-storage";
import generalStyles from "../CustomModules/generalStyles";
import HomeScreenStyles from "./HomeScreenComponents/HomeScreenStyles";
import ProgressBox from "./HomeScreenComponents/ProgressBox";
import CashTotalBox from "./HomeScreenComponents/CashTotalBox";
import TransactionBox from "./HomeScreenComponents/TransactionsBox";
import Fab from "./HomeScreenComponents/FAB";

export default function HomeScreen() {
  //this is where all the main tabs will be
  const [transes,setTranses] = useState([
        {transId:1,themeColor:"#2fdb45",transTitle:"lunch pa so real",transDescription:"ate pa so real maufa pro max or something",amount:3000,transDate:"2025-05-19",transTime:"11:59",walletId:1},
        {transId:2,themeColor:"#2fdb45",transTitle:"supper pa cloud",transDescription:"ate pa cloud 9 maufa pro max or something",amount:3000,transDate:"2025-05-18",transTime:"18:43",walletId:1},
        {transId:3,themeColor:"#2fdb45",transTitle:"breakfast-gaba",transDesc:null,amount:800,transDate:"2025-05-17",transTime:"11:59",walletId:3},
        //{transId:4,themeColor:"#2fdb45",transTitle:"breakfast-gaba",transDesc:null,amount:800,transDate:"18/05/2025",transTime:"11:59"},
        //{transId:5,themeColor:"#2fdb45",transTitle:"breakfast-gaba",transDesc:null,amount:800,transDate:"18/05/2025",transTime:"11:59"},

    ]);
  const [userName, setUserName] = useState("");
  const [isLoading,setIsLoading] = useState(true)
  const getUserName = async () => {
    try {
      const UserName = await AsyncStorage.getItem("userName");
      setUserName(UserName);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteDb=async()=>{
    const dbx=await openDatabase();
    const result = await dbx.runAsync(`DELETE from wallets`)
    const result2 = await dbx.runAsync(`DELETE from target`)
    if(result.changes > 0 && result2.changes >0){
      console.log("both tables deleted")
    }
    else{
      console.log("gaza");
    }
  }
  useEffect(()=>{
    getUserName()

    return()=>{
      deleteDb()
    }
  },[])
  if(isLoading){
    return(
        <View style={generalStyles.main}>
            <Text>Loading loading</Text>
        </View>
    )
  }
  return(
    
    <View style={[generalStyles.main,{marginTop:-8,alignItems:"center",}]}>
        <Fab/>
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
                  <Text style={HomeScreenStyles.boxTitle}>Recent Transactions</Text>
                  {transes.map((item)=>{
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
                  <CashTotalBox/>
                  <ProgressBox/>
                  
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
    //height:400,
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
