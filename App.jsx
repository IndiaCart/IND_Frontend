import React from 'react';
import { StatusBar, useColorScheme, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/Login';
import { translations } from './constant/translation';

const Stack = createNativeStackNavigator();

const App = () => {
const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login}/>
          {/* Add other screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};


export default App;
