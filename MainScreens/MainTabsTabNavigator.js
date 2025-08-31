import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import WalletScreen from "./WalletsComponents/WalletsScreen";
import Insights from './InsightsComponents/Insights'
import Settings from './SettingsComponents/Settings'
import { StyleSheet} from "react-native";
import externalStyles from '../CustomModules/generalStyles'


export default function MainTabs(){
    //this is where all the main tabs will be
    const Tab = createBottomTabNavigator();
    return(
        <Tab.Navigator>
            <Tab.Screen name="HomestackNav" component={HomeStackNavigator} options={{
                headerShown:false,
                tabBarLabel:"Home",
            }}/>
            <Tab.Screen name="WalletsScreen" component={WalletScreen} options={{
                headerStyle:externalStyles.screenHeader,
                tabBarLabel:"Wallets",
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
    )
}


