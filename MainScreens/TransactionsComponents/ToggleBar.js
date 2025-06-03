import {View,Text,StyleSheet} from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { SegmentedButtons } from "react-native-paper"
import { useState } from "react"
export default function ToggleBar({}){
    
    return(
        <View style={styles.container}>
            <SegmentedButtons
            value={selectedScreen}
            onValueChange={setSelectedScreen}
            buttons={[
                {value:'w2w',label:"Wallet to wallet"},
                {value:"fWallet",label:"From Wallet"}
            ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#eefbfb",
        height:"10%",
        flexDirection:"row",
        width:"80%",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20,
    },
    text:{
        fontSize:RFValue(16),
        paddingHorizontal:10,
        textAlign:"center",
    },
    textBox:{
        backgroundColor:"#fff",
        elevation:4,
        borderRadius:10,
        height:"60%",
        width:"45%",
        justifyContent:"center",
        marginHorizontal:8,
    }
})