import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { authSlice } from './authReducer';

const signUpOper = ({name, email, password}) => async (dispatch, getState) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
            displayName: name
        })

        const { uid, displayName } = await auth.currentUser;
        
        console.log('uid, displayName', uid, displayName);

        dispatch(authSlice.actions.updateUserProfile({
            userId: uid,
            name: displayName,
        }));
    } catch (error) {
        console.log('error', error);
        console.log('error.message', error.message);
    }
};

const signInOper = ({email, password}) => async (dispatch, getState) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log('user', user);
    } catch (error) {
        console.log('error', error);
        console.log('error.message', error.message);
    }
};

const signOutOper = () => async (dispatch, getState) => { };

const stateChangeOper = () => async (dispatch, getState) => { };

export const authUser = {
    signUpOper,
    signInOper,
    signOutOper,
    stateChangeOper,
};
