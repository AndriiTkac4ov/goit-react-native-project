import { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
} from 'react-native';

export default function PostsScreen({ route }) {
    const [posts, setPosts] = useState([]);

    console.log(route.params);

    useEffect(() => {
        if (route.params) {
            setPosts((prevState) => [...prevState, route.params]);
        }
    }, [route.params]);

    console.log('posts', posts);

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => (
                    <View style={styles.postContainer}>
                        <Image source={{ uri: item.snap }} style={styles.postImage} />
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
    },
    postContainer: {
        marginBottom: 8,
    },
    postImage: {
        marginHorizontal: 16,
        height: 200,
        borderWidth: 2,
        borderColor: 'tomato',
    },
});
