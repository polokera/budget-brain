import externalStyles from '../../CustomModules/generalStyles'
import {View,StyleSheet} from 'react-native'
import ToggleBar from './ToggleBar'
import { useState } from 'react'
import WtW from './WtW.js'
export default function Transaction(){
    const [selectedScreen,setSelectedScreen] = useState("fWallet")
    return(
        <View style={externalStyles.main}>
            <View style={styles.container}>
                <ToggleBar selected={selectedScreen} toggleFn={setSelectedScreen}/>
                <WtW/>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        // backgroundColor:"white",
        //justifyContent:"center",
        alignItems:"center",
        flex:1,
    }
})