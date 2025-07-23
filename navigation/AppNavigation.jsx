import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import MainTabs from './AdminNavigation/MainTab';
import EditProfile from '../Screens/AdminScreen/EditProfile';
import Login from '../components/ClientComponent/Login';
import Signup from '../components/ClientComponent/Signup';
import AdminLogin from '../components/AdminComponent/AdminLogin';
import AdminSignup from '../components/AdminComponent/AdminSignup';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [role, setRole] = useState('admin'); // 'admin' | 'user' | null
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Simulate login and role check (replace with real logic)
  const handleLogin = async () => {
    // Simulate user login and role fetch
    const fetchedRole = 'admin'; // or 'user'
    setRole(fetchedRole);
    setIsAuthenticated(true);
  };

  useEffect(() => {

  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Always shown routes */}
        <Stack.Screen name="Login">
          {(props) => <Login {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="AdminSignup" component={AdminSignup} />

        {/* Conditionally render post-login routes */}
        {isAuthenticated && role === 'admin' && (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
          </>
        )}

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
