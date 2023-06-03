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
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { collection, doc, deleteDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';

export default function ProfileScreen({ navigation }) {
    const [userPosts, setUserPosts] = useState([]);
    const [isBtnInFocus, setIsBtnInFocus] = useState(false);

    const { name, userId } = useSelector((state) => state.auth);

    useEffect(() => {
        getUserPosts();
    });

    const getUserPosts = async () => {
        try {
            const postsRef = await collection(db, 'posts');
            const queryPosts = await query(postsRef, where('userId', '==', userId));
            await onSnapshot(queryPosts, (data) => {
                setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
        } catch (error) {
            console.error('Error profile: ', error);
            throw error;
        }
    };

    const readComments = (item) => {
        navigation.navigate('Comments', {postId: item.id, postUri: item.serverPhoto});
    };

    const lookMap = (item) => {
        navigation.navigate('Map', {location: item.location, locationName: item.infoOfPhoto.photoTitle});
    };

    const deletePost = async (item) => {
        try {
            await deleteDoc(doc(db, "posts", item.id));
            setIsBtnInFocus(true);
        } catch (error) {
            console.error('Error deleting post: ', error);
            throw error;
        }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.userProfile}>
                <Text style={styles.userName}>{name}</Text>
            </View>
            {userPosts && <FlatList
                style={styles.userPostsList}
                data={userPosts}
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
                        <TouchableOpacity
                            onPress={() => deletePost(item)}
                            style={styles.postDeleteWrapper}
                        >
                            <View
                                style={{
                                    ...styles.postDeleteBtn,
                                    backgroundColor: isBtnInFocus ? '#FF6C00' : '#F6F6F6',
                                }}
                            >
                                <Feather
                                    name="trash-2"
                                    size={24}
                                    style = {{color: isBtnInFocus ? '#FFFFFF' : "rgba(33, 33, 33, 0.8)"}}
                                />
                            </View>
                        </TouchableOpacity>
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
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 16,
    },
    userProfile: {
        marginTop: 16,
    },
    userName: {
        textAlign: 'center',
        fontSize: 24,
    },
    userPostsList: {
        marginTop: 16,
    },
    postContainer: {
        marginBottom: 32,
    },
    postImage: {
        height: 200,
        borderWidth: 2,
        borderColor: 'tomato',
        borderRadius: 8,
    },
    postInformation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    photoLocation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    postDeleteWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    postDeleteBtn: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
        width: 70,
        borderRadius: 20,
    },
});
