import externalStyles from '../../CustomModules/generalStyles'
import {View,Text,StyleSheet} from 'react-native'
import ToggleBar from './ToggleBar'
import { useState } from 'react'
export default function Transaction(){
    const [selectedScreen,setSelectedScreen] = useState("w2w")
    return(
        <View style={externalStyles.main}>
            <View style={styles.container}>
                <ToggleBar/>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        justifyContent:"center",
        alignItems:"center",
        flex:1,
    }
})