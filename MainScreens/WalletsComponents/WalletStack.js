import { createStackNavigator } from "@react-navigation/stack";
import WalletScreen from "./WalletsScreen";
import AddMoney from './AddMoney'
import AddWallet from './AddWallet'
import { Pressable } from "react-native";
import externalStyles from '../../CustomModules/generalStyles'
import {BalancesRefreshContext} from '../../CustomModules/Contexts'

export default function WalletStack(){
    const Stack = createStackNavigator()
    return(
        <Stack.Navigator>
            <Stack.Screen name="walletBalances" component={WalletScreen} options={{
                headerTitle:"Balances",
                headerStyle:externalStyles.screenHeader,
            }}/>
            <Stack.Screen name="AddMoney" component={AddMoney} options={{
                   headerTitle:"Balances",
                   headerStyle:externalStyles.screenHeader,
            }}/>
            <Stack.Screen name="AddWallet" component={AddWallet} options={{
                headerTitle:"Add Wallets",
                headerStyle:externalStyles.screenHeader,
            }}/>
        </Stack.Navigator>
    )
}