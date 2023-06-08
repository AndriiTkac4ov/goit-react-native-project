import { useState } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useWidthDimension } from '../../hooks/useWidthDimension';
import { authUser } from '../../redux/auth/authOperations';
import { AntDesign } from '@expo/vector-icons';
import { uploadAvatarToServer } from '../../helpers/uploadAvatarToServer';

const initialState = {
    name: '',
    email: '',
    password: '',
}

const initialStateForFocus = {
    onName: false,
    onEmail: false,
    onPassword: false,
}

const screenWidth = (Dimensions.get('window').width - 120)/2;

export default function RegistrationScreen() {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    const [avatarUri, setAvatarUri] = useState(null);
    const [isFocus, setIsFocus] = useState(initialStateForFocus);

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        setIsFocus(initialStateForFocus);
        Keyboard.dismiss();
    };

    const handleFocusOnName = () => {
        setIsShowKeyboard(true);
        setIsFocus({ onName: true });
    };

    const handleFocusOnEmail = () => {
        setIsShowKeyboard(true);
        setIsFocus({ onEmail: true });
    };

    const handleFocusOnPassword = () => {
        setIsShowKeyboard(true);
        setIsFocus({ onPassword: true });
    };

    const addAvatar = () => {
        uploadAvatarToServer();
        console.log('Let see Avatar!!!');
    };

    const sendValues = () => {
        dispatch(authUser.signUpOper(state));
        setState(initialState);
        keyboardHide();
    };

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
                            <View style={styles.avatarWrapper}>
                                <View>
                                    {avatarUri && (
                                        <Image source={{ uri: avatarUri }} style={styles.avatar} />
                                    )}
                                </View>
                                <TouchableOpacity
                                    onPress={addAvatar}
                                    style={styles.addAvatarBtn}
                                >
                                    <AntDesign name="pluscircleo" size={24} color="rgba(255, 108, 0, 1)" />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.title}>Registration</Text>

                            <View style={{
                                ...styles.registerForm,
                                marginBottom: isShowKeyboard ? 32 : 56,
                                width: useWidthDimension(16),
                            }}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        placeholder={'Name'}
                                        placeholderTextColor={'#BDBDBD'}
                                        value={state.name}
                                        onChangeText={(value)=>setState((prevState)=> ({...prevState, name: value}))}
                                        onFocus={handleFocusOnName}
                                        style={{
                                            ...styles.input,
                                            backgroundColor: isFocus.onName ? '#FFFFFF' : '#F6F6F6',
                                            borderColor: isFocus.onName ? '#FF6C00' : '#E8E8E8',
                                        }}
                                    />
                                </View>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        placeholder={'Email'}
                                        placeholderTextColor={'#BDBDBD'}
                                        value={state.email}
                                        onChangeText={(value)=>setState((prevState)=> ({...prevState, email: value}))}
                                        onFocus={handleFocusOnEmail}
                                        style={{
                                            ...styles.input,
                                            backgroundColor: isFocus.onEmail ? '#FFFFFF' : '#F6F6F6',
                                            borderColor: isFocus.onEmail ? '#FF6C00' : '#E8E8E8',
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
                                            backgroundColor: isFocus.onPassword ? '#FFFFFF' : '#F6F6F6',
                                            borderColor: isFocus.onPassword ? '#FF6C00' : '#E8E8E8',
                                        }}
                                    />
                                </View>
                            
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={sendValues}
                                    style={styles.btn}
                                >
                                    <Text style={styles.btnTitle}>
                                        Register
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate('Login')}
                                    style={styles.authLink}
                                >
                                    <Text style={styles.authLinkText}>
                                        Do you have already an account? Log in
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
        paddingTop: 92,
    },
    avatarWrapper: {
        position: 'absolute',
        top: -60,
        left: screenWidth,
        zIndex: 1,
        width: 120,
        height: 120,
        borderRadius: 16,
        backgroundColor: '#F6F6F6',
    },
    avatar: {
        width: "100%",
        height: "100%",
        transform: [{ scale: 1.01 }],
    },
    addAvatarBtn: {
        position: 'absolute',
        top: 82,
        left: 108,
        zIndex: 2,
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
    registerForm: {
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
