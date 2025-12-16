import {View,StyleSheet,Text} from 'react-native'
import { PieChart } from 'react-native-gifted-charts'

export default function Categories(){
    return(
        <View style={styles.mainContent}>
           <Text>Efficient</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContent:{
        backgroundColor:"#FEEEEE",
        height:400,
        margin:10,
        elevation:3, 
    }
})