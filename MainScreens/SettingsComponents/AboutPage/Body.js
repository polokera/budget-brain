import {Text,View,StyleSheet} from 'react-native'
import Author from './Author'
import Theapp from './TheApp'
import Acknowledgements from './Acknowledgements'


export default function Body({selected}){
    return(
        <View style={styles.main}>
            <Text style={styles.title}>{selected}</Text>
            {selected=="About the developer"&&<Author/>}
            {selected=='About the app'&&<Theapp/>}
            {selected=="Special thanks"&&<Acknowledgements/>}
        </View>
    )
}


const styles = StyleSheet.create({
    main:{
        minHeight:500,
        backgroundColor:"#fff",
        width:"98%",
        elevation:3,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        padding:20,
    },
    title:{
        fontSize:25,
        fontWeight:"900",
    }
})