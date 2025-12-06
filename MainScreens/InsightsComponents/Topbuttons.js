import { View, StyleSheet, Text, Pressable, FlatList } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import Categories from "./Categories";
import TargetHistory from "./TargetHistory";

export default function SegButtons({selectedTimeFrame,setSelectedTimeFrame}){

    const onSelectItem=(item)=>{
        setSelectedTimeFrame(item)
        
    }
    return(
        <View style={styles.buttonContainer}>
            <Pressable onPress={()=>onSelectItem("Last week")}>
                <Text 
                    style={[styles.item,
                        selectedTimeFrame=="Last week"&&{backgroundColor:"#ee9e8e"},
                        {
                            borderRightWidth:0.78,
                            borderTopLeftRadius:19,
                            borderBottomLeftRadius:19
                        }
                    ]}
                    >
                    Last week
                </Text>
            </Pressable>
            <Pressable onPress={()=>onSelectItem("Last Month")}>
                <Text style={[styles.item,selectedTimeFrame=="Last Month"&&{backgroundColor:"#ee9e8e"},{borderRightWidth:0.78}]}>Last Month</Text>
            </Pressable>
            <Pressable onPress={()=>onSelectItem("Last 3 Months")}>
                <Text style={[styles.item,selectedTimeFrame=="Last 3 Months"&&{backgroundColor:"#ee9e8e"},
                    {
                        borderTopRightRadius:19,
                        borderBottomRightRadius:19
                    }
                ]}>Last 3 Months</Text>
            </Pressable>
        </View>

        
    )
}


const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection:"row",
        // paddingVertical:7,
        // paddingHorizontal:9,
        borderWidth:1,
        borderRadius:30,
    },
    item:{
        padding:9,
    }
})