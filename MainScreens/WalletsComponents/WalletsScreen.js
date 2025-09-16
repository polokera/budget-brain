import {View,Text,StyleSheet,FlatList, Pressable} from "react-native"
import { useState,useEffect, useContext } from "react"
import externalStyles from '../../CustomModules/generalStyles'
import { AddComas } from "../../CustomModules/generalModules"
import Entypo from '@expo/vector-icons/Entypo';
import openDatabase from "../../CustomModules/DbModule";
import { RefreshFunctionContext } from "../../CustomModules/Contexts";

export default function WalletScreen({navigation}){
    const {refreshKey} = useContext(RefreshFunctionContext);
    const [wallets,setWallets]=useState([])
    const goToAddMoneyPage=(item)=>{
        console.log(item," is your wallet")
        navigation.navigate("AddMoney",{
            wltId:item.walletId,
            wName:item.walletName,
        })
    }
    const getWallets=async()=>{
       try{
         const dbx = await openDatabase();
         const wallets = await dbx.getAllAsync(`SELECT wName,balance,themeColor,walletId from wallets`);
         setWallets(wallets);
        }
        catch(e){
            console.log(e);
        }

    }
    const onButtonPress=()=>{
        navigation.navigate("AddWallet",{
            wallets:wallets,
        })
    }
    useEffect(()=>{
        const initialise=async()=>{
            await getWallets();
        }
        initialise();

    },[refreshKey])
    return(
        <View style={externalStyles.main}>
            <View style={styles.container}>
              <FlatList
                style={styles.list}
                data={wallets}
                ListFooterComponentStyle={{marginBottom:80,}}
                ListFooterComponent={
                //this is the button that you press when you 
                // want to add a new wallet>
                <Pressable onPress={onButtonPress}>
                    <View style={styles.addNewWallet}>
                        <Entypo name="plus" size={34} color="gray" />
                        <Text style={styles.addNewWalletText}> Add a new wallet</Text>
                    </View>
                </Pressable>
                
            }
                renderItem={({item})=>{
                    return(
                        <View style={styles.wallet} key={item.walletId}>
                            <View style={styles.left}>
                                <Text style={styles.walletName}>{item.wName}</Text>
                                <Text style={styles.balance}>
                                    <Text style={{fontWeight:"bold",fontSize:16.1}}>MWK </Text> 
                                    {AddComas(item.balance)}
                                </Text>
                            </View>
                            <View style={{justifyContent:"center"}}>
                                <Pressable 
                                onPress={()=>goToAddMoneyPage(item)}
                                style={[styles.addButton,{backgroundColor:item.themeColor}]}>
                                    <Text style={{fontSize:35}}>+</Text>
                                </Pressable>   
                            </View>
                        </View>
                    )
                }}
              />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
    },
    list:{
        backgroundColor:"#eefbfbff",
        padding:10,
        borderRadius:9,
        marginBottom:50,
        borderWidth:0.4,
        paddingTop:48,
    },
    wallet:{
        backgroundColor:"#fffcfcff",
        width:265,
        marginVertical:4,
        borderRadius:5,
        padding:7,
        flexDirection:"row",
        elevation:3,
    },
    left:{
        width:"70%",
    },
    addButton:{
        width:55,
        height:55,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center",
        elevation:6,
    },
    walletName:{
        fontStyle:"italic",
        fontSize:21,
        paddingBottom:12,
    },
    balance:{
        fontSize:16,
        paddingBottom:10,
    },
    addNewWallet:{
        backgroundColor:"#fffcfcff",
        width:265,
        marginVertical:4,
        borderRadius:5,
        padding:7,
        flexDirection:"row",
        borderStyle:"dashed",
        borderWidth:1,
        height:70,
        textAlign:"center",
        alignItems:"center",
        elevation:3,
    },
    addNewWalletText:{
        fontSize:22,
        color:"gray",
    }
})