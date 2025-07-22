import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminLogin from '../../components/AdminComponent/AdminLogin';
const AdminAppNavigation = () => {
const Stack = createNativeStackNavigator();
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={AdminLogin} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AdminAppNavigation

const styles = StyleSheet.create({})