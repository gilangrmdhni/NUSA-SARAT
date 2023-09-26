import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'; // Gantilah dengan nama layar yang sesuai
import ProfileScreen from '../screens/ProfileScreen'; // Gantilah dengan nama layar yang sesuai

const Tab = createBottomTabNavigator();

const BottomNavigationBar = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
                labelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                },
                style: {
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: 'gray',
                },
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default BottomNavigationBar;
