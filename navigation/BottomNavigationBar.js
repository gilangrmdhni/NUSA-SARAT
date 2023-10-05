import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, Text, Animated, Easing, StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import RiwayatScreen from '../screens/RiwayatInfaqScreen';
import SubmitScreen from '../screens/SubmitScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: { backgroundColor: '#C0142B' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={'#C0142B'} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="QRIS"
        component={RiwayatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="qr-code" color={'#FFFFFF'} size={size} />
          ),
          headerShown: false,
          tabBarButton: (props) => (
            <CustomQRISButton {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Hasil"
        component={SubmitScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="paper-plane" color={'#C0142B'} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const CustomQRISButton = ({ accessibilityState, children, onPress }) => {
  const focused = accessibilityState.selected;

  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => onPress());
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.qrisButton,
        focused ? styles.qrisButtonFocused : {},
        { transform: [{ scale: scaleValue }] },
      ]}
    >
      <View style={styles.qrisButtonContainer}>
        <Ionicons name="qr-code" color={focused ? '#C0142B' : '#FFFFFF'} size={30} />
        <Text style={{ color: focused ? '#C0142B' : '#FFFFFF', marginTop: 5 }}>Scan</Text>
      </View>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  qrisButton: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C0142B',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  qrisButtonFocused: {
    backgroundColor: '#FFD700',
  },
  qrisButtonContainer: {
    alignItems: 'center',
  },
});

export default BottomTabNavigator;
