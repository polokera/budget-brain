import { Modal, Pressable, View, Text, TextInput, StyleSheet } from "react-native"
import generalStyles from "../../CustomModules/generalStyles"
import { useContext, useState } from "react"
import { RefreshFunctionContext } from "../../CustomModules/Contexts"
import { AddComas, removeCommas } from "../../CustomModules/generalModules"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function NewTargetPopUp({visible,hide,showToast}){
    const [newTarget,setNewTarget] = useState(null)
    const [error,setError] = useState(false)
    const {setRefreshKey} = useContext(RefreshFunctionContext)
    const changeTarget=async()=>{
        try{
            if(Number(removeCommas(newTarget))){
                setError(false)
                console.log(newTarget)
                await AsyncStorage.setItem("weeklyTarget",String(removeCommas(newTarget)));
                setRefreshKey(r=>r+1);
                setNewTarget(null)
                hide()
                showToast()
                console.log("done")
            }
            else{
                console.log("thats nit a number")
                setError(true)
            }
        }
        catch(e){
            console.log(e)
        }
        
        
    }
    return(
        <Modal
        visible={visible}
        transparent
        animationType='fade'
        >
            <Pressable
            style={styles.overlay}
            onPress={hide}
            />
            <View
            style={styles.popup}
            >
                <Text style={styles.promptText}>Enter your new Target (MWK)</Text>
                <TextInput
                placeholder="should be a number"
                keyboardType="number-pad"
                value={AddComas(newTarget)}
                onChangeText={setNewTarget}
                style={[generalStyles.input,styles.input]}
                />
                {error&&<Text style={styles.error}>Enter a Target which is a number first!</Text>}                
                <Pressable 
                onPress={changeTarget}
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