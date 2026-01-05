import { useEffect, useState } from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native'
import StylesInsights from './StylesInsights';
import openMyDatabase from '../../CustomModules/DbModule';
import generalStyles from '../../CustomModules/generalStyles';


export default function SpendingByWallet({timeFrame}){
    // const data = [
    //     {wName:"mpamba",amount:1000,walletId:1},
    //     {wName:"airtel money",amount:20000,walletId:2},
    //     {wName:"cheese",amount:260,walletId:3},
    //     // {wName:"fries",amount:8,walletId:4},
    //     // {wName:"fries",amount:8,walletId:5},
    //     // {wName:"fries",amount:8,walletId:6},
    //     // {wName:"fries",amount:8,walletId:7},
    //     // {wName:"fries",amount:8,walletId:8},
    // ]
    const [walletData,setWalletData] = useState([]);
    const [isLoading,setisLoading] = useState(false);

   
    const getWidth=(givenAmount)=>{
        const totalAmount = walletData.reduce((acc,cur)=>acc+Number(cur.totalExpenses),0);
        return (parseInt((givenAmount/totalAmount)*200));
    }
    const getTotal=()=>{
        return walletData.reduce((acc,cur)=>acc+Number(cur.totalExpenses),0);
    }
    useEffect(()=>{
        setisLoading(true)
        const loadWalletHistory=async()=>{
        try{
            const dbx = await openMyDatabase()
            const result = await dbx.getAllAsync(`select wallets.wName,SUM(transactions.amount) as totalExpenses,wallets.walletId as walletId 
                from wallets 
                inner join transactions
                on transactions.walletId=wallets.walletid
                where transactions.transSign=-1 
                AND transDate>= date("now","${timeFrame.value}") 
                GROUP BY wallets.wName
                `)
            setWalletData(result);
            console.log(result);
        }
        catch(e){
            console.log(e)
        }
        

        }
        loadWalletHistory();
        getWidth();
        setisLoading(false)
    },[timeFrame])
    if (isLoading) {
    return (
      <View style={generalStyles.main}>
        <Text>Loading loading</Text>
      </View>
    );
  }
    return(
        <View style={styles.main}>
            <Text style={StylesInsights.titleBox}>Spending By wallet</Text>
            <Text style={styles.total}>Total used: <Text style={{fontWeight:"bold"}}>MWK {getTotal()}</Text></Text>
            <View style={{backgroundColor:"#fff",elevation:4,borderRadius:3}}>
                {walletData.map((item)=>{
                return(
                    <View 
                    key={item.walletId}
                    style={styles.container}>
                        <Text style={styles.walletName}>{item.wName}:</Text>
                        <View style={[{width:getWidth(item.totalExpenses),backgroundColor:"green"},styles.bar]}>
                            <Text style={styles.barAmount}>MWK {item.totalExpenses}</Text>
                        </View>
                    </View>
                )
                })}
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    main:{
        padding:6,
        minHeight:230,
        paddingBottom:10,
        backgroundColor: "#fEEEEE",
        elevation:3,
        borderWidth:0.65,
        borderRadius:10,
    },
    container:{
        flexDirection:"row",
        margin:10,
        
    },
    walletName:{
        width:90,
        textAlign:"right",
        marginRight:10,
    },
    bar:{
        height:30,
        justifyContent:"center",
        elevation:3,
        borderRadius:3,
    },
    barAmount:{
        width:67,
        marginLeft:10,
        fontSize:10,
        backgroundColor:"#eeeeeeff",
        height:15,
        justifyContent:"center",
        textAlign:"center",
        elevation:2,
    },
    total:{
        // borderWidth:1,
        margin:5,
        textAlign:"right",
        // fontWeight:"bold",
    }
})