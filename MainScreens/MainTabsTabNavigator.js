import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import WalletScreen from "./WalletsComponents/WalletsScreen";
import WalletStack from "./WalletsComponents/WalletStack";
import Insights from './InsightsComponents/Insights'
import Settings from './SettingsComponents/Settings'
import { StyleSheet} from "react-native";
import externalStyles from '../CustomModules/generalStyles'
import { BalancesRefreshContext,RefreshFunctionContext } from "../CustomModules/Contexts";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";


export default function MainTabs(){
    const [refreshKey,setRefreshKey] = useState(0);
    //this is where all the main tabs will be
    const Tab = createBottomTabNavigator();
    return(
        <RefreshFunctionContext.Provider value={{refreshKey,setRefreshKey}}>
                <Tab.Navigator
                screenOptions={({route})=>({
                    tabBarIcon:({focused,color,size})=>{
                        let iconName;
                        if(route.name=="HomestackNav"){
                            iconName=focused?'home':'home-outline';
                        }
                        else if(route.name=='Settings'){
                            iconName=focused?'settings':'settings-outline'
                        }
                        else if(route.name=='Balances'){
                            iconName=focused?'wallet':'wallet-outline'
                        }
                        else if(route.name=='Settings'){
                            iconName=focused?'settings':'settings-outline'
                        }
                        else if(route.name=='Insights'){
                            iconName=focused?'stats-chart':'stats-chart-outline'
                        }
                        return<Ionicons name={iconName} size={size} color={color}/>
                    }
                })}
                >
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
        </RefreshFunctionContext.Provider>
    )
}


