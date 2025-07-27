import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { handleGoogleLogout } from '../../utils/GoogleLogin';
import { useDispatch } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/native';

const UserHome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleLogout = async () => {
      try {
        // Sign out of Google
        await handleGoogleLogout();
  
        //Clear Redux state & persisted storage
        dispatch({ type: 'LOGOUT_USER' });
        await persistor.purge();
  
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Public',
                state: {
                  index: 0,
                  routes: [{ name: 'Login' }],
                },
              },
            ],
          })
        );
      } catch (err) {
        Alert.alert('Logout Error', 'Unable to log out. Please try again.');
        console.log('Logout error:', err);
      }
    };
  return (
    <View>
      <Text>UserHome</Text>



      <Text onPress={handleLogout}>LogOut</Text>
    </View>
  )
}

export default UserHome

const styles = StyleSheet.create({})