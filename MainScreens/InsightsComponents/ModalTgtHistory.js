import {View,Text,StyleSheet, Modal, Pressable, FlatList} from "react-native"
import { FlashList } from "@shopify/flash-list"
import { AddComas } from "../../CustomModules/generalModules"

export default function FullTargetHistory({popUpVisible,setPopUpVisible,history,getFormattedDate,getPercentageColor}){
    return(
        <Modal
        transparent={true}
        visible={popUpVisible}
        animationType="fade"
        >
            <Pressable style={{flex:1}} onPress={()=>setPopUpVisible(false)}>
            {/* <TouchableWithoutFeedback> */}
                    <View 
                    pointerEvents="box-none"
                    style={styles.modalContainer}>
                        <Pressable onPress={(e)=>{e.stopPropagation()}}>
                            <View style={styles.modalContent}>
                                <View style={styles.header}>
                                    <Text style={[{width:"22%"},styles.headerText]}>Week{'\n'}starting</Text>
                                    <Text style={[{width:"20%"},styles.headerText]}>Target {'\n'}(MWK)</Text>
                                    <Text style={[{width:"20%"},styles.headerText]}>Spent {'\n'}(MWK)</Text>
                                    <Text style={[{width:"19%"},styles.headerText]}>Saved during week</Text>
                                </View>
                                <View 
                                style={{flex:1,width:"100%"}}>
                                     <FlatList
                                    data={history}
                                    renderItem={({item})=>{
                                        return(
                                            <View key={item.weekId} style={styles.record}>
                                                <Text style={[{width:"22%"},styles.item]}>{getFormattedDate(item.weekStart)}</Text>
                                                <Text style={[{width:"20%"},styles.item]}>{AddComas(parseInt(item.weekTarget))}</Text>
                                                <Text style={[{width:"20%"},styles.item]}>{AddComas(parseInt(item.weekSpent))}</Text>
                                                <Text style={[styles.item,{width:"19%",borderRightWidth:0}]}>{AddComas((parseInt(item.weekTarget)-parseInt(item.weekSpent)))}</Text>
                                                <Text style={[styles.percentage,{color:getPercentageColor(item.weekSpent,item.weekTarget)}]}>{parseInt((parseInt(item.weekSpent)/parseInt(item.weekTarget))*100)}%</Text>
                                            </View>
                                        )
                                    }}
                                    />
                                </View>
                            </View>
                        </Pressable>
                    </View>
            </Pressable>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalContent:{
        width:300,
        height:600,
        backgroundColor:"#fff5e0",
        alignItems:"center",
        padding:10,
        borderWidth:0.8,
        borderRadius:10,

    },
    modalContainer:{
       position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#08080829"
    },
    header:{
        flexDirection:"row",
        justifyContent:"center",
        borderBottomWidth:0.7,
    },
    record:{
        flexDirection:"row",
        backgroundColor:"#fdf5f4",
        height:29,
        marginVertical:6,
        justifyContent:"center",
        borderRadius:14,
        elevation:6,
        paddingVertical:6,
        width:"93%",
        alignSelf:"center"
    },
    item:{
        textAlign:"center",
        verticalAlign:"middle",
        borderRightWidth:0.6,
        borderRightColor:"grey",
        fontSize:12.5,
        
    },
    percentage:{
        position:"relative",
        fontSize:11,
        left:-70,
        bottom:-7,
    },
})