import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import App from './App';
import { ThemeProvider, ThemeContext } from './design/ThemeContext';

const Main = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ThemedWrapper>
          <App />
        </ThemedWrapper>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

// Custom wrapper to access theme after ThemeProvider
const ThemedWrapper = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
      {children}
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
