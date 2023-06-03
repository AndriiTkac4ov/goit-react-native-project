import { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { collection, doc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';

export default function ProfileScreen() {
    const [posts, setPosts] = useState([]);
    const { userId } = useSelector((state) => state.auth);

    useEffect(() => {
        getUserPosts();
    });

    const getUserPosts = async () => {
        try {
            const postsRef = await collection(db, 'posts');
            const queryPosts = await query(postsRef, where('userId', '==', userId));
            await onSnapshot(queryPosts, (data) => {
                setPosts(data.docs.map((doc) => ({ ...doc.data() })));
            });
        } catch (error) {
            console.error('Error profile: ', error);
            throw error;
        }
    };

    const readComments = (item) => {
        navigation.navigate('Comments', {postId: item.id});
    };

    const lookMap = (item) => {
        navigation.navigate('Map', {location: item.location, locationName: item.infoOfPhoto.photoTitle});
    };
    
    return (
        <View style={styles.container}>
            {posts && <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Image source={{ uri: item.serverPhoto }} style={styles.postImage} />
                        <Text>{item.infoOfPhoto.photoTitle}</Text>
                        <View style={styles.postInformation}>
                            <TouchableOpacity
                                onPress={() => readComments(item)}
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
            />}
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
