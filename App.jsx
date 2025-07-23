import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import { ThemeContext } from './design/ThemeContext';

const App = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme.mode === 'dark';

  console.log(theme)
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigation />

    </>
  );
};


export default App;
