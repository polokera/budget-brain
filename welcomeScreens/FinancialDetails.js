import {View,StyleSheet,Text,StatusBar,Button, Pressable,FlatList, TextInput} from 'react-native'
import { use, useState } from 'react';
export default function WelcomeScreen({navigation,route}){
    const {wallets} = route.params;
    const modifiedWallets = wallets.map((wallet)=>{
        return {...wallet,initialAmount:0}
    })
    const [amount,setAmount] = useState(0)
    const setInitialAmount =(wallet)=>{
        const newWallets = [...wallets].map((wlt)=>
            wlt.id === wallet.id ? {...wallet,initialAmount:0} : wallet
        )
    }
    return(
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={styles.list}>
                    <FlatList
                    data={wallets}
                    renderItem={({item})=>{
                        return(
                            <View key={item.id} style={styles.wallet}>
                                <Text>{item.wName}</Text>
                                <TextInput 
                                keyboardType='number-pad'
                                style={styles.input}
                                value={amount} 
                                onChangeText={()=>setInitialAmount(item)}/>
                            </View>
                        )
                    }}
                    />
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
    },
    wallet:{
        flexDirection:"row",
    },
    input:{
        borderWidth:1,
        width:100,
        height:28,
        borderRadius:12,
        padding:0,
        paddingHorizontal:6,
    }

})