import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './app/loginScreen/loginScreen';
import RegisterScreen from './app/registerScreen/registerScreen';
import SplashScreen from './app/components/SplashScreen';
import HomeScreen from './app/homeScreen/homeScreen';
import TrainingScreen from './app/trainingScreen.js/trainerScreen';
import ExcerciseScreen from './app/exerciseScreen/exerciseScreen';
import SerieScreen from './app/serieScreen/serieScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Training"
          component={TrainingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Exercise"
          component={ExcerciseScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Serie"
          component={SerieScreen}
          options={{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}