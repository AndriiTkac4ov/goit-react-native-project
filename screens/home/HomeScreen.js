import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import {
    AntDesign,
    Feather,
    MaterialIcons,
} from '@expo/vector-icons';

import { Main } from './main';

const MainTab = createBottomTabNavigator();

export default function HomeScreen() {
    return (
        <MainTab.Navigator
            screenOptions={{ tabBarShowLabel: false }}
        >
            <MainTab.Screen
                name='Posts'
                component={Main.PostsScreen}
                options={{
                    headerRight: () => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => alert("This is a button!")}
                            style={styles.logoutLink}
                        >
                            <MaterialIcons
                                name="logout"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    ),
                    tabBarIcon: ({ focused, size, color }) => (
                        <AntDesign
                            name="appstore-o"
                            size={size}
                            style = {{color: focused ? '#FFFFFF' : "rgba(33, 33, 33, 0.8)"}}
                        />
                    ),
                    tabBarAccessibilityLabel: 'Read post',
                    tabBarActiveBackgroundColor: '#FF6C00',
                }}
            />
            <MainTab.Screen
                name='CreatePosts'
                component={Main.CreatePostsScreen}
                options={{
                    tabBarIcon: ({ focused, size, color }) => (
                        <AntDesign
                            name="plus"
                            size={size}
                            style = {{color: focused ? '#FFFFFF' : "rgba(33, 33, 33, 0.8)"}}
                        />
                    ),
                    tabBarAccessibilityLabel: 'Plus post',
                    tabBarActiveBackgroundColor: '#FF6C00',
                }}
            />
            <MainTab.Screen
                name='Profile'
                component={Main.ProfileScreen}
                options={{
                    tabBarIcon: ({ focused, size, color }) => (
                        <Feather
                            name="user"
                            size={size}
                            style = {{color: focused ? '#FFFFFF' : "rgba(33, 33, 33, 0.8)"}}
                        />
                    ),
                    tabBarAccessibilityLabel: 'See profile info',
                    tabBarActiveBackgroundColor: '#FF6C00',
                }}
            />
        </MainTab.Navigator>
    )
}

const styles = StyleSheet.create({
    logoutLink: {
        backgroundColor: 'red',
    },
});
