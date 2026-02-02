import Settings from "./Settings";
import Feedback from "./Feedback";
import { createStackNavigator } from "@react-navigation/stack";
import AboutPage from "./AboutPage";


export default function SettingsStack(){
    const Stack = createStackNavigator()
    return(
        <Stack.Navigator>
            <Stack.Screen name='SettingsMain' component={Settings} options={{
                headerShown:false,
            }}/>
             <Stack.Screen name='Feedback' component={Feedback} options={{
                headerShown:false,
             }}/>
            <Stack.Screen name='About' component={AboutPage} options={{
                headerShown:false,
            }}/>
            {/*<Stack.Screen/> */}
        </Stack.Navigator>
    )
}