import {View,Text,StyleSheet} from "react-native"
import generalStyles from '../../CustomModules/generalStyles'
import TopSection from "./TopSection"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useContext, useEffect, useState } from "react"
import NameCard from "./NameCard"
import { RefreshFunctionContext } from "../../CustomModules/Contexts"
import ShortPopUp from "../../CustomModules/ShortPopUp"
import DeletePopUp from "./DeletePopUp"

export default function Settings({navigation}){
    const [deletePopUpVisible,setDeletePopUpVisible] = useState(false)
    const [loading,setLoading] = useState(false)
    const [username,setUsername] = useState('like me')
    const {refreshKey} = useContext(RefreshFunctionContext)
    const getUsername=async()=>{
        setLoading(true)
        const x_username = await AsyncStorage.getItem('userName')
        setUsername(x_username)
        setLoading(false)
    }
    const goToNextPage=(page)=>{
        navigation.navigate(page)
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
            <DeletePopUp visible={deletePopUpVisible} hide={()=>setDeletePopUpVisible(false)}/>
            <NameCard name={username}/>
            <TopSection goToNextPage={goToNextPage} showDeletePopUp={()=>setDeletePopUpVisible(true)}/>
            <ShortPopUp message='lol'/>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        alignItems:"center",
    },
    
})