import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { getHomeScreenDetails, Test } from '../../CustomModules/HomeScreenDbModules';

export default function Fab(){
    //floating action button(FAB)
    //the plus button for adding transaction
    const pressHandler=async()=>{
        const result = await Test();
        console.log(result)
    }
    return(
        <FAB
        icon="plus"
        color="black"
        style={styles.button}
        onPress={pressHandler}
        />
    )
}

const styles = StyleSheet.create({
    button:{
        width:70,
        height:70,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#ffe3e3",
        borderWidth:1,
        position:"absolute",
        bottom:150,
        right:20,
        zIndex:100,
        elevation:8,
    },

})