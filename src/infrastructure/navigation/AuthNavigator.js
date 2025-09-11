import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '../../presentation/screens/auth/OnboardingScreen';
import LoginScreen from '../../presentation/screens/auth/LoginScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;