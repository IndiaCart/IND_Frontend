import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import HomeScreen from '../Screens/HomeScreen';
import ProfileStack from './ProfileStack';



const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Shope':
              iconName = 'store';
              break;
            case 'Orders':
              iconName = 'shopping-bag';
              break;
            case 'Customers':
              iconName = 'users';
              break;
            case 'Admin':
              iconName = 'user-shield';
              break;
            case 'Profile':
              iconName = 'user-circle';
              break;
            default:
              iconName = 'circle';
          }

          return <FontAwesome5 name={iconName} size={size} color={color} solid />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Shope" component={HomeScreen} />
      <Tab.Screen name="Orders" component={ProfileStack} />
      <Tab.Screen name="Customers" component={ProfileStack} />
      <Tab.Screen name="Admin" component={ProfileStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
