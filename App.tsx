/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <Text style={styles.ViewPage}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae odio possimus fugiat.</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000' ,
  },
  ViewPage:{
    marginTop: 50,
    padding: 20,
    fontSize: 16,
    color: '#fff',
  }
});

export default App;
