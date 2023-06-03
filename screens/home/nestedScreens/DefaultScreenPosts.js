import { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { collection, getDocs, onSnapshot } from 'firebase/firestore'; 
import { db } from '../../../firebase/config';

export default function DefaultScreenPosts({ navigation }) {
    const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        try {
            // Перевіряємо у консолі отримані дані
            // const snapshot = await getDocs(collection(db, 'posts'));
            // snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));

            await onSnapshot(collection(db, "posts"), (data) => {
                setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    const readComments = () => {
        navigation.navigate('Comments');
    };

    const lookMap = (item) => {
        navigation.navigate('Map', {location: item.location, locationName: item.infoOfPhoto.photoTitle});
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Image source={{ uri: item.serverPhoto }} style={styles.postImage} />
                        <Text>{item.infoOfPhoto.photoTitle}</Text>
                        <View style={styles.postInformation}>
                            <TouchableOpacity
                                onPress={readComments}
                                // style={styles.linkContainer}
                            >
                                <EvilIcons name="comment" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => lookMap(item)}
                                // style={styles.linkContainer}
                            >
                                <View style={styles.photoLocation}>
                                    <EvilIcons name="location" size={24} color="black" />
                                    <Text>{item.infoOfPhoto.photoLocation}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    postContainer: {
        marginBottom: 8,
    },
    postImage: {
        height: 200,
        borderWidth: 2,
        borderColor: 'tomato',
    },
    postInformation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    photoLocation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
