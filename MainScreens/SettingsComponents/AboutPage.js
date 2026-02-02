import {View,Text,StyleSheet,Image,Pressable,ScrollView} from 'react-native'
import {useState} from 'react'
import generalStyles from '../../CustomModules/generalStyles'
import Selector from './AboutPage/Selector'
import Body from './AboutPage/Body'

export default function AboutPage(){
    const [selectedSection,setSelectedSection] = useState("About the developer")
    return(
        <View style={[generalStyles.main,styles.main]}>
            <ScrollView>
                <View style={styles.container}>
                    <Selector selected={selectedSection} setSelected={setSelectedSection}/>
                    <Body selected={selectedSection}/>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        // paddingHorizontal:20,
    },
    container:{
        alignItems:"center",
        // borderWidth:1,
        flex:1,
    },
    title:{

    },
    image:{

    }
})