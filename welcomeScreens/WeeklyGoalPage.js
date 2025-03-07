import AsyncStorage from '@react-native-async-storage/async-storage'
import {Text,View,StyleSheet,Pressable,ActivityIndicator,StatusBar} from 'react-native'
import { useState,useEffect } from 'react'
export default function MoneyWallet(){
    const [userName,setUserName] = useState("")
    const [isLoading,setIsLoading] = useState(true)
    const getUserName = async()=>{
        try{
            const UserName = await AsyncStorage.getItem('userName');
            setUserName(UserName);
            setIsLoading(false)
        }catch(e){

        }
    }
    useEffect(()=>{
        getUserName()
    },[])
    if(isLoading){
        return(
            <View style={[styles.main,{flex:1,justifyContent:"center",alignItems:"center"}]}>
                <Text>Loading By Central Cee...</Text>
               <ActivityIndicator size="large"/> 
            </View>
        )
    }
    return(
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome, {userName}</Text>
                <Text style={styles.welcomeText}>Budget brain is going to help you save money by helping you set weekly targets, keep your transactions to see trends in spending etc....</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize:25,
       fontWeight:"bold",
        textAlign:"center",
        marginBottom:40,
    },
    main:{
        backgroundColor:"#fff5e0",
        flex:1,
        paddingTop:StatusBar.currentHeight,
    },
    container:{
        marginTop:80,
        alignItems:"center",
    },
    welcomeText:{
        width:"80%",
        fontSize:24,
        fontWeight:"ultralight",
    }
})
