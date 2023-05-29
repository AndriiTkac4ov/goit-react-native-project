import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '../router';
import { authUser } from '../redux/auth/authOperations';

const Main = () => {
    const { stateChange } = useSelector((state) => state.auth);
    console.log(useSelector((state) => state.auth));
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authUser.stateChangeOper());
        console.log('stateChange', stateChange)
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