import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundPhoto}
        source={require("./assets/images/background-photo.jpg")}
      >
        <Text style={styles.title}>Keep coding and don't stop!</Text>
        <Text style={styles.title}>Registration</Text>
        <View style={styles.registerForm}>
          <View>
            <Text style={styles.inputTitle}>Login</Text>
            <TextInput
              style={styles.input}
              textAlign={'center'}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.input}
              textAlign={'center'}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              textAlign={'center'}
              secureTextEntry={true}
            />
          </View>
          <Button title='Register' />
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundPhoto: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
  },
  registerForm: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 6,
    marginHorizontal: 40,
  },
  inputTitle: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    height: 40,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
  },
});
