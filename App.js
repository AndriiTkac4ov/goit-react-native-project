import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { useRoute } from './router';
import { store } from './redux/store';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const routing = useRoute(false);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        {routing}
      </NavigationContainer>
    </Provider>
  );
}
