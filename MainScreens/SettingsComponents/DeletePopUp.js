import {Modal,View,StyleSheet,Text, Pressable, DeviceEventEmitter} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import openMyDatabase from '../../CustomModules/DbModule'
import * as Updates from 'expo-updates'

export default function DeletePopUp({visible,hide}){
    const deleteData=async()=>{
        try{
            await AsyncStorage.removeItem("isSignedUp")
            await AsyncStorage.removeItem("weeklyTarget")
            const dbx = await openMyDatabase()
            await dbx.runAsync(`DELETE from weeks`);
            await dbx.runAsync(`DELETE from wallets`);
            await dbx.runAsync(`DELETE from transactions`);
            DeviceEventEmitter.emit('userLoggedOut');
            hide();
        }
        catch(e){
            console.log(e)
        }
    }
    return(
        <Modal
        transparent
        visible={visible}
        >
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <Text style={styles.title}>Warning!</Text>
                    <Text style={styles.promptText}>Once you delete all your data, there wil be no way you can recover it. Are you sure?</Text>
                    <View style={styles.buttonBox}>
                        <Pressable 
                        onPress={hide}
                        style={[styles.button,{backgroundColor:"#4b4949"}]}>
                            <Text style={styles.buttonText}>No, cancel</Text>
                        </Pressable>
                        <Pressable 
                        onPress={deleteData}
                        style={[styles.button,{backgroundColor:"tomato"}]}>
                            <Text style={styles.buttonText}>Yes Delete</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay:{
        backgroundColor:"#00000051",
        flex:1,
        justifyContent:"center",
        paddingHorizontal:30,
    },
    content:{
        backgroundColor:"#fff5e0",
        height:220,
        padding:12,
        elevation:4,
        borderRadius:9,
        // marginHorizontal:
    },
    title:{
        fontSize:24,
        fontWeight:"700",
        marginBottom:10,
    },
    buttonBox:{
        flexDirection:"row",
        marginTop:19,
        // borderWidth:1,
        justifyContent:"center",
    },
    button:{
        marginHorizontal:7,
        width:100,
        height:34,
        justifyContent:"center",
        borderRadius:12,
        borderColor:"tomato",
    },
    buttonText:{
        textAlign:"center",
        color:"white",
    },
    promptText:{
        fontSize:17,
        paddingBottom:16,
    }
})