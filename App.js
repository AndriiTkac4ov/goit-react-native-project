import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';

const MainStack = createStackNavigator();

export default function App() {
  const [dimensions, setDimensions] = useState(
    Dimensions.get('window').width - 16 * 2
  )
  
  useEffect(() => {
    const onChangeWidth = () => {
      const width = Dimensions.get('window').width - 16 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener('change', onChangeWidth);
    return () => {
      Dimensions.removeEventListener('change', onChangeWidth);
    };
  }, [])

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName='Login'>
        <MainStack.Screen name='Registration' component={RegistrationScreen} />
        <MainStack.Screen name='Login' component={LoginScreen} />
        <StatusBar style="auto" />
        {/* width={dimensions} */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
