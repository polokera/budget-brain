import {View,StyleSheet,Text, TextInput, Pressable} from 'react-native'
import externalStyles from '../../CustomModules/generalStyles'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SQLite from 'expo-sqlite'
export default function SetTargetPage({navigation,route}){


    const OpenDb = async()=>{
        const db = await SQLite.openDatabaseAsync("myDatabse.db");
        //await db.execAsync(`CREATE TABLE IF NOT EXISTS  `)
    }


    const handleChange =(text)=>{
    //this function formats content in the textbox, adds commas using regex.
        const numeric = text.replace(/[^0-9]/g,'');
        //removes all non numbers including commas
        const formatted = numeric.replace(/\B(?=(\d{3})+(?!\d))/g,",")
        //formats the values at this point there should be no previous commas 
        //if there are commas it wont work thats why we have to remove commas at first.
        setValue(formatted);
    }
    const [value,setValue] = useState(0)
    const signUserUp = async ()=>{
        //this changes the async storage variable "isSignedUp" to true so that the next time the user 
        //launches the app it doesnt make them sign up all over again.
        await AsyncStorage.setItem("isSignedUp",true);
        
        navigation.navigate("Main Tabs")
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
                    <TextInput style={styles.input} keyboardType='numeric' value={value} onChangeText={handleChange}/>
                </View>
                <Pressable style={[externalStyles.button,styles.button]}>
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