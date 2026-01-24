import {View,Text,StyleSheet, Pressable} from 'react-native'
import settingsStyles from './settingsStyles'
import NewUsernameModal from './NewUsername'
import { useState } from 'react'

export default function TopSection(){
    const [mdlUsernameVisible,setMdlUsernameVisible] = useState(false)
    return(
        <View style={settingsStyles.box}>
            <NewUsernameModal
            visible={mdlUsernameVisible}
            hide={()=>setMdlUsernameVisible(false)}
            />
            <Pressable 
            onPress={()=>setMdlUsernameVisible(true)}
            style={styles.item}>
                <Text style={styles.itemText}>Username</Text>
            </Pressable>
            <Pressable style={styles.item}>
                <Text style={styles.itemText}>Theme</Text>
            </Pressable>
            <Pressable style={[styles.item,{borderBottomWidth:0}]}>
                <Text style={styles.itemText}>Send feedback</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        borderBottomWidth:2,
        borderColor:"grey",
        height:50,
        justifyContent:"center",
        padding:10
    },
    itemText:{
        fontSize:18,
        verticalAlign:'bottom',
        // borderWidth:1,
    }
})