import { useState } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';

export default function CreatePostsScreen({ navigation }) {
    const [camera, setCamera] = useState(null);
    const [snap, setSnap] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);

    const onCameraReady = () => {
        setIsCameraReady(true);
    };
    
    const takePhoto = async () => {
        const snap = await camera.takePictureAsync();
        setSnap(snap.uri);
    };

    const sendPhoto = async () => {
        navigation.navigate('Posts', { snap });
    };

    return (
        <View style={styles.container}>
            <Camera
                ref={setCamera}
                onCameraReady={onCameraReady}
                style={styles.camera}
            >
                {snap &&
                    <View style={styles.takePhotoContainer}>
                        <Image soure={{ uri: snap}} style={styles.photo} />
                    </View>
                }
                <TouchableOpacity
                    disabled={!isCameraReady}
                    onPress={takePhoto}
                    style={styles.snapContainer}
                >
                    <FontAwesome name="camera" size={24} color="rgba(189, 189, 189, 1)" />
                </TouchableOpacity>
            </Camera>
            <View>
                <TouchableOpacity style={styles.sendButton}>
                    <Text style={styles.senddLabel}>Upload a photo</Text>
                </TouchableOpacity>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    camera: {
        height: 240,
        marginTop: 32,
        marginHorizontal: 16,
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
        left: 60,
        height: 160,
        width: 238,
        borderWidth: 1,
        borderColor: '#FF6C00',
    },
    photo: {
        height: 200,
        width: 358,
    },
    snapContainer: {
        height: 60,
        width: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    sendButton: {
        marginTop: 8,
        marginHorizontal: 16,
    },
    senddLabel: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: 'rgba(189, 189, 189, 1)',
    },
    btnContainer: {
        marginHorizontal: 16,
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
