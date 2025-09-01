import {View,Text,StyleSheet,Modal, Button, Pressable} from 'react-native'
import { useState,useEffect } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import externalStyles from '../CustomModules/generalStyles'


export default function Popup({visible,hide,title,message,success,goBack}){

    return(
        <Modal
        transparent
        visible={visible}
        animationType='fade'
        >
            <View style={styles.container}>
               <View style={styles.popup}>
                    {success?<AntDesign name='checkcircle' color='green' size={120} style={styles.icon}/> : <Entypo name="circle-with-cross" size={120} color="tomato" style={styles.icon}/>}
                    <View style={styles.contentBox}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.message}>{message}</Text>
                        <Pressable 
                        onPress={()=>{
                            hide();
                            success&&goBack()
                        }}
                        style={[externalStyles.button,styles.button]}>
                            <Text style={externalStyles.buttonText}>Close</Text>
                        </Pressable>
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
        width:300,
    },
    title:{
        fontSize:34,
        color:"#ee9e8e",
        fontWeight:"bold",
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
    }

})