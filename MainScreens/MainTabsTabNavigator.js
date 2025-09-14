import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import WalletScreen from "./WalletsComponents/WalletsScreen";
import WalletStack from "./WalletsComponents/WalletStack";
import Insights from './InsightsComponents/Insights'
import Settings from './SettingsComponents/Settings'
import { StyleSheet} from "react-native";
import externalStyles from '../CustomModules/generalStyles'
import { BalancesRefreshContext } from "../CustomModules/Contexts";
import { useState } from "react";


export default function MainTabs(){
    const [balanceRefreshKey,setBalanceRefreshKey] = useState(0)
    //this is where all the main tabs will be
    const Tab = createBottomTabNavigator();
    return(
        <BalancesRefreshContext.Provider value={{balanceRefreshKey,setBalanceRefreshKey}}>
            <Tab.Navigator>
                <Tab.Screen name="HomestackNav" component={HomeStackNavigator} options={{
                    headerShown:false,
                    tabBarLabel:"Home",
                }}/>
                <Tab.Screen name="Balances" component={WalletStack} options={{
                    headerShown:false,
                    headerStyle:externalStyles.screenHeader,
                    tabBarLabel:"Balances",
                }}/>
                <Tab.Screen name="Insights" component={Insights} options={{
                    headerStyle:externalStyles.screenHeader,
                    tabBarLabel:"Insights",
                }}/>
                <Tab.Screen name="Settings" component={Settings} options={{
                    headerStyle:externalStyles.screenHeader,
                    tabBarLabel:"Settings",
                }}/>
            </Tab.Navigator>
        </BalancesRefreshContext.Provider>
            
    )
}


