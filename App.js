import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { useRoute } from './router';
import { store } from './redux/store';

import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';

export default function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

    const routing = useRoute(user);

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        {routing}
      </NavigationContainer>
    </Provider>
  );
}
