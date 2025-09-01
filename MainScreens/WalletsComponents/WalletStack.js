import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import WalletScreen from "./WalletsScreen";
import AddMoney from './AddMoney'

export default function WalletStack(){
    const Stack = createStackNavigator()
    return(
        <Stack.Navigator>
            <Stack.Screen name="walletBalances" component={WalletScreen} options={{
                headerShown:false,

            }}/>
            <Stack.Screen name="AddMoney" component={AddMoney} options={{
                headerShown:false,
            }}/>
        </Stack.Navigator>
    )
}