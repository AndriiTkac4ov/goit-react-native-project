import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from './screens/auth/RegistrationScreen';
import LoginScreen from './screens/auth/LoginScreen';
import HomeScreen from "./screens/home/HomeScreen";

const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
    if (!isAuth) {
        return (
            <AuthStack.Navigator initialRouteName='Login'>
                <AuthStack.Screen
                    name='Registration'
                    component={RegistrationScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name='Login'
                    component={LoginScreen}
                    options={{
                        headerShown: false
                    }}
                />
            </AuthStack.Navigator>
        )
    }

    return (
        <HomeScreen />
    )
}
