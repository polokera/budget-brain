import { useEffect } from 'react'
import {Text,StyleSheet,View} from 'react-native'


export default function ShortPopUp({message,visible,hide}){
     useEffect(() => {
        if (visible) {
        const timer = setTimeout(() => {
            hide();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, hide]);

  if (!visible) return null;
    return(
        <View 
        style={styles.popUp}>
            <Text style={{color:"white"}}>{message}</Text>
        </View>
        // <View>
        //     <Text>lol</Text>
        // </View>
    )
}

const styles = StyleSheet.create({
    popUp:{
        zIndex:2,
        backgroundColor:"#000000cb",
        borderRadius:10,
        padding:10,
        position:"absolute",
        bottom:30,
        left:10,
    },
})