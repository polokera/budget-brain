import { StyleSheet,View,Text } from "react-native"
import HomeScreenStyles from "./HomeScreenStyles"

export default function ProgressBox(){
    return(
        <View>
            <View style={[styles.progressBox,HomeScreenStyles.boxes]}>
                <Text style={HomeScreenStyles.boxTitle}>Weekly Progress</Text>
                <View style={styles.container}>
                    <View style={styles.top}>
                        {/* top */}
                        <View style={[styles.rightLeft,styles.left]}>
                            <Text style={{fontSize:38}}>100%</Text>
                            <Text style={{textAlign:"center",verticalAlign:"middle"}}>Used</Text>
                        </View>
                        <View style={[styles.rightLeft,styles.right]}>
                            {/* right */}
                            <View style={{flexDirection:"column"}}>
                                {/* right top */}
                                <Text style={{color:"#190933",fontSize:12}}>Used this week: </Text>
                                <Text style={[styles.values,{color:"#ca1818"}]}>MWK 10,000,000</Text>
                            </View>
                            <View style={{flexDirection:"column"}}>
                                {/* right bottom */}
                                <Text style={{fontSize:12,color:"#190933"}}>Weekly target: </Text>
                                <Text style={styles.values}>MWK 10,000,000</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        {/* bottom */}
                        <View style={[styles.backgroundBar,styles.bothBars]}/>
                        <View style={[styles.bar,styles.bothBars]}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    progressBox:{
        backgroundColor:"#e0fbfb",
        height:170,
        width:320,
    },
    container:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        //borderWidth:1,
        height:160,
        marginTop:-30,
    },
    top:{
        flexDirection:"row",
        marginVertical:8,
    },
    left:{
        paddingLeft:0,
        width:110,
    },
    right:{
        width:175,
        backgroundColor:"#fff",
        elevation:4,
        borderRadius:6,
    },
    rightLeft:{
        flexDirection:"column",
        paddingHorizontal:10,
       // borderWidth:1,
        width:133,
        height:100,
        marginTop:16,
    },
    values:{
        marginLeft:25,
        marginVertical:4,
        fontSize:16,
        fontWeight:"bold",
    },
    bothBars:{
        height:10,
        borderRadius:18,
        borderWidth:1,
    },
    backgroundBar:{
        backgroundColor:"#fff",
        width:200,
        position:"relative",
        bottom:-2,
        left:10,
    },
    bar:{
        backgroundColor:"red",
        width:200,
        position:"relative",
        bottom:5,
        left:14,
    },


})