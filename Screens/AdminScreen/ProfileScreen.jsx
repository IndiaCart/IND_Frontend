import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
      <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
