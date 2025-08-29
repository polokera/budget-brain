import {View,StyleSheet,Text, TextInput, Pressable, Alert} from 'react-native'
import externalStyles from '../../CustomModules/generalStyles'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AddComas } from '../../CustomModules/generalModules'

export default function SetTargetPage({showHome,addWalletsToDb}){
    const handleChange =(text)=>{
    //this function formats content in the textbox, adds commas using regex.
        const formatted = AddComas(text);
        setValue(formatted);
    }
    const [value,setValue] = useState(0)
    const signUserUp = async ()=>{
        //this changes the async storage variable "isSignedUp" to true so that the next time the user 
        //launches the app it doesnt make them sign up all over again.
        await AsyncStorage.setItem("isSignedUp","true");
    }
    const onPress=async()=>{
        //the value  here is the weekly goal
        //it checks whether the weekly goal is not 0  and actually a value
        //then it passes is it to  the function which enters it to the table 
        //using an sql statement.
        if(Number(value) !== 0 && value){
            try
            {
                await signUserUp()
                await addWalletsToDb(value);
                // showHome()
            }
            catch(e){
                console.log(e)
            }
        }
        else{
            Alert.alert("Alert","Please set a target first")
        }
    }
    return(
        <View style={styles.main}>
            <Text>
                Let's start by setting a weekly goal.    
                This is the maximum amount you want to spend per week!
            </Text>
           <View style={[externalStyles.list,styles.container]}>
                <View style={styles.row}>
                    <Text style={styles.text}>Weekly Amount(MWK):</Text>
                    <TextInput
                    style={styles.input} 
                    keyboardType='numeric'
                    placeholder='0' 
                    value={value} 
                    onChangeText={handleChange}/>
                </View>
                <Pressable 
                onPress={onPress}
                style={[externalStyles.button,styles.button]}>
                        <Text style={externalStyles.buttonText}>Done</Text>
                </Pressable>                
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        alignItems:"center",
    },
    input: {
        backgroundColor: "#fff",
        width: 150,
        height:40,
        borderRadius: 20,
        borderWidth: 0.4,
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    row:{
        flexDirection:"row",
    },
    text:{
        verticalAlign:"middle",
        width:100,
        textAlign:"center",
    },
    button:{
        width:85,
        height:40,
        marginTop:60,
    },
    container:{
        marginTop:50,
        width:"92%",
        height:250,
        alignItems:"center",
    },
})