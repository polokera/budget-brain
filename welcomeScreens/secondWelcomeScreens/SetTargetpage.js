import {View,StyleSheet,Text, TextInput, Pressable, Alert} from 'react-native'
import externalStyles from '../../CustomModules/generalStyles'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import openDatabase from '../../CustomModules/DbModule'

export default function SetTargetPage({navigation,route,walletsArray}){

    


    const handleChange =(text)=>{
    //this function formats content in the textbox, adds commas using regex.
        const numeric = text.replace(/[^0-9]/g,'');
        //removes all non numbers including commas
        const formatted = numeric.replace(/\B(?=(\d{3})+(?!\d))/g,",")
        //formats the values at this point there should be no previous commas 
        //if there are commas it wont work thats why we have to remove commas at first.
        setWeeklyTarget(formatted);
    }
    const [weeklyTarget,setWeeklyTarget] = useState(0)
    const signUserUp = async ()=>{
        //this changes the async storage variable "isSignedUp" to true so that the next time the user 
        //launches the app it doesnt make them sign up all over again.
        await AsyncStorage.setItem("isSignedUp","true");
        console.log("user signed up")
        navigation.navigate("MainTabs")
    }
    const addWalletsToDb = async(wklyTarget)=>{
        try{
            const dbx = await openDatabase()
            await dbx.runAsync(`INSERT INTO wallets(id,wName,initialAmount,themeColor)values(?,?,?,?)`,[walletsArray.id,walletsArray.wName,walletsArray.initialAmount,walletsArray.themeColor])
            await dbx.runAsync(`INSERT INTO target(target)values(?)`,[wklyTarget])
            console.log("inserted");
        }
        catch(error){
            console.log(error)
        }
    }
    const clickHandler = async ()=>{
        if(weeklyTarget){
            await signUserUp();
            await addWalletsToDb(weeklyTarget);
        }
        else{
            Alert.alert("Easy kaye","Enter a target before pressing done");
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
                    <TextInput style={styles.input} keyboardType='numeric' value={weeklyTarget} onChangeText={handleChange}/>
                </View>
                <Pressable 
                onPress={clickHandler}
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