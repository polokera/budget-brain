import {Modal,Text,View,StyleSheet, Button,ScrollView, Pressable} from 'react-native'
import { useEffect, useState } from 'react';
import externalStyles from '../../CustomModules/generalStyles'

export default function TransPopUp({visible,setVisible,data}){
    return(
        <Modal 
        visible={visible}
        transparent={true}
        >
        <View style={styles.container}>
            <View style={styles.popup}>
                <View style={styles.contentBox}>
                    <View style={styles.content}>
                        <Text style={styles.title}>{data?.transType}</Text>
                        <Text style={styles.walletName}>{data?.wName}</Text>
                        <View style={{height:130,borderWidth:1}}>
                            <ScrollView style={{flex:1}}>
                                {data.transDescription !== ""?
                                <Text>{data.transDescription}</Text>:
                                <Text>No description</Text>
                            }
                            </ScrollView> 
                            <View style={{flexDirection:"row"}}>
                                <Text style={styles.dateTime}>{data?.transTime}</Text>
                                <Text style={styles.dateTime}>{data?.transDate}</Text>
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
    icon:{
        marginTop:-35,
        elevation:20,
        //backgroundColor:"#fff",
        borderRadius:100,
        padding:10,
    },
    container:{
        backgroundColor:"#00000042",
        flex:1,
        justifyContent:"flex-end",
    },
    popup:{
        height:400,
        width:"100%",
        alignItems:"center",
        backgroundColor:"#fff",
        borderTopEndRadius:30,
        borderTopStartRadius:30,
    },
    contentBox:{
        margin:5,
        alignItems:"center",
        flex:1,
        width:"100%",
        paddingTop:30,
    },
    content:{
        backgroundColor:"#bdffff",
        width:"80%",
        flex:1,
        elevation:4,
        borderRadius:10,
        paddingHorizontal:20,
        paddingTop:10,
    },
    title:{
        fontSize:34,
        color:"#000000",
        fontWeight:"bold",
        
    },
    walletName:{
        fontSize:20,
        fontWeight:"200",
        textAlign:"right",
    },
    message:{
        width:"70%",
        height:"50%",
        textAlign:"center",
        fontSize:18,
        fontWeight:"thin",
        marginTop:20,
    },
    button:{
        width:140,
        height:55,
    },
    dateTime:{
        width:"45%",
        fontSize:"12",
        marginHorizontal:5,
    },
    

})