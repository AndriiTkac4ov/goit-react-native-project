// import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/images/background-photo.jpg")}
        style={styles.backgroundPhoto}
      >
        <Text style={styles.title}>Keep coding and don't stop!</Text>
        <Text style={styles.title}>Registration</Text>
        <View style={styles.registerForm}>
          <View>
            <Text style={styles.inputTitle}>Login</Text>
            <TextInput
              textAlign={'center'}
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              textAlign={'center'}
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              textAlign={'center'}
              secureTextEntry={true}
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
          >
            <Text style={styles.btnTitle}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {/* <StatusBar style="auto" /> */}
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
  btn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 20,
    backgroundColor: 'yellow',
  },
  btnTitle: {
    color: 'brown',
    fontSize: 18,
  },
});
