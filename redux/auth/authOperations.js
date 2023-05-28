import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/config';

const signUp = ({name, email, password}) => async (dispatch, getState) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log('user', user);
    } catch (error) {
        console.log('error', error);
        console.log('error.message', error.message);
    }
};

const signIn = ({email, password}) => async (dispatch, getState) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log('user', user);
    } catch (error) {
        console.log('error', error);
        console.log('error.message', error.message);
    }
};

const signOut = () => async (dispatch, getState) => { };

export const authUser = {
    signUp,
    signIn,
    signOut,
};
