/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { translations } from './constant/translation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: '#000'  }]}>
      <Text style={styles.ViewPage}>{translations.welcome}</Text>
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
