import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';
// for work with Firestore ------------------------
import uuid from 'react-native-uuid';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from '../../../firebase/config';

const initialInfoOfPhoto = {
    photoTitle: '',
    photoLocation: '',
}

const screenWidth = Dimensions.get('window').width - 36 - 80;

export default function CreatePostsScreen({ navigation }) {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [location, setLocation] = useState(null);
    const [infoOfPhoto, setInfoOfPhoto] = useState(initialInfoOfPhoto);

    const { userId, name } = useSelector((state) => state.auth);

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
    };

    const sendPhoto = () => {
        uploadPostToServer();
        navigation.navigate('DefaultScreen');
        setInfoOfPhoto(initialInfoOfPhoto);
        keyboardHide();
    };
    
    const uploadPhotoToServer = async () => {
        try {
            const response = await fetch(photo);
            const file = await response.blob();
            const uniquePostId = uuid.v4();
            const storageRef = ref(storage, `postsImages/${uniquePostId}`);
            await uploadBytes(storageRef, file);
            
            console.log('PostImage written with ID: ', uniquePostId);

            return await getDownloadURL(storageRef);
        } catch (error) {
            console.error('Error adding postImage: ', error);
            throw error;
        }
    };

    const uploadPostToServer = async () => {
        try {
            const serverPhoto = await uploadPhotoToServer();
            await addDoc(collection(db, 'posts'), {
                userId,
                name,
                serverPhoto,
                location,
                infoOfPhoto,
            });
        } catch (error) {
            console.error('Error adding post: ', error);
            throw error;
        }
    };

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        // setIsFocus(initialStateForFocus);
        Keyboard.dismiss();
    };

    const handleFocusOn = () => {
        setIsShowKeyboard(true);
        // setIsFocus({ onTitle: true });
    };

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
                                value={infoOfPhoto.photoTitle}
                                onChangeText={(value)=>setInfoOfPhoto((prevState)=> ({...prevState, photoTitle: value}))}
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
                                value={infoOfPhoto.photoLocation}
                                onChangeText={(value)=>setInfoOfPhoto((prevState)=> ({...prevState, photoLocation: value}))}
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
        top: 40,
        left: 40,
        height: 160,
        width: 'auto',
        borderWidth: 1,
        borderColor: '#FF6C00',
    },
    photo: {
        height: 160,
        width: screenWidth,
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
