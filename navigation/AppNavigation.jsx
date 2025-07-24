import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Login from '../components/ClientComponent/Login';
import Signup from '../components/ClientComponent/Signup';
import AdminLogin from '../components/AdminComponent/AdminLogin';
import AdminSignup from '../components/AdminComponent/AdminSignup';
import { useSelector } from 'react-redux';
import AdminAppNavigation from './AdminNavigation/AdminAppNavigation';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [role, setRole] = useState(''); // 'admin' | 'user' | null
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const {currentLoginType} = useSelector((state)=> state.user);
  // Simulate login and role check (replace with real logic)
  const handleLogin = async () => {
    setRole(currentLoginType);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    handleLogin();
  }, [currentLoginType]);
  {console.log(currentLoginType)};
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* These routes are avaliable before auth */}
        <Stack.Screen name="Login">
          {(props) => <Login {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="AdminSignup" component={AdminSignup} />

        {/* Conditionally render post-login routes for Admin*/}
        {isAuthenticated && role == 'admin' && <Stack.Screen name="AdminChannel" component={AdminAppNavigation} />}

        {/* You can add user routes here later like: */}
            {/* {isAuthenticated && role === 'user' && (
              <>
                <Stack.Screen name="UserHome" component={UserHome} />
                <Stack.Screen name="UserSettings" component={UserSettings} />
              </>
            )} */}
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
