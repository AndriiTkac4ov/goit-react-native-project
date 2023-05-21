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
import { useNavigation } from '@react-navigation/native';
import { useWidthDimension } from '../../hooks/useWidthDimension';

const initialState = {
    email: '',
    password: '',
}

export default function LoginScreen() {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    const [isInFocusEmail, setIsInFocusEmail] = useState(false);
    const [isInFocusPassword, setIsInFocusPassword] = useState(false);

    const navigation = useNavigation();

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        setIsInFocusEmail(false);
        setIsInFocusPassword(false);
        Keyboard.dismiss();
    }

    const sendValues = () => {
        console.log(state);
        keyboardHide();
        setState(initialState);
    }

    const handleFocusOnEmail = () => {
        setIsShowKeyboard(true);
        setIsInFocusEmail(true);
        setIsInFocusPassword(false);
    }

    const handleFocusOnPassword = () => {
        setIsShowKeyboard(true);
        setIsInFocusEmail(false);
        setIsInFocusPassword(true);
    }

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <ImageBackground
                    source={require("../../assets/images/background-photo.jpg")}
                    style={styles.backgroundPhoto}
                >
                    <KeyboardAvoidingView
                        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        behavior={Platform.OS === 'ios' && 'padding'}
                    >
                        <View style={styles.registerWrapper}>
                            <Text style={styles.title}>Log in</Text>

                            <View style={{
                                ...styles.loginForm,
                                marginBottom: isShowKeyboard ? 32 : 120,
                                width: useWidthDimension(),
                            }}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        placeholder={'Email'}
                                        placeholderTextColor={'#BDBDBD'}
                                        value={state.email}
                                        onChangeText={(value)=>setState((prevState)=> ({...prevState, email: value}))}
                                        onFocus={handleFocusOnEmail}
                                        style={{
                                            ...styles.input,
                                            backgroundColor: isInFocusEmail ? '#FFFFFF' : '#F6F6F6',
                                            borderColor: isInFocusEmail ? '#FF6C00' : '#E8E8E8',
                                        }}
                                    />
                                </View>
                                <View style={styles.inputPasswordWrapper}>
                                    <TextInput
                                        placeholder={'Password'}
                                        placeholderTextColor={'#BDBDBD'}
                                        secureTextEntry={true}
                                        value={state.password}
                                        onChangeText={(value)=>setState((prevState)=> ({...prevState, password: value}))}
                                        onFocus={handleFocusOnPassword}
                                        style={{
                                            ...styles.input,
                                            backgroundColor: isInFocusPassword ? '#FFFFFF' : '#F6F6F6',
                                            borderColor: isInFocusPassword ? '#FF6C00' : '#E8E8E8',
                                        }}
                                    />
                                </View>
                            
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={sendValues}
                                    style={styles.btn}
                                >
                                    <Text style={styles.btnTitle}>
                                        Log in
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate('Registration')}
                                    style={styles.authLink}
                                >
                                    <Text style={styles.authLinkText}>
                                        Don't you have an account? Register
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
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
        alignItems: 'center',
    },
    registerWrapper: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 32,
    },
    title: {
        fontFamily: 'Roboto-Medium',
        color: '#212121',
        fontSize: 30,
        lineHeight: 35,
        letterSpacing: 0.16,
        textAlign: 'center',
        marginBottom: 32,
    },
    loginForm: {
        marginHorizontal: 16,
    },
    inputWrapper: {
        marginBottom: 16,
    },
    inputPasswordWrapper: {
        marginBottom: 42,
    },
    input: {
        height: 50,
        padding: 16,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#212121',
        borderWidth: 1,
        borderRadius: 6,
    },
    btn: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#FF6C00',

        // ...Platform.select({
        //     ios: {
        //         backgroundColor: 'aquamarine',
        //     },
        //     android: {
        //         backgroundColor: 'violet',
        //     },
        // }),
    },
    btnTitle: {
        fontFamily: 'Roboto-Regular',
        color: '#FFFFFF',
        fontSize: 18,
    },
    authLink: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authLinkText: {
        color: '#1B4371',
    },
});
