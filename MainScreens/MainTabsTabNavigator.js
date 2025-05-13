import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from './HomeScreen'
import { StyleSheet} from "react-native";
export default function MainTabs(){
    //this is where all the main tabs will be
    const Tab = createBottomTabNavigator();
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerStyle:{
                    backgroundColor:"#fff5e0",
                    elevation:4,
                }
            }}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

