import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
// import { useState, useEffect } from 'react';
// import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from './screens/auth/RegistrationScreen';
import LoginScreen from './screens/auth/LoginScreen';

const AuthStack = createStackNavigator();

export default function App() {
  // const [dimensions, setDimensions] = useState(
  //   Dimensions.get('window').width - 16 * 2
  // )
  
  // useEffect(() => {
  //   const onChangeWidth = () => {
  //     const width = Dimensions.get('window').width - 16 * 2;
  //     setDimensions(width);
  //   };
  //   Dimensions.addEventListener('change', onChangeWidth);
  //   return () => {
  //     Dimensions.removeEventListener('change', onChangeWidth);
  //   };
  // }, [])

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName='Login'>
        <AuthStack.Screen
          name='Registration'
          component={RegistrationScreen}
          options={{
              headerShown: false
          }}
        />
        <AuthStack.Screen
          name='Login'
          component={LoginScreen}
          options={{
              headerShown: false
          }}
        />
        {/* <StatusBar style="auto" /> */}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
