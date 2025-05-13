import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useEffect, useState } from 'react';
import openDatabase from '../CustomModules/DbModule';
export default function HomeScreen(){
    //this is where all the main tabs will be
    const [wallets,setWallets] = useState([]);
    const [target,setTarget] = useState();
    const [isLoading,setIsLoading] = useState(true)
    const getWallets=async()=>{
        const dbx = await openDatabase()
        const maWallet = await dbx.getAllAsync(`SELECT * FROM wallets`);
        console.log(maWallet)
        setWallets(maWallet);
    }
    const deleteDB=async()=>{
        const dbx= await openDatabase();
        const result = await dbx.runAsync(`DELETE from wallets`)
        if(result.changes >0){
            console.log("wallets deleted");
        }
        const result2 = await dbx.runAsync(`DELETE from target`)
        if(result2.changes>0){
            console.log(`target table deleted`)
        }
    }
    const getTarget=async ()=>{
        const dbx = await openDatabase();
        const kaTarget = await dbx.getFirstAsync(`SELECT target from target`);
        setTarget(kaTarget.target)
        //console.log(kaTarget.target)
    }
    useEffect(()=>{
        setIsLoading(false)
    },[wallets])
    return(
        <View>
            <Text>Still under construction👷🏾</Text>
            <Button title='Press me'onPress={getWallets} />
            <Button title='Delete button'onPress={deleteDB} />
            <Button title='Get Target button'onPress={getTarget} />
            {isLoading?<Text>Presss button</Text>:
            <FlatList
            data={wallets}
            renderItem={({item})=>{
                return(
                    <View style={{flexDirection:"row"}}>
                        <Text> {item.id} </Text>
                        <Text> {item.wName} </Text>
                        <Text> {item.initialAmount} </Text>
                        <Text> {item.themeColor}</Text>
                    </View>
                )
            }}
            />
            }
            <Text>{target}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

