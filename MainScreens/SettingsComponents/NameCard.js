import {View,Text,StyleSheet, Pressable} from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function NameCard({name}){
    return(
        <View style={styles.card}>
            <Pressable
            style={styles.avatar}
            >
                <FontAwesome6 name="person-skating" size={80} color="#ffc444"/>
            </Pressable>
            <Text style={styles.text}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        // borderWidth:1,
        padding:20,
    },
    text:{
        fontSize:28,
        fontWeight:"900",
    },
    avatar:{
        alignItems:"center",
    }
})