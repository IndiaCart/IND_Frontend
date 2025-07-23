import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../Screens/AdminScreen/HomeScreen';
import ProfileScreen from '../../Screens/AdminScreen/ProfileScreen';
import CustomHeader from '../../components/AdminComponent/CustomHeader';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        header: () => <CustomHeader title="Home" />
      }}
    />
  </Stack.Navigator>
);

const ProfileStk = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        header: () => <CustomHeader title="Profile" />
      }}
    />
  </Stack.Navigator>
);

const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="ProfileTab" component={ProfileStk} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default MainTabs;
