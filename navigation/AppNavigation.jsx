import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Login';
import Signup from '../components/Signup';
import BottomTabs from './BottomTabs';
import AdminLogin from '../components/AdminComponent/AdminLogin';
import AdminSignup from '../components/AdminComponent/AdminSignup';
import BottomTabsWithHeader from './BottomTabsWithHeader';
const AppNavigation = () => {
const Stack = createNativeStackNavigator();
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={BottomTabsWithHeader} options={{ headerShown: false }} />
        <Stack.Screen name="BottomTab" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ headerShown: false }} />
        <Stack.Screen name="AdminSignup" component={AdminSignup} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})