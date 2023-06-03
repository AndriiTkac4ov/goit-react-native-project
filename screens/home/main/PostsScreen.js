import { createStackNavigator } from '@react-navigation/stack'
import DefaultScreenPosts from '../nestedScreens/DefaultScreenPosts';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';

const NestedScreens = createStackNavigator();

export default function PostsScreen() {
    return(
        <NestedScreens.Navigator>
            <NestedScreens.Screen
                name='DefaultScreen'
                component={DefaultScreenPosts}
                options={{
                    headerShown: false,
                }}
            />
            <NestedScreens.Screen name='Comments' component={CommentsScreen}/>
            <NestedScreens.Screen name='Map' component={MapScreen}/>
        </NestedScreens.Navigator>
    )
}
