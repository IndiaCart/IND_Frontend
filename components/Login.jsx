import { ThemeContext } from '../design/ThemeContext';
import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Switch,
    Image,
    Platform
} from 'react-native';
import { CustomColor } from '../design/Color';

const Login = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [loginType, setLoginType] = useState('phone');
    const [credentials, setCredentials] = useState({ loginId: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const isDark = theme.mode === "dark";

    // Update input field values
    const handleChange = (name, value) => {
        setCredentials({ ...credentials, [name]: value });
    };

    // Dummy login handler
    const handleLogin = () => {
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Home');
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: isDark ? theme.background : CustomColor.GREY_10 }
            ]}
        >
            {/* Title */}
            <Text style={[styles.title, { color: theme.text }]}>
                Log in to Your{'\n'}
                <Text style={{ fontWeight: 'bold' }}>IndiaCart Account!</Text>
            </Text>

            <View style={styles.loginSection}>
                {/* Login ID Input */}
                <TextInput
                    placeholder={loginType === 'phone' ? 'Phone Number' : 'Email'}
                    keyboardType={loginType === 'phone' ? 'phone-pad' : 'email-address'}
                    placeholderTextColor={theme.placeholder || '#999'}
                    style={[
                        styles.input,
                        {
                            backgroundColor: theme.inputBackground,
                            color: theme.text,
                            borderColor: isDark ? 'transparent' : '#ccc',
                            borderWidth: isDark ? 0 : 1,
                            ...(!isDark ? styles.lightShadow : {})
                        },
                    ]}
                    value={credentials.loginId}
                    onChangeText={(text) => handleChange('loginId', text)}
                />

                {/* Password Input with Toggle */}
                <View
                    style={[
                        styles.passwordRow,
                        {
                            backgroundColor: theme.inputBackground,
                            borderColor: isDark ? 'transparent' : '#ccc',
                            borderWidth: isDark ? 0 : 1,
                            ...(!isDark ? styles.lightShadow : {})
                        },
                    ]}
                >
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={theme.placeholder || '#999'}
                        style={[styles.passwordInput, { color: theme.text }]}
                        secureTextEntry={!showPassword}
                        value={credentials.password}
                        onChangeText={(text) => handleChange('password', text)}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
                    </TouchableOpacity>
                </View>

                {/* Remember Me + Forgot Password */}
                <View style={styles.optionsRow}>
                    <View style={styles.rememberMe}>
                        <Switch
                            value={rememberMe}
                            onValueChange={() => setRememberMe(!rememberMe)}
                            thumbColor={rememberMe ? '#ffffff' : '#f4f3f4'}
                            trackColor={{ false: '#d1d1d1', true: "#2563eb" }}
                        />
                        <Text style={[styles.rememberText, { color: theme.text }]}>
                            Remember Me
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={[styles.forgotPassword]}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                    style={[
                        styles.loginButton,
                        !isDark && styles.lightShadow,
                        { backgroundColor: CustomColor.ORANGE_60 }
                    ]}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                {/* OTP Login Option */}
                <View style={styles.loginOptionContainer}>
                    <Text style={styles.orText}>Or Login with</Text>
                    <TouchableOpacity>
                        <Text style={styles.OTPText}> OTP</Text>
                    </TouchableOpacity>
                </View>

                {/* Social Media Login */}
                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../assets/google.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../assets/mac-os.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../assets/windows-10.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                </View>

                {/* Signup Prompt */}
                <Text style={[styles.signupPrompt, { color: theme.text }]}>
                    Don’t have an account?{' '}
                    <Text
                        style={styles.signupLink}
                        onPress={() => navigation.navigate('Signup')}
                    >
                        Sign Up
                    </Text>
                </Text>

                {/* Admin Prompt */}
                <Text style={[styles.signupPrompt, { color: theme.text, marginTop: 12 }]}>
                    Admin?{' '}
                    <Text
                        style={styles.signupLink}
                        onPress={() => navigation.navigate('AdminLogin')}
                    >
                        Log In
                    </Text>{' '}
                    |{' '}
                    <Text
                        style={styles.signupLink}
                        onPress={() => navigation.navigate('AdminSignup')}
                    >
                        Sign Up
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default Login;

// ==========================
// Styles
// ==========================
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '400',
        marginBottom: 20,
    },
    loginSection: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        padding: 14,
        borderRadius: 12,
        fontSize: 16,
        marginBottom: 14,
    },
    passwordRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 14,
        paddingHorizontal: 10,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
    },
    eyeIcon: {
        fontSize: 18,
        marginLeft: 10,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        alignItems: 'center',
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberText: {
        marginLeft: 6,
    },
    forgotPassword: {
        color: '#2563eb',
        fontWeight: '600',
    },
    loginButton: {
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    loginText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    loginOptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    orText: {
        fontSize: 16,
        color: '#555',
    },
    OTPText: {
        fontSize: 16,
        color: '#1e90ff',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    signupPrompt: {
        textAlign: 'center',
    },
    signupLink: {
        color: '#2563eb',
        fontWeight: '600',
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
    },
    socialIcon: {
        width: 24,
        height: 24,
    },
    lightShadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 2,
            },
        }),
    },
});
