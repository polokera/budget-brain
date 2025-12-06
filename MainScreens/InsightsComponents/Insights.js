import {View,Text,StyleSheet} from "react-native"
import externalStyles from '../../CustomModules/generalStyles'
import { SegmentedButtons } from "react-native-paper"
import { useState,useEffect } from "react"
import TargetHistory from "./TargetHistory"
import Categories from "./Categories"
import SegButtons from "./Topbuttons"

export default function Insights(){
    const [selectedTimeFrame,setSelectedTimeFrame] = useState("Last week")

    return(
        <View style={externalStyles.main}>
            <View style={styles.container}>
                <SegButtons selectedTimeFrame={selectedTimeFrame} setSelectedTimeFrame={setSelectedTimeFrame}/>
                <View style={styles.mainContent}>
                  <TargetHistory timeFrame={selectedTimeFrame}/>
                  <Categories timeFrame={selectedTimeFrame}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
    },
    segContainer:{
        backgroundColor:"#fdf5f4",
        elevation:4,
        width:"90%",
        borderWidth:0.5,
        padding:4,
    },
    mainContent:{
        width:"95%",
     
        height:"80%",
        marginVertical:30,
        borderRadius:10,
    }

})