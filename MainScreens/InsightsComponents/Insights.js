import {View,Text,StyleSheet} from "react-native"
import externalStyles from '../../CustomModules/generalStyles'
import { SegmentedButtons } from "react-native-paper"
import { useState,useEffect } from "react"
import TargetHistory from "./TargetHistory"
import Categories from "./Categories"

export default function Insights(){
    const [selectedScreen,setSelectedScreen] = useState("targetHistory")

    return(
        <View style={externalStyles.main}>
            <View style={styles.container}>
                {/* <View style={styles.segContainer}> */}
                    <SegmentedButtons
                        theme={{
                            colors:{primary:"#fdf5f4"}
                        }}
                        style={{paddingHorizontal:30,wiidth:"100%"}}
                        onValueChange={setSelectedScreen}
                        buttons={[
                            {value:"targetHistory",label:"Target History"},
                            {value:"categories",label:"Categories"}
                        ]}
                        value={selectedScreen}
                    />
                {/* </View> */}
                <View style={styles.mainContent}>
                    {selectedScreen=="targetHistory"?<TargetHistory/>:<Categories/>}
                </View>
                
                 {/* <Text>Atambwali</Text> */}
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
        backgroundColor:"#e0fbfb",
        height:"80%",
        elevation:3,
        borderWidth:0.4,
        marginVertical:30,
        borderRadius:10,
    }

})