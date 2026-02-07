import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "./HomeScreenComponents/HomeScreen";
import { StyleSheet } from "react-native";
import { Avatar } from 'react-native-paper';
import Transactions from "./TransactionsComponents/Transactions";
import Troubleshooting from "../Troubleshooting";
import AllTransactions from "./TransactionsComponents/AllTransactions";
import { useState } from "react";
import externalStyles from '../CustomModules/generalStyles'

export default function HomeStackNavigator(){
    const Stack = createStackNavigator();
    return(
    
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} options={{
                headerStyle:externalStyles.screenHeader,
            }}/>

            <Stack.Screen name="Transaction" component={Transactions} options={{
                headerStyle:externalStyles.screenHeader,
                headerTitle:"Add a transaction"
            }}/>
            <Stack.Screen name="Troubleshooting" component={Troubleshooting} options={{
                headerTitle:"Troubleshooting"
            }}/>
            <Stack.Screen name="TransHistory" component={AllTransactions} options={{
                headerStyle:externalStyles.screenHeader,
                headerTitle:"Transaction History"
            }}/>
        </Stack.Navigator>
    
        

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    avatar:{
        backgroundColor:"#ffe3e3",
        marginRight:10,
        width:45,
        height:45,
        borderRadius:30,
    }
});
