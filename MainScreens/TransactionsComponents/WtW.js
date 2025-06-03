import {View,Text,StyleSheet,TextInput,Pressable} from "react-native"
import ExternalStyles from '../../CustomModules/generalStyles'
import { RFValue } from "react-native-responsive-fontsize"
import {Dropdown} from "react-native-paper-dropdown"
import {Provider as PaperProvider, Provider} from 'react-native-paper'
import { useState } from "react"


export default function WtW(){
    //wtw is  wallet to wallet transaction
    const options = [
        {label:"Male",value:"male"},
        {label:"Female",value:"female"},
        {label:"Boy",value:"boy"},
    ]
    const [gender,setGender] = useState("")
    return(
        <Provider>
            <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>Title</Text>
                <TextInput
                style={[ExternalStyles.input,styles.input]}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>Amount</Text>
                <TextInput
                style={[ExternalStyles.input,styles.input,{}]}
                keyboardType="number-pad"
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>extra fees</Text>
                <TextInput
                style={[ExternalStyles.input,styles.input]}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>From</Text>
                <Dropdown
                options={options}
                label="gender"
                placeholder="select gender"
                onSelect={setGender}
                value={gender}
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.title}>To</Text>
                <TextInput
                style={[ExternalStyles.input,styles.input]}
                />
            </View>
            <View style={[styles.row,{height:"17%"}]}>
                <Text style={styles.title}>Description</Text>
                <TextInput
                multiline={true}
                numberOfLines={3}
                style={[ExternalStyles.input,styles.input,{height:"80%"}]}
                />
            </View>
            <Pressable style={[ExternalStyles.button,styles.button]}>
                <Text>Done</Text>
            </Pressable>
            </View>
        </Provider>
        
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#eefbfb",
        width:"80%",
        marginVertical:40,
        //elevation:2,
        borderWidth:0.8,
        borderRadius:8,
        alignItems:"center",
        paddingVertical:20,
        paddingHorizontal:10,
    },
    input:{
        width:"60%",
        fontSize:RFValue(11),
        height:"55%",
    },
    row:{
        flexDirection:"row",
        height:"12%",
    },
    title:{
        textAlign:"right",
        verticalAlign:"middle",
        fontSize:RFValue(14),
        marginRight:20,
        marginLeft:5,
        width:"30%",
        height:"50%",
        borderWidth:1,
    },
    button:{
        width:100,
        height:45,
    }
})