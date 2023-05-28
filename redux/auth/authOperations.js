import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/config';

const signUp = ({name, email, password}) => async (dispatch, getSatte) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log('user', user);
    } catch (error) {
        console.log('error', error);
        console.log('error.message', error.message);
    }
};

const signIn = () => async (dispatch, getSatte) => { };

const signOut = () => async (dispatch, getSatte) => { };

export const authUser = {
    signUp,
    signIn,
    signOut,
};
