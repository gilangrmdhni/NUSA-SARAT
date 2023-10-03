import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SubmitScreen from '../screens/SubmitScreen';
import RiwayatScreen from '../screens/RiwayatScreen';
import RiwayatInfaq from '../screens/RiwayatInfaqScreen';
import HasilScreen from '../screens/HasilScreen';
import NewsDetail from '../screens/NewsScreen';
import BottomNavigationBar from './BottomNavigationBar';




const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: '' }} />
        <Stack.Screen name="Home" component={HomeScreen}
          options={{
            headerShown: false
          }} />
        <Stack.Screen name="Submit" component={SubmitScreen} options={{
          headerTitle: 'Ujian', headerStyle: {
            backgroundColor: '#C0142B',
          },
        }} />
        <Stack.Screen name="Riwayat" component={RiwayatScreen} options={{
          headerTitle: 'Riwayat', headerStyle: {
            backgroundColor: '#C0142B',
          },
        }} />
        <Stack.Screen name="Hasil" component={HasilScreen} options={{
          headerTitle: 'Hasil', headerStyle: {
            backgroundColor: '#C0142B',
          },
        }} />
        <Stack.Screen name="RiwayatInfaq" component={RiwayatInfaq} options={{
          headerTitle: 'Riwayat Infaq', headerStyle: {
            backgroundColor: '#C0142B',
          },
        }} />
        <Stack.Screen name="BottomTab" component={BottomNavigationBar} options={{ headerTitle: '' }} />
        <Stack.Screen
          name="NewsDetail"
          component={NewsDetail}
          options={({ route }) => ({ title: route.params.news.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;