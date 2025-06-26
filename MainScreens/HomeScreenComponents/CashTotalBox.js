import { StyleSheet,View,Text,Dimensions } from "react-native"
import HomeScreenStyles from "./HomeScreenStyles"
import { AddComas } from "../../CustomModules/generalModules"

export default function CashTotalBox({cashTtl}){
    const getWidth=()=>{
        return ((Dimensions.get("window").width)*0.6)
    }
    const formattedCashTotal = AddComas(String(cashTtl))
    return(
        <View style={[styles.cashTotalBox,HomeScreenStyles.boxes,{width:getWidth()}]}>
            <Text style={HomeScreenStyles.boxTitle}>Cash total</Text>
            <View style={styles.amountBox}>
                 <Text style={styles.amountText}>MWK {formattedCashTotal}</Text>
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
        height:100,
        backgroundColor:"#FEEEEE",
        width:210,
    },
})