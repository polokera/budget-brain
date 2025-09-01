import {View,Text,StyleSheet,FlatList, Pressable} from "react-native"
import { useState,useEffect } from "react"
import externalStyles from '../../CustomModules/generalStyles'
import { AddComas } from "../../CustomModules/generalModules"

export default function WalletScreen(){
    const [wallets,setWallets]=useState([{"balance": 435, "themeColor": "#2fdb45", "wName": "Mpamba", "walletId": 1}, 
        {"balance": 3503, "themeColor": "#f61f1f", "wName": "Airtel Money", "walletId": 2}])
    const onPress=()=>{
        console.log("lmao");
    }
    return(
        <View style={externalStyles.main}>
            <View style={styles.container}>
              <Text>ngati wachita kutumidwa ndi ex waine umuwuze, kuti nkhope ngati phazi</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
    },
    list:{
        backgroundColor:"#eefbfb",
        padding:10,
        borderRadius:9,
        marginBottom:50,
        borderWidth:0.4,
        paddingTop:48,
    },
    wallet:{
        backgroundColor:"white",
        width:265,
        marginVertical:4,
        borderRadius:5,
        padding:7,
        flexDirection:"row",
        elevation:3,
    },
    left:{
        width:"70%",
    },
    addButton:{
        width:55,
        height:55,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center",
        elevation:6,
    },
    walletName:{
        fontStyle:"italic",
        fontSize:21,
        paddingBottom:12,
    },
    balance:{
        fontSize:16,
        paddingBottom:10,
    }
})
