import {View,StyleSheet,Text, TextInput, Pressable} from 'react-native'
import externalStyles from '../../generalComponents'
export default function SetTargetPage(){
    return(
        <View style={styles.main}>
            <Text>
                Let's start by setting a weekly goal.    
                This is the maximum amount you want to spend per week!
            </Text>
           <View style={[externalStyles.list,{width:"85%",}]}>
                <View style={styles.row}>
                    <Text style={styles.text}>Weekly Amount(MWK):</Text>
                    <TextInput style={styles.input} keyboardType='numeric'/>
                </View>
           </View>
           <Pressable style={externalStyles.button}>
                <Text style={externalStyles.buttonText}>Done</Text>
           </Pressable>
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
    },
})