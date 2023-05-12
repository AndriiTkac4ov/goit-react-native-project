import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundPhoto} source={require('./assets/images/background-photo.jpg')}></ImageBackground>
      <Text style={{color: 'violet', fontSize: 30}}>Keep studing and don't stop!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundPhoto: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }
});
