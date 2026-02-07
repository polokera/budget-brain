import { MaterialIcons,FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import {View,Text,StyleSheet, Pressable} from 'react-native'


export default function Selector({selected,setSelected}){
    return(
        <View style={styles.SelectorBox}>
            <Pressable
            onPress={()=>setSelected("About the developer")}
            style={
                [
                styles.boxItem,
                {borderWidth:selected=="About the developer"?1.7:0,
                borderColor:"orange",
                elevation:selected=="About the developer"?10:1}
                ]}
            >
                <FontAwesome name="code" size={24} color="orange" style={styles.icon}/>                
                <Text style={[styles.itemText,{color:"orange"}]}>About the Author</Text>
            </Pressable>
            <Pressable 
            onPress={()=>setSelected("About the app")}
            style={
                [
                styles.boxItem,
                {
                    borderWidth:selected=="About the app"?1.7:0,
                    borderColor:"lightblue",
                    elevation:selected=="About the app"?10:1
                }
                ]}
            >
                <MaterialIcons name='smartphone' size={24} color='lightblue' style={styles.icon}/>
                <Text style={[styles.itemText,{color:"blue"}]}>About Budget brain</Text>
            </Pressable>
            <Pressable 
            onPress={()=>setSelected("Special thanks")}
            style={
                [
                styles.boxItem,
                {borderWidth:selected=="Special thanks"?1.7:0,
                borderColor:"lightgreen",
                elevation:selected=="Special thanks"?10:1}
                ]}
            >
                <FontAwesome6 name='people-group' size={24} color='lightgreen' style={styles.icon}/>
                <Text style={[styles.itemText,{color:"green"}]}>Special thanks!</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    SelectorBox:{
        flexDirection:"row",
        padding:20,
        // borderWidth:1,
        height:130,
        position:"static"
    },
    icon:{
        marginVertical:8,
    },
    boxItem:{
        width:65,
        height:100,
        // borderWidth:1,
        alignItems:"center",
        marginHorizontal:12,
        padding:10,
        backgroundColor:"#fff",
        // elevation:4,
        borderRadius:7,
    },
    itemText:{
        fontSize:12,
    }
})