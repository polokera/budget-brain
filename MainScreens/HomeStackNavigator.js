import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "./HomeScreenComponents/HomeScreen";
import { StyleSheet } from "react-native";
import { Avatar } from 'react-native-paper';
import Transactions from "./TransactionsComponents/Transactions";

export default function HomeStackNavigator(){
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} options={{
                headerStyle:styles.screenHeader,
                headerRight:()=>{
                    return <Avatar.Text size={24} label="XD" style={styles.avatar}/>
                }
            }}/>
            <Stack.Screen name="Transaction" component={Transactions} options={{
                headerTitle:"Add a transaction"
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
    screenHeader:{
        backgroundColor:"#fff",
        elevation:7,
        borderRadius:22.5,        
    },
    avatar:{
        backgroundColor:"#ffe3e3",
        marginRight:10,
        width:45,
        height:45,
        borderRadius:30,
    }
});
