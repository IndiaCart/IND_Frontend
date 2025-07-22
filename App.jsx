import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import AppNavigation from './navigation/AppNavigation';

const App = () => {
const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigation />
    </>
  );
};


export default App;
