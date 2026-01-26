import {Modal,View,Text,Pressable,StyleSheet,TextInput} from 'react-native'
import generalStyles from '../../CustomModules/generalStyles'
import { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {RefreshFunctionContext} from '../../CustomModules/Contexts'

export default function NewUsernameModal({visible,hide}){
    const [newUsername,setNewUsername] = useState(null)
    const [error,setError] = useState(false)
    const {setRefreshKey} = useContext(RefreshFunctionContext)
    const changeUsername=async()=>{
        if(newUsername){
            setError(false)
            console.log(newUsername)
            await AsyncStorage.setItem("userName",newUsername);
            setRefreshKey(r=>r+1);
            hide()
        }
        else{
            setError(true)
        }
        
    }
    return(
        <Modal
        visible={visible}
        transparent
        >
            <Pressable
            style={styles.overlay}
            onPress={hide}
            />
            <View
            style={styles.popup}
            >
                <Text style={styles.promptText}>Enter your new username</Text>
                <TextInput
                value={newUsername}
                onChangeText={setNewUsername}
                style={[generalStyles.input,styles.input]}
                />
                {error&&<Text style={styles.error}>Enter a username first!</Text>}                
                <Pressable 
                onPress={changeUsername}
                style={[generalStyles.button,styles.button]}>
                    <Text style={generalStyles.buttonText}>Done</Text>
                </Pressable>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay:{
        backgroundColor:"#08080853",
        height:"60%",
        marginBottom:-30
    },
    popup:{
        backgroundColor:"white",
        // height:"40%",
        flex:1,
        alignItems:"center",
        paddingTop:20,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
    },
    promptText:{
        fontSize:18,
        fontWeight:"900",
        marginBottom:30,
    },
    input:{
        width:180,
        height:40,
        marginBottom:1,
    },
    error:{
        color:"red",
        marginBottom:19,
        fontStyle:"italic"
    },
    button:{
        marginTop:15,
        width:130,
        height:30,
    }
})