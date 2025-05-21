import { StyleSheet,View,Text } from "react-native"
import HomeScreenStyles from "./HomeScreenStyles"
import { useEffect, useState } from "react"
import { removeCommas } from "../../CustomModules/generalModules"

export default function ProgressBox({goal,spent}){
    const [perc,setPerc] = useState(null);
    const [barColor,setBarColor] = useState("#fff");
    const [barWidth,setBarWidth] = useState(0);
    const getBarColor=()=>{
        if(perc>=0 && perc<25){
            setBarColor("rgba(0, 255, 0, 0.7)")
        }
        else if(perc>=25 && perc<50){
            setBarColor("rgba(149, 255, 102, 0.7)")
        }
        else if(perc>=50&&perc<75){
            setBarColor("rgba(255, 194, 166, 0.7)")

        }
        else if(perc>=75&&perc<100){
            setBarColor("rgba(255, 107, 94, 0.7)")
        }
        else if(perc>=100){
            setBarColor("rgba(255,0,0,0.7)")
        }
        console.log(barColor)
    }
    const getBarWidth=()=>{
        const barWidth = Math.floor(((perc/100)*200))
        barWidth < 200 ? setBarWidth(barWidth) : setBarWidth(220)
        
        console.log(barWidth);
    }
    useEffect(()=>{
        const percentage = Math.trunc((removeCommas(spent)/removeCommas(goal))*100)
        console.log(percentage)
        setPerc(percentage);
        
    },[])
    useEffect(()=>{
        getBarColor()
        getBarWidth()
    },[perc])
    return(
        <View>
            <View style={[styles.progressBox,HomeScreenStyles.boxes]}>
                <Text style={HomeScreenStyles.boxTitle}>Weekly Progress</Text>
                <View style={styles.container}>
                    <View style={styles.top}>
                        {/* top */}
                        <View style={[styles.rightLeft,styles.left]}>
                            <Text style={styles.percentage}>{perc}%</Text>
                            <Text style={{textAlign:"center",verticalAlign:"middle"}}>Used</Text>
                        </View>
                        <View style={[styles.rightLeft,styles.right]}>
                            {/* right */}
                            <View style={{flexDirection:"column"}}>
                                {/* right top */}
                                <Text style={{color:"#190933",fontSize:12}}>Used this week: </Text>
                                <Text style={[styles.values,{color:"#ca1818"}]}>MWK {spent}</Text>
                            </View>
                            <View style={{flexDirection:"column"}}>
                                {/* right bottom */}
                                <Text style={{fontSize:12,color:"#190933"}}>Weekly target: </Text>
                                <Text style={styles.values}>MWK {goal}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        {/* bottom */}
                        <View style={[styles.backgroundBar,styles.bothBars]}/>
                        <View style={[styles.bar,styles.bothBars,{backgroundColor:barColor,width:barWidth}]}/>
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
        width:200,
        position:"relative",
        bottom:5,
        left:14,
    },
    percentage:{
        height:85,
        //borderWidth:1,
        fontSize:32,
        width:105,
        textAlign:"center",
        verticalAlign:"middle",
    }


})