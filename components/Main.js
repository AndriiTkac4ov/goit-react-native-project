import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '../router';
import { authUser } from '../redux/auth/authOperations';

const Main = () => {
    const { stateChange } = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authUser.stateChangeOper());
    }, [])

    const routing = useRoute(stateChange);

    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            {routing}
        </NavigationContainer>
    );
}

export default Main;