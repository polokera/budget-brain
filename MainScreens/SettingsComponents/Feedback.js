import {View,Text,StyleSheet, TextInput, Pressable, Linking} from 'react-native'
import { useState } from 'react'
import generalStyles from '../../CustomModules/generalStyles'

export default function Feedback(){
    const [feedback,setFeedback] = useState(null)
    const [error,setError] = useState(false)
    const sendToWhatsapp=async()=>{
        if(!feedback){
            setError(true);
        }
        else{

            setError(false)
            const phoneNumber = 265987280974;
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(feedback)}`
            try{
                const supported = await Linking.canOpenURL(url)
                if(supported){
                    await Linking.openURL(url)
                }
                else{
                    Alert.alert("Error","an error occured")
                }
            }
            catch(e){
                console.log(e)
            }

        }
        
    }
    return(
        <View style={[generalStyles.main,{alignItems:"center"}]}>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.topText}>Be honest with us. What did you like, and what should we fix?</Text>
                </View> 
                <View style={styles.innerContainer}>
                    <TextInput
                    value={feedback}
                    onChangeText={setFeedback}
                    placeholder='Type your feedback here'
                    multiline
                    numberOfLines={6}
                    style={[generalStyles.input,styles.input]}
                    />
                    {error&&<Text style={styles.error}>Enter some feedback first!</Text>}
                    <View style={styles.buttonBox}>
                        <Pressable 
                        onPress={sendToWhatsapp}
                        style={[generalStyles.button,styles.button,{backgroundColor:"#25D366"}]}>
                            <Text style={[styles.buttonText]}>Send via WhatsApp</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        height:100,
        width:260,
        verticalAlign:"top",
        padding:8,
    },
    container:{
        alignItems:"center",
        width:"90%",
    },
    innerContainer:{
        backgroundColor:"#fff",
        elevation:4,
        borderRadius:9,
        width:300,
        paddingVertical:20,
        alignItems:"center"
    },
    topContainer:{
        width:260,
        // backgroundColor:"#fff",
    },
    topText:{
        fontSize:17,
        paddingVertical:10,
        paddingHorizontal:6,
    },
    buttonBox:{
        marginVertical:16,
        flexDirection:"row",
    },
    button:{
        marginHorizontal:8,
        height:46,
        padding:5,
        width:130,
    },
    buttonText:{
        textAlign:"center",
        color:"#fff9f9"
    },
    error:{
        color:"red",
        marginBottom:19,
        fontStyle:"italic"
    },
})