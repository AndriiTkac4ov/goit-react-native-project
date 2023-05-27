import { useState, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    StyleSheet,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';

export default function CreatePostsScreen({ navigation }) {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");

            let locationPermission = await Location.requestForegroundPermissionsAsync();
            if (locationPermission.status !== "granted") {
                console.log("Permission to access location was denied");
            };
        })();
    }, []);

    const takePhoto = async () => {
        const snap = await cameraRef.takePictureAsync();
        setPhoto(snap.uri);
        await MediaLibrary.createAssetAsync(snap.uri);

        let location = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
        setLocation(coords);
        console.log(coords);
    };

    const sendPhoto = () => {
        navigation.navigate('Posts', { photo });
    };

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        // setIsFocus(initialStateForFocus);
        Keyboard.dismiss();
    }

    const handleFocusOn = () => {
        setIsShowKeyboard(true);
        // setIsFocus({ onTitle: true });
    }

    if (hasCameraPermission === null) {
        return <View />;
    }
    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
                <Camera
                    ref={setCameraRef}
                    style={styles.camera}
                >
                    {photo &&
                        <View style={styles.takePhotoContainer}>
                            <Image source={{ uri: photo }} style={styles.photo} />
                        </View>
                    }
                    <TouchableOpacity
                        onPress={takePhoto}
                        style={styles.snapContainer}
                    >
                        <FontAwesome name="camera" size={24} color="rgba(189, 189, 189, 1)" />
                    </TouchableOpacity>
                </Camera>
                <KeyboardAvoidingView
                    // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    behavior={Platform.OS === 'ios' && 'padding'}
                >
                    <View
                        style={{
                            // ...styles.loginForm,
                            marginBottom: isShowKeyboard ? 32 : 120,
                            // width: useWidthDimension(16),
                        }}
                    >
                        <View style={styles.inputWrapper}>
                            <TouchableOpacity style={styles.sendButton}>
                                <Text style={styles.senddLabel}>Upload a photo</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder={'Title...'}
                                placeholderTextColor={'#BDBDBD'}
                                // value={state.email}
                                // onChangeText={(value)=>setState((prevState)=> ({...prevState, email: value}))}
                                onFocus={handleFocusOn}
                                style={{
                                    ...styles.input,
                                    // backgroundColor: isFocus.onEmail ? '#FFFFFF' : '#F6F6F6',
                                    // borderColor: isFocus.onEmail ? '#FF6C00' : '#E8E8E8',
                                }}
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder={'Location'}
                                placeholderTextColor={'#BDBDBD'}
                                // value={state.email}
                                // onChangeText={(value)=>setState((prevState)=> ({...prevState, email: value}))}
                                onFocus={handleFocusOn}
                                style={{
                                    ...styles.input,
                                    // backgroundColor: isFocus.onEmail ? '#FFFFFF' : '#F6F6F6',
                                    // borderColor: isFocus.onEmail ? '#FF6C00' : '#E8E8E8',
                                }}
                            />
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={sendPhoto}
                                style={styles.btn}
                            >
                                <Text style={styles.btnTitle}>Bring out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 16,
    },
    camera: {
        height: 240,
        marginTop: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(232, 232, 232, 1)',
        backgroundColor: 'rgba(246, 246, 246, 1)',
        borderRadius: 8,
    },
    takePhotoContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        transform: [{ translate: ['50%', '50%'] }],
        height: 160,
        width: 238,
        borderWidth: 1,
        borderColor: '#FF6C00',
    },
    photo: {
        height: 160,
        width: 238,
    },
    inputWrapper: {
        marginBottom: 16,
    },
    input: {
        height: 50,
        padding: 16,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#212121',
        borderBottomWidth: 1,
        borderRadius: 6,
    },
    snapContainer: {
        height: 60,
        width: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        opacity: 0.3,
    },
    sendButton: {
        marginTop: 8,
    },
    senddLabel: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: 'rgba(189, 189, 189, 1)',
    },
    btnContainer: {
        // marginTop: 16,
    },
    btn: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#FF6C00',
    },
    btnTitle: {
        fontFamily: 'Roboto-Regular',
        color: '#FFFFFF',
        fontSize: 18,
    },
});
