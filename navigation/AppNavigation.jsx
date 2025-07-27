import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

// ========== Public Screens ==========
import Login from '../components/ClientComponent/Login';
import Signup from '../components/ClientComponent/Signup';
import AdminLogin from '../components/AdminComponent/AdminLogin';
import AdminSignup from '../components/AdminComponent/AdminSignup';

// ========== Admin Screens ==========
import AdminAppNavigation from './AdminNavigation/AdminAppNavigation';
import UserHome from '../Screens/UserScreen/UserHome';

// ========== User Screens (if any) ==========
const UserSettings = () => null;

// ========== Navigators ==========
const PublicStack = createNativeStackNavigator();
function PublicNavigator() {
  return (
    <PublicStack.Navigator screenOptions={{ headerShown: false }}>
      <PublicStack.Screen name="Login" component={Login} />
      <PublicStack.Screen name="Signup" component={Signup} />
      <PublicStack.Screen name="AdminLogin" component={AdminLogin} />
      <PublicStack.Screen name="AdminSignup" component={AdminSignup} />
    </PublicStack.Navigator>
  );
}

const AdminStack = createNativeStackNavigator();
function AdminNavigator() {
  return (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminStack.Screen name="AdminChannel" component={AdminAppNavigation} />
    </AdminStack.Navigator>
  );
}

const UserStack = createNativeStackNavigator();
function UserNavigator() {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="UserHome" component={UserHome} />
      <UserStack.Screen name="UserSettings" component={UserSettings} />
    </UserStack.Navigator>
  );
}

// ========== RootStack ==========
const RootStack = createNativeStackNavigator();

export default function AppNavigation() {
  const { isAuthenticated, userData } = useSelector(state => state.user);

  const role = userData?.user?.role;

  useEffect(()=>{

  },[isAuthenticated])
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <RootStack.Screen name="Public" component={PublicNavigator} />
        ) : role === 'admin' ? (
          <RootStack.Screen name="Admin" component={AdminNavigator} />
        ) : role === 'user' ? (
          <RootStack.Screen name="User" component={UserNavigator} />
        ) : (
          <RootStack.Screen name="Public" component={PublicNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
