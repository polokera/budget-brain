import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './welcomeScreens/WelcomeScreen';
import Signup from './welcomeScreens/signup'
import Wallets from './welcomeScreens/wallets'
import Details from './welcomeScreens/FinancialDetails'
import WeeklyGoalPage from './welcomeScreens/WeeklyGoalPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MianTbas from './MainScreens/MainTabsTabNavigator'
import MainTabs from './MainScreens/MainTabsTabNavigator';

export default function App() {
  const [isUserSignedUp,setIsUserSignedUp] = useState(false)
  const Stack = createStackNavigator()
  const isSignedUp = async (value)=>{
    try{
      const isSignedUp = await AsyncStorage.getItem('isSignedUp')
      if(isSignedUp == null){
        await AsyncStorage.setItem('isSignedUp', false)
      }
      else if(isSignedUp == true){
        setIsUserSignedUp(true)
      }
      else{
        setIsUserSignedUp(false)
      }
    }
    catch(e){
      
    }
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isUserSignedUp?"Wallets":"Welcome"}>
        <Stack.Screen name='Welcome' component={WelcomeScreen} options={{
          headerShown:false,
        }}/>
        <Stack.Screen name='Sign up' component={Signup} options={{
          headerStyle:{
            backgroundColor:"#fff5e0",
            elevation:0,
          }
        }}/>
        <Stack.Screen name='Wallets' component={Wallets} options={{
          headerStyle:{
            backgroundColor:"#fff5e0",
            elevation:0,
          }
        }}/>
        <Stack.Screen name='Details' component={Details} options={{
          headerStyle:{
            backgroundColor:"#fff5e0",
            elevation:0,
          }
        }}/>
        <Stack.Screen name='WeeklyGoalPage' component={WeeklyGoalPage} options={{
          headerShown:false,
          gestureEnabled:false,
        }}/>
        <Stack.Screen name='Main Tabs' component={MainTabs}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
