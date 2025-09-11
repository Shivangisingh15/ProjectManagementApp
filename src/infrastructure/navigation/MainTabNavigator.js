import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import DashboardScreen from '../../presentation/screens/dashboard/DashboardScreen';
import KanbanScreen from '../../presentation/screens/kanban/KanbanScreen';
import ClockifyScreen from '../../presentation/screens/clockify/ClockifyScreen';
import AddTaskScreen from '../../presentation/screens/clockify/AddTaskScreen';
import WorkspaceScreen from '../../presentation/screens/workspace/WorkspaceScreen';

const Tab = createBottomTabNavigator();
const ClockifyStack = createStackNavigator();

// Create a stack navigator for Clockify to include AddTaskScreen
const ClockifyStackNavigator = () => {
  return (
    <ClockifyStack.Navigator screenOptions={{headerShown: false}}>
      <ClockifyStack.Screen name="ClockifyMain" component={ClockifyScreen} />
      <ClockifyStack.Screen name="AddTaskScreen" component={AddTaskScreen} />
    </ClockifyStack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          
          switch (route.name) {
            case 'Dashboard':
              iconName = '📊';
              break;
            case 'Kanban':
              iconName = '📋';
              break;
            case 'Clockify':
              iconName = '⏰';
              break;
            case 'Workspace':
              iconName = '👥';
              break;
            default:
              iconName = '❓';
          }

          return <Text style={{fontSize: size, color: focused ? '#2196F3' : '#9E9E9E'}}>{iconName}</Text>;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#9E9E9E',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F5F5F5',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Kanban" component={KanbanScreen} />
      <Tab.Screen name="Clockify" component={ClockifyStackNavigator} />
      <Tab.Screen name="Workspace" component={WorkspaceScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;