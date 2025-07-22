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
    Image
} from 'react-native';
import { CustomColor } from '../design/Color';

const Login = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [loginType, setLoginType] = useState('phone');
    const [credentials, setCredentials] = useState({ loginId: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const handleChange = (name, value) => {
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = () => {
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Home');
    };

    return (
        <View style={[{ backgroundColor: theme.mode =="dark"? theme.background:CustomColor.WHITE_COOL }, styles.container]}>
            <Text style={[{ color: theme.text }, styles.title]}>
                Log in to Your{'\n'}
                <Text style={{ fontWeight: 'bold', color: theme.text }}>IndiaCart Account!</Text>
            </Text>

            {/* Tab Switch */}
            <View style={styles.tabContainer}>
                <View style={[styles.tabBackground, { backgroundColor: theme.inputBackground }]}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            loginType === 'phone' && { backgroundColor: theme.primary },
                        ]}
                        onPress={() => setLoginType('phone')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                {
                                    color: loginType === 'phone' ? CustomColor.CYAN_50 : theme.text,
                                },
                            ]}
                        >
                            Phone
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            loginType === 'email' && { backgroundColor: theme.primary },
                        ]}
                        onPress={() => setLoginType('email')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                {
                                    color: loginType === 'email' ? CustomColor.CYAN_50  : theme.text,
                                },
                            ]}
                        >
                            Email
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Inputs */}
            <TextInput
                placeholder={loginType === 'phone' ? 'Phone Number' : 'Email'}
                keyboardType={loginType === 'phone' ? 'phone-pad' : 'email-address'}
                placeholderTextColor={theme.placeholder || '#999'}
                style={[
                    styles.input,
                    { backgroundColor: theme.inputBackground, color: theme.text },
                ]}
                value={credentials.loginId}
                onChangeText={(text) => handleChange('loginId', text)}
            />

            <View
                style={[
                    styles.passwordRow,
                    { backgroundColor: theme.inputBackground },
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
                        thumbColor={rememberMe ? '#2563eb' : '#ccc'}
                    />
                    <Text style={[styles.rememberText, { color: theme.text }]}>
                        Remember Me
                    </Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            {/* Login */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Or continue with</Text>

            {/* Google Login */}
            <TouchableOpacity style={styles.googleButton}>
                <Image
                    source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }}
                    style={{ width: 20, height: 20, marginRight: 10 }}
                />
                <Text style={styles.googleText}>Login with Google</Text>
            </TouchableOpacity>

            {/* Sign up */}
            <Text style={[styles.signupPrompt, { color: theme.text }]}>
                Don’t have an account?{' '}
                <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
                    Sign Up
                </Text>
            </Text>
        </View>
    );
};

export default Login;

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

    // Tab Switch Style
    tabContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    tabBackground: {
        flexDirection: 'row',
        borderRadius: 30,
        padding: 4,
        width: '100%',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
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
        backgroundColor: '#2563eb',
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
    orText: {
        color: '#aaa',
        textAlign: 'center',
        marginBottom: 16,
    },
    googleButton: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    googleText: {
        fontWeight: '600',
        fontSize: 16,
    },
    signupPrompt: {
        textAlign: 'center',
    },
    signupLink: {
        color: '#2563eb',
        fontWeight: '600',
    },
});
