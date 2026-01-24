import {Modal,View,Text,Pressable,StyleSheet} from 'react-native'
import { TextInput } from 'react-native-paper'
import generalStyles from '../../CustomModules/generalStyles'
import { useState } from 'react'

export default function NewUsernameModal({visible}){
    const [newUsername,setNewUsername] = useState(null)
    const changeUsername=async()=>{
        console.log(newUsername)
    }
    return(
        <Modal
        visible={visible}
        transparent
        >
            <Pressable
            style={styles.overlay}
            onPress={()=>console.log('overlay pressed')}
            />
            <View
            style={styles.popup}
            >
                <Text style={styles.promptText}>Enter your new username</Text>
                <TextInput
                style={[generalStyles.input,styles.input]}
                />
                <Pressable style={generalStyles.button}>
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
    },
    popup:{
        backgroundColor:"white",
        height:"40%",
        alignItems:"center"
    },
    promptText:{
        fontSize:15,
        fontWeight:"900",
    },
    input:{
        width:140,
        height:40,
    }
})