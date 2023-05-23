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

export default function CreatePostsScreen() {
    const [camera, setCamera] = useState(null);
    const [snap, setSnap] = useState(null); 

    const takePhoto = async () => {
        const snap = await camera.takePictureAsync();
        setSnap(snap.uri);
    };

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} ref={setCamera}>
                {snap &&
                    <View style={styles.takePhotoContainer}>
                        <Image soure={{ uri: snap}} style={styles.photo} />
                    </View>
                }
                <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
                    <FontAwesome name="camera" size={24} color="rgba(189, 189, 189, 1)" />
                </TouchableOpacity>
            </Camera>
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
    },
    takePhotoContainer: {
        position: 'absolute',
        top: 20,
        left: 0,
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
});
