import {Text, View} from 'react-native';
import React, {Component} from 'react';

import Dashboard from './Dashboard';
import Form from './Form';
import AllLead from './AllLead';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default class BottomMenu extends Component {
  DashboardStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="AllLead" component={AllLead} />
      </Stack.Navigator>
    );
  }

  render() {
    return (
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          tabBarActiveTintColor: '#058cb2',
          tabBarInactiveTintColor: '#000000',
          headerShown: false,
        }}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Form"
          component={Form}
          options={{
            tabBarLabel: 'Add Lead',
            tabBarIcon: ({color, size}) => (
              <AntDesign name="form" color={color} size={22} />
            ),
          }}
        />
        <Tab.Screen
          name="AllLead"
          component={AllLead}
          options={{
            tabBarLabel: 'AllLead',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="file-chart-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
