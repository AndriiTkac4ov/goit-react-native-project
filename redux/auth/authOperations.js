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
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log('error', error);
        console.log('error.message', error.message);
    }
};

const stateChangeOper = () => async (dispatch, getState) => {
    try {
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                const userUpdatedProfile = {
                    userId: user.uid,
                    name: user.displayName,
                };

                dispatch(authSlice.actions.updateUserProfile(userUpdatedProfile));
                dispatch(authSlice.actions.authStateChange({ stateChange: true }));
            };
        });
    } catch (error) {
        console.log('error', error);
        console.log('error.message', error.message);
    }
};

const signOutOper = () => async (dispatch, getState) => {
    try {
        await signOut(auth);

        dispatch(authSlice.actions.authSighOut());
    } catch (error) {
        console.log('error', error);
        console.log('error.message', error.message);
    }
};

export const authUser = {
    signUpOper,
    signInOper,
    stateChangeOper,
    signOutOper,
};
