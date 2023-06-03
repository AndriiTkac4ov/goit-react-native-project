import { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { collection, addDoc, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';

export default function CommentsScreen({ route }) {
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);

    const postId = route.params.postId;
    const { name } = useSelector((state) => state.auth)

    useEffect(() => {
        getAllComments();
    }, [])

    const createComment = async () => {
        try {
            await addDoc(collection(doc(collection(db, 'posts'), postId), 'comments'), {
                comment,
                name,
            });
        
            setComment('');
            keyboardHide();
        } catch (error) {
            console.error('Error adding comment: ', error);
            throw error;
        }
    };

    const getAllComments = async () => {
        try {
            await onSnapshot(collection(doc(collection(db, 'posts'), postId), 'comments'), (data) => {
                setAllComments(data.docs.map((doc) => ({ ...doc.data()})));
            });
        } catch (error) {
            console.error('Error reading all comments: ', error);
            throw error;
        }
    };

    const keyboardHide = () => {
        // setIsShowKeyboard(false);
        // setIsFocus(initialStateForFocus);
        Keyboard.dismiss();
    };
    
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.commentsList}
                data={allComments}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <Text style={styles.commentOwner}>{item.name}:</Text>
                        <Text style={styles.commentText}>{item.comment}</Text>
                    </View>
                )}
            />
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder={'Your comment...'}
                    placeholderTextColor={'#BDBDBD'}
                    value={comment}
                    onChangeText={(value) => setComment(value)}
                    // onFocus={handleFocusOn}
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
                    onPress={createComment}
                    style={styles.btn}
                >
                    <Text style={styles.btnTitle}>Leave comment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 16,
    },
    commentsList: {
        marginTop: 16,
    },
    commentContainer: {
        padding: 8,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#212121',
        backgroundColor: 'rgba(232, 232, 232, 1)',
        marginBottom: 8,
    },
    commentOwner: {
        marginBottom: 8,
        fontStyle: 'italic',
    },
    commentText: {
        textAlign: 'right',
    },
    inputWrapper: {
        marginBottom: 32,
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
    btnContainer: {
        marginBottom: 32,
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
