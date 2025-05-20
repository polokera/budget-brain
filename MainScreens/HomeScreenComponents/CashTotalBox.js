import { StyleSheet,View,Text } from "react-native"
import HomeScreenStyles from "./HomeScreenStyles"

export default function CashTotalBox({cashTtl}){
    return(
        <View style={[styles.cashTotalBox,HomeScreenStyles.boxes]}>
            <Text style={HomeScreenStyles.boxTitle}>Cash total</Text>
            <View style={styles.amountBox}>
                 <Text style={styles.amountText}>MWK {cashTtl}</Text>
            </View>
        </View>
    )
}


const styles=StyleSheet.create({
    amountBox:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    amountText:{
        fontSize:21,
        fontWeight:"bold",
    },
    cashTotalBox:{
        height:120,
        backgroundColor:"#FEEEEE",
        width:210,
    },
})