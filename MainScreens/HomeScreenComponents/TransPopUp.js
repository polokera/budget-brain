import {Modal,Text,View,StyleSheet, Button,ScrollView, Pressable} from 'react-native'
import { useEffect, useState } from 'react';
import externalStyles from '../../CustomModules/generalStyles'
import { AddComas,fixDates,fixTimes } from '../../CustomModules/generalModules';
import { set } from 'lodash';
// import { styles } from '../TransactionsComponents/AllTransactions'

export default function TransPopUp({visible,setVisible,data}){
    const [dateToShow,setDateToShow]= useState(null);
    const [timeToShow,setTimeToShow] = useState(null)
    useEffect(()=>{
        if(data?.transTime && data?.transDate){
            const cleanDate = fixDates(data.transDate)
            setDateToShow(cleanDate)
            const cleanTime = fixTimes(data.transTime,data.transDate)
            setTimeToShow(cleanTime)
        }
    },[data])
    return(
        <Modal 
        visible={visible}
        transparent={true}
        >
        <View style={styles.container}>
            <View style={styles.popup}>
                <View style={styles.contentBox}>
                    <View style={styles.transaction}>
                        <View style={styles.topRow}>
                                <Text style={styles.transType}>{data?.transType}</Text>
                                <Text style={[styles.walletName,{color:data?.themeColor}]}>{data?.wName}</Text>
                        </View>
                        <Text 
                        style={[styles.amount
                            ,{color:data?.transSign==-1?"tomato":"green"}]}>
                                <Text style={{fontWeight:"bold"}}> {data?.transSign==-1&&"-"} MWK </Text>
                            {AddComas(data?.amount)}</Text>
                        
                        <View style={styles.description}>
                            <ScrollView style={{flex:1}}>
                                {data?.transDescription !== ""?
                                <Text style={styles.descriptionText}>{data?.transDescription}</Text>:
                                <Text>No description</Text>
                            }
                            </ScrollView> 
                            <View style={styles.bottomRow}>
                                <Text style={[styles.dateTime,styles.time]}>{timeToShow}</Text>
                                <Text style={[styles.dateTime,styles.date]}>{dateToShow}</Text>
                            </View>  
                        </View>
                        <Pressable 
                        onPress={()=>setVisible(false)}
                        style={[styles.button,externalStyles.button]}>
                            <Text style={externalStyles.buttonText}>Done</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#00000042",
        flex:1,
        justifyContent:"flex-end",
    },
    popup:{
        height:400,
        width:"100%",
        alignItems:"center",
        backgroundColor:"#e0fbfb",
        borderTopEndRadius:30,
        borderTopStartRadius:30,
        paddingHorizontal:20,

    },
    contentBox:{
        margin:5,
        alignItems:"center",
        flex:1,
        width:"100%",
        paddingTop:30,
    },
    content:{
        backgroundColor:"#e0fbfb",
        width:"80%",
        flex:1,
        elevation:4,
        borderRadius:10,
        paddingHorizontal:20,
        paddingTop:10,
        alignItems:"center"
    },
    title:{
        fontSize:34,
        color:"#000000",
        fontWeight:"bold",
        // borderWidth:1,
        width:"90%",
        marginLeft:20,
    },
    amountName:{
        fontSize:12,
        width:"40%",
    },
    walletName:{
        textAlign:"right",
        backgroundColor:"white"
    },
    message:{
        width:"70%",
        height:"50%",
        textAlign:"center",
        fontSize:18,
        marginTop:20,
    },
    button:{
        width:140,
        height:55,
        alignSelf:"center",
    },
    transaction:{
        backgroundColor:"#fff",
        elevation:4,
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:8,
        marginVertical:8,
    },
    topRow:{
        flexDirection:"row",
        backgroundColor:"#f5f7f9ff",
        padding:8,
        borderWidth:0.1,
        marginBottom:10,
        borderRadius:3,
        elevation:0.3,
    },
    transType:{
        fontSize:25,
        fontWeight:"bold",
        width:"63%",
    },
    walletName:{
        width:"35%",
        textAlign:"right",
        borderRightWidth:2,
        borderTopRightRadius:2,
        borderBottomRightRadius:2,
        borderColor:"grey",
        padding:3,
    },
    amount:{
        width:"100%",
        alignSelf:"flex-end",
        paddingRight:20,
        textAlign:"right",
        fontSize:16,
    },
    description:{
        height:140,
        paddingHorizontal:6,
        paddingTop:5,
        backgroundColor:"#dde1ed",
        marginVertical:10,
        marginHorizontal:20,
        elevation:4,
        borderRadius:6.5,
    },
    descriptionText:{
        padding:10,
    },

    bottomRow:{
        flexDirection:"row",
        marginBottom:10,
        borderTopWidth:0.3,
        paddingTop:10,
    },
    time:{
        width:"50%",
    },
    date:{
        width:"50%",
        textAlign:"right",
    }

})