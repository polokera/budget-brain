import {View,StyleSheet,Text} from 'react-native'
import { PieChart } from 'react-native-gifted-charts'
import Legend from './Legend'
import StylesInsights from './StylesInsights'
import openMyDatabase from '../../CustomModules/DbModule'
import { useEffect, useState, useContext } from 'react'
import { getRandColor } from '../../CustomModules/generalModules'
import { RefreshFunctionContext } from '../../CustomModules/Contexts'

export default function Categories({timeFrame}){
    // const data = [
    //     {text:"fries",value:4,walletId:4,color:"green"},
    //     {text:"fries",value:8,walletId:5,color:"red"},
    //     {text:"fries",value:25,walletId:6,color:"blue"},
    //     {text:"fries",value:18,walletId:7,color:"orange"},
    //     {text:"fries",value:3,walletId:8,color:"brown"},
    // ]
    const {refreshKey} = useContext(RefreshFunctionContext)
    const [data,setData] = useState([])
    const loadChartData=async()=>{
        try{
            const dbx = await openMyDatabase();
            const result = await dbx.getAllAsync(`select
                transType as text,SUM(amount) as value,transId
                from transactions
                where transDate >= date("now","${timeFrame.value}")
                GROUP BY transtype
            `)
            console.log(result," is the result");
            const formattedData = result.map((categ)=>{
                return {...categ,color:getRandColor()}
            })
            setData(formattedData);
        }
        catch(e){
            console.error(e)
        }
        finally{
            
        }
        
    }
    useEffect(()=>{
        loadChartData();
    },[timeFrame.value,refreshKey])
    return(
        <View style={styles.mainContent}>
            <Text style={StylesInsights.titleBox}>Spending by Category</Text>
            <PieChart data={data} textSize={10}/>
            <Legend categories={data}/>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContent:{
        backgroundColor:"#e0fbfb",
        padding:6,
        // height:230,
        paddingBottom:10,
        borderRadius:10,
        elevation:3,
        borderWidth:0.65,
        marginVertical:25,
        alignItems:"center"
    }
})