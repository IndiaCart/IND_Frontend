import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import App from './App';
import { ThemeProvider, ThemeContext } from './design/ThemeContext';
import store, { persistor } from './Redux/Store';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';

const Main = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <ThemedWrapper>
              <App />
            </ThemedWrapper>
          </ThemeProvider>
        </PersistGate>
      </Provider>
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
