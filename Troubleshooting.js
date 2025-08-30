import {View,Text,StyleSheet, Button} from "react-native"
import openDatabase from "./CustomModules/DbModule"
import * as Datefns from "date-fns"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Troubleshooting(){
    const getAllTransactions =async()=>{
        const dbx = await openDatabase()
        const transactions = await dbx.getAllAsync(`SELECT amount FROM transactions`)
        console.log(transactions)
    }
    const getAllWallets =async()=>{
        const dbx = await openDatabase()
        const transactions = await dbx.getAllAsync(`SELECT * FROM wallets`)
        console.log(transactions)
    }
    const Anything =async()=>{
        try{
        const dbx = await openDatabase()
        const result = await dbx.runAsync(`DELETE from target`)
        result>0&&console.log("deleted")
        }
        catch(e){
            console.log(e)
        }
    }
    const removeKey=async()=>{
        try{
            await AsyncStorage.removeItem("isSignedUp")
            console.log("key has been removed")
        }
        catch(e){
            console.log(e)
        }
    }
    const convertDate=()=>{
        const cleanDate = Datefns.parseISO("2025-08-01T09:28:00.000Z");
        const Formated = Datefns.format(cleanDate,"yyyy-MM-dd")
        console.log(Formated)
    }
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text>Ndatsala pang'ono pang'ono chabe</Text>
            <Button
            title="Get transactions"
            onPress={getAllTransactions}
            />
            <Button
            title="Get wallets"
            onPress={getAllWallets}
            />
            <Button
            title="Surpise button"
            onPress={removeKey}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    
})