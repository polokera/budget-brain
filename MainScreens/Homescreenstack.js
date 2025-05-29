 import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "./HomeScreenComponents/HomeScreen"

export default function HomeScreenStack(){
    const Stack = createStackNavigator()
     return(
         <Stack.Navigator>
            <Stack.Screen component={HomeScreen} name="HomeScreen"/>*/
         </Stack.Navigator>

     )
}
