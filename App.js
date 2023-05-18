import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
// import RegistrationScreen from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';

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
    <>
      <StatusBar style="auto" />
      {/* <RegistrationScreen width={dimensions}/> */}
      <LoginScreen />
    </>
  );
}
