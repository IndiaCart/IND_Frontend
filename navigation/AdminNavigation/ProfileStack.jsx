import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from '../../Screens/AdminScreen/EditProfile';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
