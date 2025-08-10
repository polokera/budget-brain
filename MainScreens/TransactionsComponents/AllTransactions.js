import {View,Text,StyleSheet, FlatList, Pressable} from "react-native"
import openDatabase from "../../CustomModules/DbModule"
import externalStyles from '../../CustomModules/generalStyles'
import { useState,useEffect } from "react"
import { AddComas, fixDates,fixTimes } from "../../CustomModules/generalModules"
import FilterIcon from '@expo/vector-icons/FontAwesome'
import FilterPopUp from './FilterPopUp'
import { format } from "date-fns"

export default function AllTransactions({route}){
    const {wallets} = route.params;
    const [loading,setLoading] = useState(false)
    const [filterPopUpVisible,setFilterPopUpVisible] = useState(false)
    const [transactions,setTransactions] = useState([])
    const [filteredTransactions,setFilteredTransactions] = useState(null)
    const [filters,setFilters] = useState(
        {
           minAmount:"",
           maxAmount:"",
           transSign:{label:"All",value:0},
           startDate:"2025-05-08T10:02:00.000Z",
           endDate:new Date(),
           categories:["Education","Groceries","Food","Zinjoyi","Bills & Membership","Religious fees","others....","Loans repayment"],
           wallets:wallets.map((w)=>w.wName),
        }
    )
   
    const filterFunc = async()=>{
        try
        {
            const fixedStartDate = format(filters.startDate,"yyyy-MM-dd")
            const fixedEndDate = format(filters.endDate,"yyyy-MM-dd")
            const fixedMinimum = filters.minAmount === "" ? 0 : filters.minAmount
            const fixedMaximum = filters.maxAmount === "" ? 999999999 : filters.maxAmount
            setLoading(true)
            const dbx = await openDatabase()
            const categoryList = filters.categories.map((cat)=>`'${cat.replace(/"/g,"'")}'`).join(",");
            const walletList = filters.wallets.map((wal)=>`'${wal.replace(/"/g,"'")}'`).join(",");
            const sql = `
            SELECT
            transactions.transId,transactions.transSign,transactions.transType,transactions.amount,transactions.transDate,transactions.transTime,transactions.transDescription,wallets.themeColor,wallets.wName
            FROM transactions INNER JOIN wallets
            ON transactions.walletId = wallets.walletId
            where
            transactions.transSign != ${filters.transSign.value} 
            and transactions.amount >= ${fixedMinimum} and
            transactions.amount <= ${fixedMaximum}
            and
            transactions.transDate >= '${fixedStartDate}'
            and
            transactions.transDate <= '${fixedEndDate}' 
            and
            transactions.transType IN (${categoryList})
            and wallets.wName IN (${walletList})
            ORDER BY transactions.transDate desc,transactions.transTime desc
            limit 25
            `
            console.log(sql)
            const filteredTransactions = await dbx.getAllAsync(sql)
            setTransactions(filteredTransactions)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setLoading(false)
        }
        
    }
    useEffect(()=>{
        filterFunc()  
    },[filters])
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
                setFilters={setFilters}
                filters={filters}
                visible={filterPopUpVisible}
                setVisible={setFilterPopUpVisible}
                wallets={wallets}
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
                        <View style={styles.transaction} key={item.transId}>
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