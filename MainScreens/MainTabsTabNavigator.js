import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import { StyleSheet} from "react-native";


export default function MainTabs(){
    //this is where all the main tabs will be
    const Tab = createBottomTabNavigator();
    return(
        <Tab.Navigator>
            <Tab.Screen name="HomestackNav" component={HomeStackNavigator} options={{
                headerShown:false,
            }}/>
        </Tab.Navigator>
    )
}


