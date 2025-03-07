import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './welcomeScreens/WelcomeScreen';
import Signup from './welcomeScreens/signup'
import Wallets from './welcomeScreens/wallets'
import Details from './welcomeScreens/FinancialDetails'
import WeeklyGoalPage from './welcomeScreens/WeeklyGoalPage';

export default function App() {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
