import {View,StyleSheet,Text,StatusBar, Pressable,FlatList, TextInput} from 'react-native'
import { useEffect, useState } from 'react';
export default function WelcomeScreen({navigation,route}){
    const {wallets} = route.params;
    const [modifiedWallets,setModifiedWallets] = useState(wallets.map((wallet)=>{
        return {...wallet,initialAmount:0}
    }));
    const [selectedId,setSelectedId] = useState("")
    const [amount,setAmount] = useState(0)
    
    const onFocus =(id)=>{
        setSelectedId(id)
    }
    const onValueChange = (value)=>{
        setAmount(value)
    }
    useEffect(()=>{
        setModifiedWallets(prevWallets=>[...prevWallets].map((wallet)=>{
         return wallet.id == selectedId ? {...wallet,initialAmount:amount} : wallet 
        }))
       },[amount])   
    return(
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={styles.list}>
                    <FlatList
                    data={wallets}
                    renderItem={({item})=>{
                        return(
                            <View key={item.id} style={styles.wallet}>
                                <Text style={styles.walletName}>{item.wName}:</Text>
                                <TextInput 
                                defaultValue='0'
                                keyboardType='number-pad'
                                style={styles.input}
                                onFocus={()=>onFocus(item.id)}
                                onChangeText={(text)=>onValueChange(text)}/>
                            </View>
                        )
                    }}
                    />
                    <Pressable
                    style={styles.button}
                    onPress={()=>navigation.navigate("WeeklyGoalPage",modifiedWallets)}>
                        <Text>Submit</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        backgroundColor:"#fff5e0",
        flex:1,
    },
    container:{
        marginTop:10,
        alignItems:"center",
        flex:1,
    },
    list:{
        backgroundColor: "#fff",
        paddingHorizontal: 30,
        paddingVertical: 29,
        elevation: 3,
        borderRadius: 12,
        height: 450,
        width:300,
        alignItems:"center",
    },
    wallet:{
        flexDirection:"row",
        marginVertical:8,
    },
    input:{
        borderWidth:1,
        width:120,
        height:28,
        borderRadius:12,
        padding:0,
        paddingHorizontal:6,
    },
    walletName:{
        width:100,
        marginRight:20,
    },
    button:{
        backgroundColor: "#ee9e8e",
        borderRadius: 15,
        marginTop: 20,
        width: 120,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    }

})