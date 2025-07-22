import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
     const navigation = useNavigation();
  return (
    <View>
        <Text>EditProfileScreen</Text>
        <Text onPress={()=>navigation.navigate('Login')}>Login Page</Text>
        <Text onPress={()=>navigation.navigate('Home')}>Home page</Text>
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({})