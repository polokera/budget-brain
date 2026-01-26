import {View,Text,StyleSheet} from "react-native"
import generalStyles from '../../CustomModules/generalStyles'
import TopSection from "./TopSection"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useContext, useEffect, useState } from "react"
import NameCard from "./NameCard"
import { RefreshFunctionContext } from "../../CustomModules/Contexts"

export default function Settings(){
    const [loading,setLoading] = useState(false)
    const [username,setUsername] = useState('like me')
    const {refreshKey} = useContext(RefreshFunctionContext)
    const getUsername=async()=>{
        setLoading(true)
        const x_username = await AsyncStorage.getItem('userName')
        setUsername(x_username)
        setLoading(false)
    }
    useEffect(()=>{
        getUsername()
    },[refreshKey])
    if(loading){
        return(
            <View style={generalStyles.main}>
                <Text>Loading By Central Cee...</Text>
            </View>
        )
    }
    return(
        <View style={[generalStyles.main,styles.main]}>
            <NameCard name={username}/>
            <TopSection />
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        alignItems:"center",
    }
})