import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
import { ThemeContext } from './design/ThemeContext';
import AdminAppNavigation from './navigation/AdminNavigation/AdminAppNavigation';

const App = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme.mode === 'dark';

console.log(theme)
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigation />
      {/* <AdminAppNavigation /> */}
    </>
  );
};


export default App;
