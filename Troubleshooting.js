import {View,Text,StyleSheet, Button} from "react-native"
import openDatabase from "./CustomModules/DbModule"

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
        const result = await dbx.runAsync(`DELETE from transactions where transId = ?`,[105])
        result>0&&console.log("deleted")
        }
        catch(e){
            console.log(e)
        }
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
            onPress={Anything}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    
})