import { StyleSheet, Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import React, {useState, useEffect } from 'react';
enableScreens();

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Settings from './screens/Settings';
import Login from './screens/login';
import Signup from './screens/signup';
import ForgotPassword from './screens/forgotPassword';
import Home from './screens/home';
import PlatformSelection from './screens/platformSelection';
import AuthHome from './screens/authHome';
import { useSelector } from 'react-redux';
import Account from './screens/account';
import CollegeSelection from './screens/CollegeSelection';
import UnknownAccountSetup from './screens/UnknownAccountSetup';
import FakeAccount from './screens/fakeAccount';

// 
// https://data.gov.in/user/myaccount 579b464db66ec23bdd0000017ff1eeedbf784c764c00093b957334c6
// 

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

        {!isLogin?
        <>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Signup" component={Signup}/>
        </>
        :
        <>
          <Stack.Screen name="AuthHome" options={{ title: 'Home Main' }} component={AuthHome}/>
          <Stack.Screen name="PlatformSelection" options={{ title: 'Platform Selection' }} component={PlatformSelection}/>
          <Stack.Screen name="CollegeSelection" options={{ title: 'College Selection' }} component={CollegeSelection}/>
          <Stack.Screen name="UnknownAccountSetup" options={{ title: 'Ready To Go' }} component={UnknownAccountSetup}/>
          <Stack.Screen name="FakeAccount" options={{ title: 'Unknown' }} component={FakeAccount}/>
          <Stack.Screen name="Account" component={Account}/>
        </>
        }


        <Stack.Screen name="ForgotPassword" options={{ title: 'Reset Password' }} component={ForgotPassword}/>
        
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
