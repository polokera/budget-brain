import {View,Text,StyleSheet} from "react-native"
import { SegmentedButtons } from "react-native-paper"
export default function ToggleBar({selected,toggleFn}){
    
    return(
        <View style={styles.container}>
            <SegmentedButtons
            value={selected}
            onValueChange={toggleFn}
            buttons={[ 
                {value:"fWallet",label:"From Wallet"},
                {value:'wtw',label:"Wallet to wallet"},
               
            ]}
            theme={{
                colors:{primary:"#fdf5f4"}
            }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#eefbfb",
        height:"10%",
        flexDirection:"row",
        width:"85%",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20,
        paddingHorizontal:20,
        elevation:4,
    },
    text:{
        fontSize:16,
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
    },
    selected:"#fdf5f4",
})