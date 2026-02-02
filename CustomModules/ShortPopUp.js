import {View,Text,StyleSheet} from 'react-native'


export default function ShortPopUp({message}){
    return(
        <View style={styles.popUp}>
            <Text style={{color:"white"}}>Username has been changed successfully</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    popUp:{
        zIndex:2,
        backgroundColor:"#000000cb",
        borderRadius:10,
        padding:10,
    }
})