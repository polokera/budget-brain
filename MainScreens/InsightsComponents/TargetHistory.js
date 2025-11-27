import {View,StyleSheet,Text, FlatList} from 'react-native'
import {useState,useEffect} from 'react'
import {parse,format} from "date-fns"
import { AddComas } from '../../CustomModules/generalModules'
import openMyDatabase from '../../CustomModules/DbModule'

export default function TargetHistory(){
    const [history,setHistory] = useState([])
    const [loading,setIsLoading] = useState(false)
    const getHistory=async()=>{
        const dbx = await openMyDatabase()
        const weekHistory = await dbx.getAllAsync(`SELECT * FROM weeks LIMIT 52`);
        setHistory(weekHistory)

    }
    const loadHistory=async()=>{
        setIsLoading(true)
        await getHistory()
        setIsLoading(false)
    }
    useEffect(()=>{
       loadHistory()
    },[])

    const getPercentageColor=(spent,target)=>{
        const percentage = (spent/target)*100;
        if(percentage<50){
            return "green"
        }
        if(percentage>=50 && percentage <75){
            return "yellow"
        }
        if(percentage>=75 && percentage<100){
            return "orange"
        }
        if(percentage>100){
            return "red"
        }
    }

    const getFormattedDate=(oldDate)=>{
       const date = parse(oldDate,"yyyy-MM-dd",new Date())
       return format(date,"dd MMM yy");
    }
    if(loading){
        return(
            <View style={{justifyContent:"center",alignItems:"center"}}>
                <Text>Loadng by central cee.....</Text>
            </View>
        )
    }
    return(
        <View style={styles.container}>
           <View style={styles.header}>
            <Text style={[{width:"22%"},styles.headerText]}>Week{'\n'}starting</Text>
            <Text style={[{width:"22%"},styles.headerText]}>Target {'\n'}(MWK)</Text>
            <Text style={[{width:"22%"},styles.headerText]}>Spent {'\n'}(MWK)</Text>
            <Text style={[{width:"22%"},styles.headerText]}>Saved during week</Text>
           </View>
           <FlatList
            data={history}
            renderItem={({item})=>{
                return(
                    <View key={item.weekStart} style={styles.record}>
                        <Text style={[{width:"22%"},styles.item]}>{getFormattedDate(item.weekStart)}</Text>
                        <Text style={[{width:"22%"},styles.item]}>{AddComas(parseInt(item.weekTarget))}</Text>
                        <Text style={[{width:"22%"},styles.item]}>{AddComas(parseInt(item.weekSpent))}</Text>
                        <Text style={[styles.item,{width:"22%",borderRightWidth:0}]}>{AddComas((parseInt(item.weekTarget)-parseInt(item.weekSpent)))}</Text>
                        <Text style={[styles.percentage,{color:getPercentageColor(item.weekSpent,item.weekTarget)}]}>{parseInt((parseInt(item.weekSpent)/parseInt(item.weekTarget))*100)}%</Text>
                    </View>
                )
            }}
            ListEmptyComponent={<Text style={styles.emptyMessage}>No data to work with yet come back after sunday</Text>}
           />

        </View>
    )
}

const styles= StyleSheet.create({
    header:{
        flexDirection:"row",
        justifyContent:"center",
        borderBottomWidth:0.7,
    },
    container:{
        padding:6,
        height:450,
        paddingBottom:10,
    },
    headerText:{
        textAlign:"center",
        fontWeight:"bold",
    },
    record:{
        flexDirection:"row",
        backgroundColor:"#fdf5f4",
        height:50,
        marginVertical:6,
        justifyContent:"center",
        borderRadius:14,
        elevation:6,
        paddingVertical:6,
    },
    item:{
        textAlign:"center",
        verticalAlign:"middle",
        borderRightWidth:0.6,
        borderRightColor:"grey",
    },
    percentage:{
        position:"relative",
        fontSize:11,
        left:-94,
        bottom:-18,
    },
    emptyMessage:{
        marginTop:50,
        marginHorizontal:10,
        fontStyle:"italic",
        color:"#8b8b8bff",
    }
})
