import {View,Text,StyleSheet,FlatList, Pressable,TextInput} from "react-native"
import { useState,useEffect, useContext } from "react"
import externalStyles from '../../CustomModules/generalStyles'
import { AddComas, removeCommas } from "../../CustomModules/generalModules"
import { useForm,Controller } from "react-hook-form"
import openMyDatabase from "../../CustomModules/DbModule"
import { BalancesRefreshContext, RefreshFunctionContext } from "../../CustomModules/Contexts"
import Popup from "../../CustomModules/Popup"

export default function WalletScreen({navigation,route}){
    const {setRefreshKey} = useContext(RefreshFunctionContext) 
    const [popUpDetails,setPopUpDetails] = useState({title:"Marizu",visible:false,message:"Noone and nothing",success:true,})
    const hidePopUp=()=>{
        setPopUpDetails({...popUpDetails,visible:false});
    }
    const goBackwards=()=>{
        navigation.goBack()
    }
    const getRandColor=()=>{
         return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6,'0')}`
    }
    const {control,handleSubmit,formState:{errors}} = useForm({
        defaultValues:{
            amountInWallet:"",
        }
    });
    const onSubmit=async(data)=>{
       const {amountInWallet,walletName} = data;
       const randomColor = getRandColor();
        try{
            const dbx = await openMyDatabase();
            const numberOfWallets = await dbx.getFirstAsync(`SELECT COUNT(*) FROM wallets`);
            console.log(amountInWallet==undefined?0:removeCommas(amountInWallet));
            await dbx.runAsync(`INSERT INTO wallets(walletId,wName,balance,themeColor)VALUES(?,?,?,?)`,[numberOfWallets["COUNT(*)"]+100,walletName,amountInWallet==undefined?0:removeCommas(amountInWallet),randomColor])
      
            setRefreshKey(r=>r+3);
            //this refreshes the home screen and wallets page
            
            setPopUpDetails({...popUpDetails,visible:true,message:`The Wallet '${walletName}' was successfully added!`,success:true})
            console.log("Successfull added new wallet");
        }
        catch(e){
            console.log(e)
            setPopUpDetails({...popUpDetails,visible:true,message:"There was an error!",success:false})            
        }
    }
    return(
        <View style={externalStyles.main}>
            <Popup 
            visible={popUpDetails.visible}
            title={popUpDetails.title}
            message={popUpDetails.message}
            success={popUpDetails.success}
            hide={hidePopUp}
            goBack={goBackwards}
            />
            <View style={styles.container}>
                <View style={styles.list}>
                    <Text style={styles.text}>Name of your new wallet?</Text>
                    <Controller
                    name="walletName"
                    rules={{required:"Please enter the name of the wallet",maxLength:{value:20,message:"Wallet name should be at most 20 characters."}}}
                    control={control}
                    render={({field})=>
                        <TextInput
                            value={field.value}
                            onChangeText={field.onChange}
                            keyboardAppearance="dark"
                            style={[styles.input,externalStyles.input]}
                        /> 
                    }
                    />
                    {errors.walletName&&<Text style={{color:"red",textAlign:"center"}}>{errors.walletName.message}</Text>}
                    <Text style={styles.text}>How much do you currently have in your wallet?</Text>
                    <Controller
                    name="amountInWallet"
                    control={control}
                    render={({field})=>
                        <TextInput
                        value={AddComas(field.value)}
                        onChangeText={field.onChange}
                        keyboardType="number-pad"
                        placeholder="0"
                        style={[styles.input,externalStyles.input,styles.descriptionInput]}
                        />}
                    />
                    <Pressable 
                    onPress={handleSubmit(onSubmit)}
                    style={[externalStyles.button,styles.button]}>
                        <Text>Add Wallet</Text>
                    </Pressable>
                </View>
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
        backgroundColor:"#eefbfb",
        padding:10,
        paddingTop:28,
        borderRadius:9,
        marginBottom:50,
        borderWidth:0.4,
        width:300,
    },
    input:{
        width:200,
        height:40,
        marginVertical:15,
        paddingHorizontal:10,
    },
    button:{
        width:100,
        height:40,
        alignSelf:"center",
        margin:14,
    },
    text:{
        fontSize:19,
        fontWeight:"bold",
    }
    // left:{
    //     width:"70%",
    // },
    // walletName:{
    //     fontStyle:"italic",
    //     fontSize:21,
    //     paddingBottom:12,
    // },
    // balance:{
    //     fontSize:16,
    //     paddingBottom:10,
    // },
    // accountName:{
    //     fontSize:24,
    // },
    // descriptionText:{
    //     fontSize:15,
    //     margin:10,
    // },
    // input:{
    //     width:200,
    //     height:40,
    //     alignSelf:"center",
    //     borderRadius:3,
    //     margin:14,
    //     paddingHorizontal:10,
    // },
    // descriptionInput:{
    //     height:100,
    //     textAlignVertical:"top"
    // },
    //
    // fieldName:{
    //     fontSize:14,
    //     fontWeight:"bold",
    // }
})
