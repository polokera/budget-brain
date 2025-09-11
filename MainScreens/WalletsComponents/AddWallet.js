import {View,Text,StyleSheet,FlatList, Pressable,TextInput} from "react-native"
import { useState,useEffect } from "react"
import externalStyles from '../../CustomModules/generalStyles'
import { AddComas } from "../../CustomModules/generalModules"
import { useForm,Controller } from "react-hook-form"

export default function WalletScreen({route}){
    const {wallets} = route.params
    const getRandColor=()=>{
         return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6,'0')}`
    }
    const {control,handleSubmit,formState:{errors}} = useForm();
    const onSubmit=data=>console.log(data)
    return(
        <View style={externalStyles.main}>
            <View style={styles.container}>
                <View style={styles.list}>
                    <Text style={styles.text}>Name of your new account?</Text>
                    <Controller
                    name="walletName"
                    rules={{required:"Please enter the name of the wallet"}}
                    control={control}
                    render={({field})=>
                        <TextInput
                            value={AddComas(field.value)}
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
                        value={field.value}
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
