import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Text>EditProfile</Text>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({})