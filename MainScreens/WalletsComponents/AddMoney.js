import {View,Text,StyleSheet,FlatList, Pressable,TextInput} from "react-native"
import { useState,useEffect, useContext } from "react"
import externalStyles from '../../CustomModules/generalStyles'
import { AddComas, removeCommas } from "../../CustomModules/generalModules"
import { useForm,Controller } from "react-hook-form"
import openDatabase from '../../CustomModules/DbModule'
import * as DateFns from "date-fns"
import Popup from "../../CustomModules/Popup"
import { RefreshFunctionContext } from "../../CustomModules/Contexts"

export default function WalletScreen({navigation,route}){
    const {setRefreshKey} = useContext(RefreshFunctionContext);
    const [popUpDetails,setPopUpDetails] = useState({visible:false,success:false,message:"Malawian Star",title:"King chadadi"})
    const {wltId,wName} = route.params;
    const {control,formState:{errors},handleSubmit} = useForm({
        defaultValues:{
            description:"",
            amountToAdd:"",
        }
    })
    const hidePopUp=()=>{
        setPopUpDetails({...popUpDetails,visible:false})
    }
    const onSubmit=async(data)=>{
        //when writing sql remove commas from amount to add.
        const dbx = await openDatabase();
        const date = DateFns.format(new Date(),"yyyy-MM-dd")
        const time = DateFns.format(new Date(),"HHmm")
        try{
            await dbx.withTransactionAsync(async()=>{
            const result = await dbx.getFirstAsync(`SELECT COUNT(*) from transactions`);
            const amount = Number(removeCommas(data.amountToAdd))
            const transId = result['COUNT(*)'] +100;
            await dbx.runAsync(`UPDATE wallets set balance = balance + ? where walletId = ?`,[amount,wltId])
            await dbx.runAsync(`INSERT into transactions(transId,walletId,transType,transDescription,amount,transDate,transTime,transSign)VALUES(?,?,?,?,?,?,?,?)`,[transId,wltId,"adding money",data.description,amount,date,time,1])
            console.log(wltId,"is your wallet id");
            setRefreshKey(r=>r+1);
            setPopUpDetails({message:`MWK ${AddComas(data.amountToAdd)} has been succesfully added to your ${wName} wallet`,success:true,title:"Success",visible:true})
            })
            
        }
        catch(e){
            console.log(e)
            setPopUpDetails({message:`There was an error`,success:false,title:"Error",visible:true})
        }
       
    }
    const goBackwards=()=>{
        navigation.goBack();
    }
    const onPress=()=>{
        console.log(cashAmount);
    }
    useEffect(()=>{
        
    },[])
    return(
        <View style={externalStyles.main}>
            <Popup
            visible={popUpDetails.visible}
            message={popUpDetails.message}
            success={popUpDetails.success}
            hide={hidePopUp}
            goBack={goBackwards}
            />
            <View style={styles.container}>
                <View style={styles.list}>
                    <Text style={styles.accountName}>{wName}</Text>
                    <Text style={styles.descriptionText}>How much money do you want to add to your {wName} account?</Text>
                    <Controller
                    name="amountToAdd"
                    rules={{required:"Please enter the amount you want to add"}}
                    control={control}
                    render={({field})=>
                        <TextInput
                            value={AddComas(field.value)}
                            onChangeText={field.onChange}
                            keyboardAppearance="dark"
                            placeholder="0"
                            keyboardType="number-pad"
                            style={[styles.input,externalStyles.input]}
                        /> 
                    }
                    />
                    {errors.amountToAdd&&<Text style={{color:"red",textAlign:"center"}}>{errors.amountToAdd.message}</Text>}
                    <Text style={styles.fieldName}>Description</Text>
                    <Controller
                    name="description"
                    control={control}
                    render={({field})=>
                        <TextInput
                        value={field.value}
                        onChangeText={field.onChange}
                        placeholder="(Optional)"
                        numberOfLines={5}
                        multiline
                        style={[styles.input,externalStyles.input,styles.descriptionInput]}
                        />}
                    />
                    <Pressable 
                    onPress={handleSubmit(onSubmit)}
                    style={[externalStyles.button,styles.button]}>
                        <Text>Add Money</Text>
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
    left:{
        width:"70%",
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
    accountName:{
        fontSize:24,
    },
    descriptionText:{
        fontSize:15,
        margin:10,
    },
    input:{
        width:200,
        height:40,
        alignSelf:"center",
        borderRadius:3,
        margin:14,
        paddingHorizontal:10,
    },
    descriptionInput:{
        height:100,
        textAlignVertical:"top"
    },
    button:{
        width:100,
        height:40,
        alignSelf:"center",
        margin:14,
    },
    fieldName:{
        fontSize:14,
        fontWeight:"bold",
    }
})
