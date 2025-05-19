import { FlatList,StyleSheet,View,Text } from "react-native";
import { useEffect, useState } from "react";
import * as Datefns from 'date-fns';


export default function TransactionBox({item}){
   const [dateToShow,setDateToShow] = useState(null);
   useEffect(()=>{
    const cleanDate = Datefns.parse(item.transDate,"yyyy-MM-dd",new Date())
    if(Datefns.isToday(cleanDate)){
        setDateToShow("Aujourd'hui")
        //change to english
    }
    else if(Datefns.isYesterday(cleanDate)){
        setDateToShow("Hier")
        //change to english
    }
    else{
        setDateToShow(Datefns.format(cleanDate,"dd/MM/yy"))
    }
   },[])
    return(
        <View style={styles.transaction}>
           <View style={{flexDirection:"row"}}>
             <Text style={styles.transTitle}><Text></Text>{item.transTitle}</Text>
             <Text style={styles.transDate}>{dateToShow}</Text>
           </View>
            <View style={styles.transactionBottom}>
                <Text style={styles.transactionAmount}>MWK {item.amount}</Text>
                <Text style={styles.transactionTime}>{item.transTime}</Text>
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
        width:80,
    },
    transactionTime:{
        marginHorizontal:5,
        width:100,
        textAlign:"right",
        fontStyle:"italic",
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