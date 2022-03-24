import { StyleSheet, Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import React, {useState, useEffect } from 'react';
enableScreens();

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import Settings from './screens/Settings';
import Login from './screens/login';
import Signup from './screens/signup';
import ForgotPassword from './screens/forgotPassword';
import Home from './screens/home';
import PlatformSelection from './screens/platformSelection';
import AuthHome from './screens/authHome';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function Main() {
  const { isLogin } = useSelector(state=>state.state);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          stackAnimation: 'flip',
          headerShown: Platform.OS === 'ios',
        }}
      >
        {!isLogin && <Stack.Screen name="Home" component={Home}/>}
        <Stack.Screen name="AuthHome" options={{ title: 'Home Main' }} component={AuthHome}/>

        {!isLogin && <>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Signup" component={Signup}/>
          <Stack.Screen name="ForgotPassword" options={{ title: 'Reset Password' }} component={ForgotPassword}/>
        </>}

        <Stack.Screen name="PlatformSelection" options={{ title: 'Platform Selection' }} component={PlatformSelection}/>
        
        <Stack.Screen 
          name="Settings" 
          options={{ 
            headerLargeTitle: true,
          }}
          component={Settings}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
