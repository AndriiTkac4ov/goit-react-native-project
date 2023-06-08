import uuid from 'react-native-uuid';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase/config';

export const uploadAvatarToServer = async (avatarUri) => {
        try {
            const response = await fetch(avatarUri);
            const file = await response.blob();
            const uniqueAvatarId = uuid.v4();
            const storageRef = ref(storage, `avatars/${uniqueAvatarId}`);
            await uploadBytes(storageRef, file);

            return await getDownloadURL(storageRef);
        } catch (error) {
            console.error('Error adding avatar: ', error);
            throw error;
        }
    };
