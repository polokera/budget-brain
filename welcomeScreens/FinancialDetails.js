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
        //when a user presses on a textbox we get the id of the corresponding 
        //bank wallet
        //this is step 1
        setSelectedId(id)
    }
    const onValueChange = (value)=>{
        //on each textbox
        //takes the value of the textbox and puts it in the Amount state variable
        //this it then used in the next function
        //this is step 2
        //this function formats content in the textbox, adds commas using regex.
        const numeric = value.replace(/[^0-9]/g,'');
        //removes all non numbers including commas
        const formatted = numeric.replace(/\B(?=(\d{3})+(?!\d))/g,",")
        //formats the values at this point there should be no previous commas 
        //if there are commas it wont work thats why we have to remove commas at first.
        setAmount(formatted)
    }
    useEffect(()=>{
        //*ON INITIAL RENDER*
        //wallets object from previous page come without "initialAmount" property
        //this adds initialAmount property plus default value of 0
        //*SUBSEQUENT RENDERS
        //from the previous step, there is a value in the amount stateful variable
        //this function changes the initialAmount to the value of the amount state variable
        // it does IF AN ONLY IF the wallet has the same id as the one we have from step 1.
        //all others remain untouched.
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
                                value={amount}
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