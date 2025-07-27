import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { ThemeContext } from '../../design/ThemeContext';
import { CustomColor } from '../../design/Color';
import { useDispatch, useSelector } from 'react-redux';
import { handleGoogleLogin, handleGoogleLogout } from '../../utils/GoogleLogin';
import LoginSkeleton from '../Shimmer/LoginSkeleton';

const Login = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme.mode === 'dark';
   const {userData ,isAuthenticated , loading} = useSelector((state)=> state.user);
 useEffect(()=>{
     console.log("userData =>", userData)
     console.log("loading =>", loading)
     console.log("isAuthenticated =>", isAuthenticated)
 },[userData ,loading , isAuthenticated])
  const dispatch = useDispatch();

  const [loginType, setLoginType] = useState('phone');
  const [credentials, setCredentials] = useState({ loginId: '', password: '', otp: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isOTPLogin, setIsOTPLogin] = useState(false);

  const handleChange = (key, value) => {
    setCredentials({ ...credentials, [key]: value });
  };

  const handleLogin = () => {
    navigation.navigate('MainTabs');
  };


  // Login Via Google
  const handleLoginViaGoogle = async () => {
    try {
      await handleGoogleLogin();
     
    } catch (err) {
      console.log('Login error:', err.message);
    } finally {
    }
  };

  if (loading) return <LoginSkeleton />;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.container, { backgroundColor: isDark ? theme.background : CustomColor.GREY_10 }]}
      >
        <Text style={[styles.title, { color: theme.text }]}>Log in to Your<Text style={{ fontWeight: 'bold' }}>IndiaCart Account!</Text></Text>

        <View style={styles.loginSection}>
          <TextInput
            placeholder={loginType === 'phone' ? 'Phone Number' : 'Email'}
            keyboardType={loginType === 'phone' ? 'phone-pad' : 'email-address'}
            placeholderTextColor={theme.placeholder || '#999'}
            style={[styles.input, {
              backgroundColor: theme.inputBackground,
              color: theme.text,
              borderColor: isDark ? 'transparent' : '#ccc',
              borderWidth: isDark ? 0 : 1,
              ...(!isDark ? styles.lightShadow : {}),
            }]}
            value={credentials.loginId}
            onChangeText={(text) => handleChange('loginId', text)}
          />

          <View style={styles.passwordContainer}>
            {isOTPLogin ? (
              <TextInput
                placeholder="OTP"
                placeholderTextColor={theme.placeholder || '#999'}
                style={[styles.input, {
                  backgroundColor: theme.inputBackground,
                  color: theme.text,
                  borderColor: isDark ? 'transparent' : '#ccc',
                  borderWidth: isDark ? 0 : 1,
                  ...(!isDark ? styles.lightShadow : {}),
                }]}
                keyboardType="numeric"
                value={credentials.otp}
                onChangeText={(text) => handleChange('otp', text)}
              />
            ) : (
              <View style={styles.passwordWrapper}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={theme.placeholder || '#999'}
                  style={[styles.input, {
                    width: '100%',
                    backgroundColor: theme.inputBackground,
                    color: theme.text,
                    borderColor: isDark ? 'transparent' : '#ccc',
                    borderWidth: isDark ? 0 : 1,
                    ...(!isDark ? styles.lightShadow : {}),
                  }]}
                  secureTextEntry={!showPassword}
                  value={credentials.password}
                  onChangeText={(text) => handleChange('password', text)}
                />
                <TouchableOpacity
                  style={{ position: 'absolute', right: 14, top: 14 }}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye color={theme.text} size={24} /> : <EyeOff color={theme.text} size={24} />}
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.optionsRow}>
            <View style={styles.rememberMe}>
              <Switch
                value={rememberMe}
                onValueChange={() => setRememberMe(!rememberMe)}
                thumbColor={rememberMe ? '#ffffff' : '#f4f3f4'}
                trackColor={{ false: '#d1d1d1', true: '#2563eb' }}
              />
              <Text style={[styles.rememberText, { color: theme.text }]}>Remember Me</Text>
            </View>
            <TouchableOpacity>
              <Text style={[styles.forgotPassword]}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, !isDark && styles.lightShadow, { backgroundColor: CustomColor.ORANGE_60 }]}
            onPress={handleLogin}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.loginOptionContainer}>
            <Text style={styles.orText}>Or Login with</Text>
            <TouchableOpacity onPress={() => setIsOTPLogin(!isOTPLogin)}>
              <Text style={styles.OTPText}>{isOTPLogin ? 'Password' : 'OTP'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.iconButton} onPress={handleLoginViaGoogle}>
              <Image source={require('../../assets/google.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Image source={require('../../assets/mac-os.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Image source={require('../../assets/windows-10.png')} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.signupPrompt, { color: theme.text }]}>Don’t have an account?{' '}
            <Text style={styles.signupLink} onPress={handleGoogleLogout}>Sign Up</Text>
          </Text>

          <Text style={[styles.signupPrompt, { color: theme.text, marginTop: 12 }]}>Admin?{' '}
            <Text
              style={styles.signupLink}
              onPress={() => {
                navigation.navigate('AdminLogin');
                dispatch({ type: 'SET_LOGIN_TYPE', payload: 'admin' });
              }}
            >Log In</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 24, fontWeight: '400', marginBottom: 20 },
  loginSection: { flex: 1, justifyContent: 'center' },
  input: { padding: 14, borderRadius: 12, fontSize: 16, marginBottom: 14 },
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' },
  rememberMe: { flexDirection: 'row', alignItems: 'center' },
  rememberText: { marginLeft: 6 },
  forgotPassword: { color: '#2563eb', fontWeight: '600' },
  loginButton: { borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 16 },
  loginText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  loginOptionContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 20 },
  orText: { fontSize: 16, color: '#555' },
  OTPText: { fontSize: 16, color: '#1e90ff', fontWeight: 'bold', marginLeft: 8 },
  signupPrompt: { textAlign: 'center' },
  signupLink: { color: '#2563eb', fontWeight: '600' },
  socialRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  iconButton: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3 },
      android: { elevation: 3 },
    }),
  },
  socialIcon: { width: 28, height: 28, resizeMode: 'contain' },
  passwordContainer: { marginBottom: 14 },
  passwordWrapper: { flexDirection: 'row', position: 'relative' },
  lightShadow: {
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
      android: { elevation: 2 },
    }),
  },
});
