import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DashboardScreen from '../../presentation/screens/dashboard/DashboardScreen';
import KanbanScreen from '../../presentation/screens/kanban/KanbanScreen';
import ClockifyScreen from '../../presentation/screens/clockify/ClockifyScreen';
import WorkspaceScreen from '../../presentation/screens/workspace/WorkspaceScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          
          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
              break;
            case 'Kanban':
              iconName = 'view-column';
              break;
            case 'Clockify':
              iconName = 'access-time';
              break;
            case 'Workspace':
              iconName = 'work';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
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
      <Tab.Screen name="Clockify" component={ClockifyScreen} />
      <Tab.Screen name="Workspace" component={WorkspaceScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;