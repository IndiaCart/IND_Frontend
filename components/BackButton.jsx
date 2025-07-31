import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { MoveLeft ,ArrowLeft ,ChevronLeft} from 'lucide-react-native'; // Make sure you're using `lucide-react-native`
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../design/ThemeContext';

const BackButton = ({ margin = 12, size = 24, color = '#000' }) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      style={[styles.container, { margin }]}
    >
     {Platform.OS == 'ios'? <ChevronLeft size={size} color={theme.text}/> : <ArrowLeft size={size} color={theme.text} />}  
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
