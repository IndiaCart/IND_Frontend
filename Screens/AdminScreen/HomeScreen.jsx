import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../design/ThemeContext';

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
       <Text>Wlecome to Home screen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'start',
  },
});
