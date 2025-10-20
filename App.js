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
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialIcons,Ionicons, FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
    ...MaterialIcons.font,
    ...FontAwesome.font,
    ...Entypo.font,
    ...MaterialCommunityIcons.font
  })
  const [isUserSignedUp,setIsUserSignedUp] = useState(true)
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
    isSignedUp()
  },[isUserSignedUp])
  if(isUserSignedUp===null){
    return(
      //replace this with a proper loading screen
      <View>
        <Text>Loading by central cee!</Text>
      </View>
    )
  }
  if(!fontsLoaded){
    return null;
  }
  if(new Date()>new Date("2025-11-01"))
  return(
    <View style={{justifyContent:"center",alignItems:"center",flex:1,padding:50}}>
      <Text>Thank you for testing my app ❤, the testing period is now over. 
        If you'd like to join my team(I want a team🤣) or are just interested in the process dm me lol 
        And if you have reached this far please share feedback on your experience on the app both 
        good or bad especially bad so that I can make it better!
      </Text>
      <Text>
        thanks,
        -common person William Polokera.
      </Text>
    </View>
  )
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
