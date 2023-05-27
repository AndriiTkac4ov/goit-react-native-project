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

export default function PostsScreen({ route, navigation }) {
    const [posts, setPosts] = useState([]);

    console.log('route.params', route.params);

    useEffect(() => {
        if (route.params) {
            setPosts(prevState => [...prevState, route.params]);
        }
    }, [route.params]);

    console.log('posts', posts);

    const readComments = () => {
        navigation.navigate('Comments', { photo });
    };

    const lookMap = () => {
        navigation.navigate('Map', { photo });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Image source={{ uri: item.photo }} style={styles.postImage} />
                        <View style={styles.postInformation}>
                            <TouchableOpacity
                                // onPress={readComments}
                                // style={styles.linkContainer}
                            >
                                <EvilIcons name="comment" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={lookMap}
                                // style={styles.linkContainer}
                            >
                                <EvilIcons name="location" size={24} color="black" />
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
});
