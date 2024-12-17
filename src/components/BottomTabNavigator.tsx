// BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/home/HomeScreen';
import EventScreen from '../screen/event/EventScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="EventScreen" component={EventScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;