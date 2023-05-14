import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Keyboard, 
} from 'react-native';

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/images/background-photo.jpg")}
          style={styles.backgroundPhoto}
        >
          <KeyboardAvoidingView
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            behavior={Platform.OS === 'ios' && 'padding'}
          >
            <Text style={styles.title}>Keep coding and don't stop!</Text>
            <Text style={styles.title}>Registration</Text>
            <View style={{...styles.registerForm, marginBottom: isShowKeyboard ? 20 : 100}}>
              <View>
                <Text style={styles.inputTitle}>Login</Text>
                <TextInput
                  textAlign={'center'}
                  onFocus={()=>setIsShowKeyboard(true)}
                  style={styles.input}
                />
              </View>
              <View>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput
                  textAlign={'center'}
                  onFocus={()=>setIsShowKeyboard(true)}
                  style={styles.input}
                />
              </View>
              <View>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  textAlign={'center'}
                  onFocus={()=>setIsShowKeyboard(true)}
                  secureTextEntry={true}
                  style={styles.input}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={keyboardHide}
                style={styles.btn}
              >
                <Text style={styles.btnTitle}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
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
    justifyContent: 'flex-end',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
  },
  registerForm: {
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

    ...Platform.select({
      ios: {
        backgroundColor: 'aquamarine',
      },
      android: {
        backgroundColor: 'violet',
      },
    }),
  },
  btnTitle: {
    color: 'brown',
    fontSize: 18,
  },
});
