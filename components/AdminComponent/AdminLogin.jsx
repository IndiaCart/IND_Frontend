import React, { useContext, useState, useRef } from 'react';
import { HOSTED_URL } from '@env';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { ThemeContext } from '../../design/ThemeContext';
import { CustomColor } from '../../design/Color';
import { Eye, EyeOff } from 'lucide-react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import LoginSkeleton from '../Shimmer/LoginSkeleton';
import detectLoginType from '../../utils/detectLoginType';

const OTP_LENGTH = 6;

const AdminLogin = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [mode, setMode] = useState('password');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.user)

  const otpInputs = useRef([]);
  const isEmail = loginId.includes('@');
  const idField = isEmail ? 'email' : 'phone';

  const sendOtp = async () => {
    if (!loginId) return;
    try {
      await axios.post(`${HOSTED_URL}/api/v1/auth/sendOtpForLogin`, { [idField]: loginId });
      setOtpSent(true);
      otpInputs.current[0]?.focus();
    } catch {
      // handle error
    } finally {
    }
  };

  const verifyOtp = async () => {
    const code = otp.join('');
    if (code.length < OTP_LENGTH) return;
    dispatch({ type: "START_LOADING" })
    try {
      const response = await axios.post(`${HOSTED_URL}/api/v1/auth/admin/verify-otp`, { [idField]: loginId, otp: code });
      dispatch({ type: "START_LOADING" })
    } catch {
      dispatch({ type: "STOP_LOADING" })
    } finally {
      dispatch({ type: "STOP_LOADING" })
    }
  };
  // Login via Email/phone with password
  const handleLogin = async () => {
    if (!loginId || !password) return;
    const idField = detectLoginType(loginId);
    dispatch({ type: "START_LOADING" })
    try {
      const response = await axios.post(`${HOSTED_URL}/api/v1/auth/admin`, { [idField]: loginId, password });
      if (response.data.success) {
        dispatch({ type: "EMAIL_PASSWORD_LOGIN_SUCCESS", payload: response.data })
      } else {
        dispatch({ type: "STOP_LOADING" })
      }
    } catch {
      dispatch({ type: "STOP_LOADING" })
    } finally {

    }
  };

  const handleOtpInput = (text, idx) => {
    const newOtp = [...otp];
    newOtp[idx] = text;
    setOtp(newOtp);
    if (text && idx < OTP_LENGTH - 1) otpInputs.current[idx + 1]?.focus();
    if (newOtp.every(d => d)) verifyOtp();
  };

  if (loading) return <LoginSkeleton />;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <Text style={[styles.header, { color: theme.text }]}>Admin Portal</Text>
        <View style={[styles.segmentedControl, { backgroundColor: theme.inputBackground }]}>
          <TouchableOpacity
            style={[styles.segment, mode === 'password' && { backgroundColor: CustomColor.CYAN_80 }]}
            onPress={() => { setMode('password'); setOtpSent(false); }}
          >
            <Text style={[styles.segmentText, mode === 'password' && { color: '#fff' }]}>Password</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="Email or Phone"
            value={loginId}
            onChangeText={setLoginId}
            keyboardType={'email-address'}
            placeholderTextColor={theme.placeholder}
            style={[styles.input, { borderColor: theme.border, color: theme.text }]}
          />

          {mode === 'password' && (
            <View style={[styles.inputRow, { borderColor: theme.border }]}>
              <TextInput
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor={theme.placeholder}
                style={[styles.input, { flex: 1 }]}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} color={theme.text} /> : <Eye size={20} color={theme.text} />}
              </TouchableOpacity>
            </View>
          )}

          {mode === 'otp' && otpSent && (
            <View style={styles.otpContainer}>
              {otp.map((digit, idx) => (
                <TextInput
                  key={idx}
                  ref={ref => otpInputs.current[idx] = ref}
                  value={digit}
                  onChangeText={text => handleOtpInput(text, idx)}
                  keyboardType="numeric"
                  maxLength={1}
                  style={[styles.otpBox, { borderColor: theme.border, color: theme.text }]}
                />
              ))}
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.button,
              mode === 'otp' ? { backgroundColor: CustomColor.ORANGE_60 } : { backgroundColor: CustomColor.CYAN_80 }
            ]}
            onPress={
              mode === 'password' ? handleLogin : otpSent ? verifyOtp : sendOtp
            }
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {mode === 'password'
                ? 'Login'
                : otpSent
                  ? 'Verify OTP'
                  : 'Send OTP'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={""}
            onPress={() => { setMode('otp'); setPassword(''); setOtpSent(false); }}
          > <Text>Or Login with <Text style={[styles.segmentText, mode === 'otp' && { color: theme.text }]}>OTP</Text> </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default AdminLogin;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  header: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 30 },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    alignSelf: 'center',
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  segmentText: { fontSize: 16 },
  form: { width: '100%' },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,

  },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  otpBox: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
