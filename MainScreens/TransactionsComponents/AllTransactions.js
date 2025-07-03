import {View,Text,StyleSheet, FlatList, Pressable} from "react-native"
import openDatabase from "../../CustomModules/DbModule"
import externalStyles from '../../CustomModules/generalStyles'
import { useState,useEffect } from "react"
import { AddComas, fixDates,fixTimes } from "../../CustomModules/generalModules"
import FilterIcon from '@expo/vector-icons/FontAwesome'
import FilterPopUp from './FilterPopUp'

export default function AllTransactions(){
    const [loading,setLoading] = useState(false)
    const [filterPopUpVisible,setFilterPopUpVisible] = useState(true)
    const [transactions,setTransactions] = useState(
      [
        {"amount": 26000, "transDate": "2025-06-23", "transDescription": "Limoblazeeeeeee", "transId": 100, "transSign": -1, "transTime": "1650", "transType": "Food", "wName": "Mpamba", "themeColor": "#2fdb45",}, 
        {"amount": 55, "transDate": "2025-06-23", "transDescription": "Shayimoto", "transId": 101, "transSign": -1, "transTime": "1741", "transType": "Groceries", "wName": "National Bank", "themeColor": "#6985db",},
        {"amount": 55, "transDate": "2025-06-26", "transDescription": "One handshake from my brother and you just gotta wave me goodbye and give me love for the way", "transId": 102, "transSign": -1, "transTime": "1030", "transType": "Education",  "wName": "Airtel Money", "themeColor": "#f61f1f",}, 
        {"amount": 260, "transDate": "2025-06-23", "transDescription": "Limoblazeeeeeee", "transId": 103, "transSign": -1, "transTime": "1650", "transType": "Food", "wName": "Mpamba", "themeColor": "#2fdb45",}, 
        {"amount": 55, "transDate": "2025-06-23", "transDescription": "Shayimoto", "transId": 104, "transSign": -1, "transTime": "1741", "transType": "Groceries", "wName": "National Bank", "themeColor": "#6985db",},
        {"amount": 55, "transDate": "2025-06-26", "transDescription": "", "transId": 105, "transSign": -1, "transTime": "1030", "transType": "Bills & Membership",  "wName": "Airtel Money", "themeColor": "#f61f1f",}, 
        {"amount": 260, "transDate": "2025-06-23", "transDescription": "Limoblazeeeeeee", "transId": 106, "transSign": -1, "transTime": "1650", "transType": "Food", "wName": "Mpamba", "themeColor": "#2fdb45",}, 
        {"amount": 55, "transDate": "2025-06-23", "transDescription": "Shayimoto", "transId": 107, "transSign": -1, "transTime": "1741", "transType": "Groceries", "wName": "National Bank", "themeColor": "#6985db",},
        {"amount": 55, "transDate": "2025-06-26", "transDescription": "", "transId": 108, "transSign": -1, "transTime": "1030", "transType": "Education",  "wName": "Airtel Money", "themeColor": "#f61f1f",}, 
    ]
    )
    const [filteredTransactions,setFilteredTransactions] = useState(null)
    const [filters,setFilters] = useState(
        {
           minAmount:0,
           maxAmount:1000000,
           transSign:1,
           startDate:"2025-06-23",
           endDate:"2025-06-29",
           categories:["Education"],
        }
    )
    const filterFunc =()=>{
        const filtered = transactions.filter((transaction)=>{
            const date = new Date(transaction.transDate)
            const start = new Date(filters.startDate)
            const end = new Date(filters.endDate)
            if(transaction.amount < filters.minAmount)
                return false
            if(transaction.amount > filters.maxAmount)
                return false
            if(transaction.transSign == filters.transSign)
                return false;
            if(!filters.categories.includes(transaction.transType))
                return false;
            if(date<start || date>end)
                return false
            return true
        })
        setFilteredTransactions(filtered)
    }
    if(loading){
        return(
            <View style={externalStyles.main}>
                <Text>loading by central cee</Text>
            </View>
        )
    }
    return(
        <View style={[externalStyles.main,styles.main]}>
            <View style={styles.container}>
                <FilterPopUp
                visible={filterPopUpVisible}
                setVisible={setFilterPopUpVisible}
                />
                <Pressable onPress={()=>setFilterPopUpVisible(true)}>
                    <View style={styles.filterButton}>
                        <FilterIcon name="filter" size={19} color="black"/>
                        <Text>   Filter</Text>
                    </View>
                </Pressable>
                
                <FlatList
                data={transactions}
                ListFooterComponent={<View style={{height:30,}}/>}
                renderItem={({item})=>{
                    return(
                        <View style={styles.transaction}>
                            <View style={styles.topRow}>
                                <Text style={styles.transType}>{item.transType}</Text>
                                <Text style={[styles.walletName,{color:item.themeColor}]}>{item.wName}</Text>
                            </View>
                            <Text style={[styles.amount,{color:item.transSign==-1?"tomato":"green"}]}><Text style={{fontWeight:"bold"}}> {item.transSign==-1&&"-"} MWK </Text>{AddComas(item.amount)}</Text>
                            {item.transDescription!==""?<Text style={styles.description}>{item.transDescription}</Text>:<Text style={[styles.description,{color:"#5c5b5b"}]}>No description</Text>}
                            <View style={styles.bottomRow}>
                                <Text style={styles.time}>{fixTimes(item.transTime,item.transDate)}</Text>
                                <Text style={styles.date}>{fixDates(item.transDate)}</Text>
                            </View>
                        </View>
                    )
                }}
                />   
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    main:{
        paddingHorizontal:26,
        paddingBottom:16,
    },
    container:{
        backgroundColor:"#eefbfb",
        paddingVertical:20,
        paddingHorizontal:15,
        borderWidth:0.5,
        borderRadius:8,
    },
    transaction:{
        backgroundColor:"#fff",
        elevation:4,
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:8,
        marginVertical:8,
    },
    topRow:{
        flexDirection:"row",
        marginBottom:10,
    },
    transType:{
        fontSize:25,
        fontWeight:"bold",
        width:"63%",
    },
    walletName:{
        width:"35%",
        textAlign:"right",
        borderRightWidth:2,
        borderTopRightRadius:2,
        borderBottomRightRadius:2,
        borderColor:"grey",
        padding:3,
    },
    amount:{
        width:"100%",
        textAlign:"right",
        fontSize:16
    },
    description:{
        minHeight:80,
        paddingHorizontal:6,
        paddingTop:5,
        backgroundColor:"#dde1ed",
        elevation:4,
        marginVertical:10,
    },
    bottomRow:{
        flexDirection:"row",
        marginBottom:10,
    },
    time:{
        width:"50%",
    },
    date:{
        width:"50%",
        textAlign:"right",
    },
    filterButton:{
        flexDirection:"row",
        width:100,
        alignSelf:"flex-end",
        paddingHorizontal:4,
        paddingVertical:5,
        marginVertical:6,
        backgroundColor:"#fff",
        elevation:3,
    }

})