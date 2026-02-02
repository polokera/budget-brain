import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import WalletScreen from "./WalletsComponents/WalletsScreen";
import WalletStack from "./WalletsComponents/WalletStack";
import Insights from './InsightsComponents/Insights'
import SettingsStack from "./SettingsComponents/SettingsStack";
import externalStyles from '../CustomModules/generalStyles'
import { RefreshFunctionContext } from "../CustomModules/Contexts";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";


export default function MainTabs(){
    const [refreshKey,setRefreshKey] = useState(0);
    const [settingsHeaderShown,setSettingsHeaderShown] = useState(true)

    //this is where all the main tabs will be
    const Tab = createBottomTabNavigator();
    return(
        /*
        RefreshFunctionContext was only supposed to have two props refreshkey and setrefreshkey
        but Ihad to drill one more function and i couldnt create another context and
        adding this function seemed like the best option for me so please allow its
        */
        <RefreshFunctionContext.Provider value={{refreshKey,setRefreshKey,setSettingsHeaderShown}}>
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
                        tabBarLabel:"Wallets",
                    }}/>
                    <Tab.Screen name="Insights" component={Insights} options={{
                        headerStyle:externalStyles.screenHeader,
                        tabBarLabel:"Insights",
                    }}/>
                    <Tab.Screen name="Settings" component={SettingsStack} options={{
                        headerStyle:externalStyles.screenHeader,
                        tabBarLabel:"Settings",
                        headerShown:setSettingsHeaderShown,
                    }}/>
                </Tab.Navigator>
        </RefreshFunctionContext.Provider>
    )
}


