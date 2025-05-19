import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from './HomeScreen'
import { StyleSheet} from "react-native";
import { Avatar } from 'react-native-paper';

export default function MainTabs(){
    //this is where all the main tabs will be
    const Tab = createBottomTabNavigator();
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerStyle:styles.screenHeader,
                headerRight:()=>{
                    return <Avatar.Text size={24} label="XD" style={styles.avatar}/>
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
    screenHeader:{
        backgroundColor:"#fff",
        elevation:7,
        borderRadius:22.5,        
    },
    avatar:{
        backgroundColor:"#ffe3e3",
        marginRight:10,
        width:45,
        height:45,
        borderRadius:30,
    }
});

