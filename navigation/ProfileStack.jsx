import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Login';
import EditProfileScreen from '../Screens/EditProfileScreen';

// import ProfileScreen from '../Screens/ProfileScreen';
// import EditProfile from '../Screens/EditProfile';
// import ChangePassword from '../Screens/ChangePassword';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
