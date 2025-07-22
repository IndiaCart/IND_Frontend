import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { ThemeContext } from '../design/ThemeContext';
import { CustomColor } from '../design/Color';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Signup = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [SignupType, setSignupType] = useState('phone');
  const [credentials, setCredentials] = useState({ SignupId: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleChange = (name, value) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSignup = () => {
    Alert.alert('Success', 'Signup successful!');
    navigation.navigate('Home');
  };

  return (
    <View
      style={[
        {
          backgroundColor:
            theme.mode === 'dark' ? theme.background : CustomColor.WHITE_COOL,
        },
        styles.container,
      ]}
    >
      {/* Heading */}
      <Text style={[{ color: theme.text }, styles.title]}>
        Log in to Your{'\n'}
        <Text style={styles.boldText}>IndiaCart Account!</Text>
      </Text>

      {/* Social Login */}
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/mac-os.png' }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/windows-10.png' }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Form Inputs */}
      <View style={styles.formGroup}>
        {/* First & Last Name */}
        <View style={styles.nameRow}>
          <View style={styles.nameInputWrapper}>
            <Text style={[styles.label, { color: theme.text }]}>First Name</Text>
            <TextInput
              placeholder="First Name"
              placeholderTextColor={theme.placeholder || '#999'}
              style={[
                styles.input,
                styles.nameInput,
                { backgroundColor: theme.inputBackground, color: theme.text },
              ]}
            />
          </View>

          <View style={styles.nameInputWrapper}>
            <Text style={[styles.label, { color: theme.text }]}>Last Name</Text>
            <TextInput
              placeholder="Last Name"
              placeholderTextColor={theme.placeholder || '#999'}
              style={[
                styles.input,
                styles.nameInput,
                { backgroundColor: theme.inputBackground, color: theme.text },
              ]}
            />
          </View>
        </View>

        {/* Signup ID */}
        <Text style={[styles.label, { color: theme.text }]}>
          {SignupType === 'phone' ? 'Phone Number' : 'Email'}
        </Text>
        <TextInput
          placeholder={
            SignupType === 'phone' ? 'Enter phone number' : 'Enter email'
          }
          keyboardType={SignupType === 'phone' ? 'phone-pad' : 'email-address'}
          placeholderTextColor={theme.placeholder || '#999'}
          value={credentials.SignupId}
          onChangeText={(text) => handleChange('SignupId', text)}
          style={[
            styles.input,
            { backgroundColor: theme.inputBackground, color: theme.text },
          ]}
        />

        {/* Password */}
        <Text style={[styles.label, { color: theme.text }]}>Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            placeholder="Enter password"
            placeholderTextColor={theme.placeholder || '#999'}
            secureTextEntry={!showPassword}
            value={credentials.password}
            onChangeText={(text) => handleChange('password', text)}
            style={[
              styles.input,
              styles.passwordInput,
              { color: theme.text },
            ]}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome5
              name={showPassword ? 'eye-slash' : 'eye'}
              size={20}
              color="#000"
              solid
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.dummyText}>Minimum length is 8 characters</Text>
      </View>

      {/* Signup Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Signup</Text>
      </TouchableOpacity>

      {/* Bottom Prompt */}
      <Text style={[styles.signupPrompt, { color: theme.text }]}>
        Have an account?{' '}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  iconButton: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 2,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    fontSize: 20,
    marginLeft: 10,
  },
  signupButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  signupText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  signupPrompt: {
    textAlign: 'center',
  },
  signupLink: {
    color: '#2563eb',
    fontWeight: '600',
  },
  dummyText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  nameInputWrapper: {
    flex: 1,
  },
  nameInput: {
    marginBottom: 0,
  },
});
