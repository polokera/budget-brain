import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './welcomeScreens/WelcomeScreen';
import Signup from './welcomeScreens/signup'
import Wallets from './welcomeScreens/wallets'
import Details from './welcomeScreens/FinancialDetails'
import WeeklyGoalPage from './welcomeScreens/WeeklyGoalPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainTabs from './MainScreens/MainTabsTabNavigator';
import {View,Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialIcons,Ionicons, FontAwesome, Entypo, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import { DeviceEventEmitter } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
    ...MaterialIcons.font,
    ...FontAwesome.font,
    ...Entypo.font,
    ...MaterialCommunityIcons.font,
    ...FontAwesome6.font,
  })
  const [isUserSignedUp,setIsUserSignedUp] = useState(null)
  const Stack = createStackNavigator()
  const isSignedUp = async ()=>{
    try{
      const SignedUp = await AsyncStorage.getItem('isSignedUp')
      console.log(SignedUp)
      if(SignedUp === null){
        await AsyncStorage.setItem('isSignedUp', "false")
        console.log("user is not signed up")
        setIsUserSignedUp(false)
      }
      else if(SignedUp === "true"){
        setIsUserSignedUp(true)
        console.log("user is signed up")
      }
      else{
        setIsUserSignedUp(false)
        console.log("user is  not  signed up I think")
      }
    }
    catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    const loadApp = async () => {
      try {
        await isSignedUp()
      } catch(e) {
        console.log(e)
      } finally {
        if(fontsLoaded) {
          await SplashScreen.hideAsync()
        }
      }
    }
    
    if(fontsLoaded) {
      loadApp()
    }
  },[fontsLoaded])

  useEffect(()=>{
    const subscription = DeviceEventEmitter.addListener('userLoggedOut',()=>{
      setIsUserSignedUp(false);
    })

    return ()=> subscription.remove()
  },[])
  if(!fontsLoaded || isUserSignedUp === null){
    return null;
  }
  // if()
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style='dark' hidden={false}/>
        <Stack.Navigator>
          {isUserSignedUp===true?
          (<Stack.Screen name='Main Tabs' component={MainTabs}
          options={{
            headerShown:false,
            headerStyle:{
              backgroundColor:"#fff5e0",
              elevation:0,
            },
          }}/>):(
          <>
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
            <Stack.Screen name='WeeklyGoalPage' options={{
              headerShown:false,
              gestureEnabled:false,
            }}>
              {(props)=><WeeklyGoalPage
              {...props}
              setIsUserSignedUp={setIsUserSignedUp}
              />}
            </Stack.Screen>
          </>
          )
          }
          
          
        </Stack.Navigator>
     </NavigationContainer>
    </PaperProvider>
    
  );
}
