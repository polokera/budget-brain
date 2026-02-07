import {View,Text,StyleSheet,Image} from 'react-native'


export default function Author(){
    return(
        <View style={styles.container}>
            <View style={{flexDirection:"row"}}>
                <Image source={require('../../../assets/image.png')} style={styles.image}/>
                <Text style={styles.text}>Hi I'm Jabulani Bill Polokera. I'm a student who's passionate about computers. 
                    I am a computer systems and security student at MUST.
                </Text>
            </View>
            
            <Text>
                I am currently exploring frontend mobile development specifically react-native
                for over a year now. I see development not as a job but as an art form
                .I see developers and artists as one and the same. They both give one the chance to create freely from your mind.
                When I'm not on Visual Studio code, I'm either playing brawlhalla, trying to play sports, learning French or watching Kai Havertz highlights.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

        padding:10,
    },
    text:{
        // borderWidth:1,
        width:170,
    },
    image:{
        width:100,
        height:100,
        marginRight:10,
        borderRadius:90,
    }
})