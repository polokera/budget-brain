import {View,StyleSheet,Text,StatusBar, Pressable} from 'react-native'

export default function WelcomeScreen({navigation}){
    return(
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={{marginTop:100,}}>
                    <Text style={[{alignSelf:"center",},styles.text]}>Welcome to</Text>
                    <Text style={[styles.text,{fontSize:30}]}>Budget Brain</Text>
                </View>
                <Pressable 
                onPress={()=>navigation.navigate("Sign up")}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:"#fff5e0",
        flex:1,
        paddingTop:StatusBar.currentHeight,
    },
    container:{
        marginTop:100,
        alignItems:"center",
        flex:1,
    },
    text:{
        fontWeight:"bold",
    },
    button:{
        backgroundColor:"#ee9e8e",
        borderRadius:15,
        marginTop:220,
        width:150,
        height:60, 
        justifyContent:"center",
        alignItems:"center",
        elevation:4,
    },
    buttonText:{
        fontSize:20,
        verticalAlign:"middle",
    }

})