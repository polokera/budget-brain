import { FlatList,StyleSheet,View,Text } from "react-native";
import { useEffect, useState } from "react";
import * as Datefns from 'date-fns';


export default function TransactionBox({item}){
   const [dateToShow,setDateToShow] = useState(null);
   const[timeToShow,setTimeToShow] = useState(null);
   const fixDates=()=>{
    const cleanDate = Datefns.parse(item.transDate,"yyyy-MM-dd",new Date())
    if(Datefns.isToday(cleanDate)){
        setDateToShow("Aujourd'hui")
        //change to english
    }
    else if(Datefns.isYesterday(cleanDate)){
        setDateToShow("Hier")
        //change to english
    }
    else if(Datefns.isThisWeek(cleanDate)){
        //console.log(Datefns.getDay(cleanDate))
        switch (Datefns.getDay(cleanDate)) {
            case 0:
                setDateToShow("Sunday")
                break;
            case 1:
                setDateToShow("Monday")
                break;
            case 2:
                setDateToShow("Tuesday")
                break;
            case 3:
                setDateToShow("Wednesday")
                break;
            case 4:
                setDateToShow("Thursday")
                break;
            case 5:
                setDateToShow("Friday")
                break;
            case 6:
                setDateToShow("Saturday")
                break;
            default:
                break;
        }
    }
    else{
        setDateToShow(Datefns.format(cleanDate,"dd/MM/yy"))
    }
   }

   const fixTimes=()=>{
    const cleanTime = Datefns.parse(item.transTime,"HHmm",new Date())
    const dateToday = Datefns.parse(item.transDate,"yyyy-MM-dd",new Date())
    if(Datefns.isToday(dateToday)){
        const timeNow = new Date()
        if(Datefns.isSameHour(cleanTime,timeNow)){
            const differenceInMinutes = Datefns.differenceInMinutes(timeNow,cleanTime)
            setTimeToShow(`${differenceInMinutes} minutes ago`)
        }
        else{
            const differenceInHours = Datefns.differenceInHours(timeNow,cleanTime)
            const string = differenceInHours>1 ? "hours" : "hour";
            setTimeToShow(`${differenceInHours} ${string} ago`)
        }
    }
    else{
        setTimeToShow(Datefns.format(cleanTime,"HH:mm"))
    }
   }

   useEffect(()=>{
    fixDates()
    fixTimes();
   },[])
    return(
        <View style={styles.transaction}>
           <View style={{flexDirection:"row"}}>
             <Text style={styles.transTitle}><Text></Text>{item.transTitle}</Text>
             <Text style={styles.transDate}>{dateToShow}</Text>
           </View>
            <View style={styles.transactionBottom}>
                <Text style={styles.transactionAmount}>MWK {item.amount}</Text>
                <Text style={styles.transactionTime}>{timeToShow}</Text>
            </View>
        </View>
    )
}


const styles=StyleSheet.create({
    transaction:{
        flexDirection:"column",
        backgroundColor:"#bdffff",
        paddingVertical:4,
        paddingHorizontal:7,
        width:250,
        marginHorizontal:7,
        marginVertical:5,
        borderRadius:10,
        height:70,
        elevation:4,
    },
    transactionBottom:{
        flexDirection:"row",
        //borderWidth:1,
        marginTop:15,
    },
    transactionAmount:{
        marginHorizontal:5,
        width:100,
        fontSize:14,
        // borderWidth:1,
    },
    transactionTime:{
        marginHorizontal:5,
        width:120,
        textAlign:"right",
        fontStyle:"italic",
        fontSize:12,
        //borderWidth:1,
    },
    transDate:{
        textAlign:"right",
        verticalAlign:"middle",
       //borderWidth:1,
        width:110,
        fontStyle:"italic",
        fontSize:11,
        color:"#838282"
    },
    transTitle:{
        fontWeight:"bold",
        fontSize:16,
    }
})