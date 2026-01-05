import {View,StyleSheet,Text, FlatList, Pressable} from 'react-native'
import {useState,useEffect, useContext} from 'react'
import {parse,format,getWeek} from "date-fns"
import { AddComas } from '../../CustomModules/generalModules'
import openMyDatabase from '../../CustomModules/DbModule'
import { RefreshFunctionContext } from '../../CustomModules/Contexts'
import FullTargetHistory from './ModalTgtHistory'
import StylesInsights from './StylesInsights'

export default function TargetHistory({timeFrame}){
    const [history,setHistory] = useState([])
    const [resizedHistory,setResizedHistory] = useState([]);
    const [popUpVisible,setPopUpVisible] = useState(false)
    const {refreshKey} = useContext(RefreshFunctionContext)
    const sqlByTimeFrame=()=>{
        return `SELECT * FROM weeks where weekStart>= date("now","${timeFrame.value}") ORDER BY weekId DESC LIMIT 52`
    }
    const getHistory=async()=>{ 
        try{
            const dbx = await openMyDatabase()
            const weekHistory = await dbx.getAllAsync(sqlByTimeFrame());
            console.log(weekHistory)
            const test = [
                {"weekId": 1, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 2, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 4, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 5, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 6, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 7, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 8, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 9, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 10, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 11, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 12, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 14, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 15, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 16, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 17, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 18, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 19, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
                {"weekId": 100, "weekSpent": 0, "weekStart": "2025-11-30", "weekTarget": 66800},
            ]
            setHistory(weekHistory)
            if(weekHistory.length>3){
                const rh = weekHistory.slice(0,3)
                setResizedHistory(rh);
                /* 
                    resized history because I wnt only 3 to be showing up
                    initially so it cuts the list to the 3 latest weeks
                */
            }
            else{
                setResizedHistory(weekHistory);
            }
        }
        catch(e){
            console.log(e)
        }
        finally{
            
        }
    }
    const loadHistory=async()=>{
        await getHistory()
    }
    useEffect(()=>{
       loadHistory()
    },[refreshKey,timeFrame.value])

    const getPercentageColor=(spent,target)=>{
        const percentage = (spent/target)*100;
        if(percentage<50){
            return "green"
        }
        if(percentage>=50 && percentage <75){
            return "#81890b"
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
    // if(loading){
    //     return(
    //         <View style={{justifyContent:"center",alignItems:"center"}}>
    //             <Text>Loadng by central cee.....</Text>
    //         </View>
    //     )
    // }
    return(
        <View style={styles.container}>
            <FullTargetHistory
            popUpVisible={popUpVisible}
            setPopUpVisible={setPopUpVisible}
            history={history}
            getFormattedDate={getFormattedDate}
            getPercentageColor={getPercentageColor}
            />
            <Text style={StylesInsights.titleBox}>Target History</Text>
            <View style={styles.header}>
                <Text style={[{width:"22%"},styles.headerText]}>Week{'\n'}starting</Text>
                <Text style={[{width:"22%"},styles.headerText]}>Target {'\n'}(MWK)</Text>
                <Text style={[{width:"22%"},styles.headerText]}>Spent {'\n'}(MWK)</Text>
                <Text style={[{width:"22%"},styles.headerText]}>Saved during week</Text>
            </View>
           {resizedHistory.map(item=>{
                return(
                    <View key={item.weekId} style={styles.record}>
                        <Text style={[{width:"22%"},styles.item]}>{getFormattedDate(item.weekStart)}</Text>
                        <Text style={[{width:"22%"},styles.item]}>{AddComas(parseInt(item.weekTarget))}</Text>
                        <Text style={[{width:"22%"},styles.item]}>{AddComas(parseInt(item.weekSpent))}</Text>
                        <Text style={[styles.item,{width:"22%",borderRightWidth:0}]}>{AddComas((parseInt(item.weekTarget)-parseInt(item.weekSpent)))}</Text>
                        <Text style={[styles.percentage,{color:getPercentageColor(item.weekSpent,item.weekTarget)}]}>{parseInt((parseInt(item.weekSpent)/parseInt(item.weekTarget))*100)}%</Text>
                    </View>
                )
           })}
           {
            history.length>3 &&
            <Pressable onPress={()=>setPopUpVisible(true)}>
                <Text style={styles.link}>see more...</Text>
           </Pressable>
           }
           
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
        // height:230,
        paddingBottom:10,
        backgroundColor:"#e0fbfb",
        elevation:3,
        borderWidth:0.65,
        borderRadius:10,
        marginVertical:25,
    },
    headerText:{
        textAlign:"center",
        fontWeight:"bold",
    },
    record:{
        flexDirection:"row",
        backgroundColor:"#fdf5f4",
        height:29,
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
        left:-90,
        bottom:-7,
    },
    emptyMessage:{
        marginTop:50,
        marginHorizontal:10,
        fontStyle:"italic",
        color:"#8b8b8bff",
    },
    link:{
        // borderWidth:1,
        textAlign:"right",
        marginTop:15,
        color:"#0000EE",
        textDecorationLine:"underline",
        paddingHorizontal:10,
    }
})
