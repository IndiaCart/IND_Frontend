import { ThemeContext } from '../../design/ThemeContext';
import React, { useContext, useState } from 'react';
import { Eye ,EyeOff } from 'lucide-react-native';
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
import { CustomColor } from '../../design/Color';
import { useDispatch } from 'react-redux';


const AdminLogin = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme.mode === "dark";
    const dispatch = useDispatch();
    const [loginType, setLoginType] = useState('phone');
    const [credentials, setCredentials] = useState({ loginId: '', password: '', otp: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [isOTPLogin, setIsOTPLogin] = useState(false);

    // Handle input changes
    const handleChange = (key, value) => {
        setCredentials({ ...credentials, [key]: value });
    };

    // Dummy login handler
    const handleLogin = () => {
        navigation.navigate('AdminChannel');
    };

    return (
        <View style={[
            styles.container,
            { backgroundColor: isDark ? theme.background : CustomColor.GREY_10 }
        ]}>
            {/* Title */}
            <Text style={[styles.title, { color: theme.text }]}>
                Admin Log in to Your{'\n'}
                <Text style={{ fontWeight: 'bold' }}>IndiaCart Account!</Text>
            </Text>

            <View style={styles.loginSection}>
                {/* Login ID input (phone/email) */}
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
                        }
                    ]}
                    value={credentials.loginId}
                    onChangeText={(text) => handleChange('loginId', text)}
                />

                {/* Password Input with Toggle */}
                <View style={styles.passwordContainer}>
                    {isOTPLogin ? (
                        <View style={styles.otpWrapper}>
                            <TextInput
                                placeholder="OTP"
                                placeholderTextColor={theme.placeholder || '#999'}
                                style={[styles.otpInput, { color: theme.text }]}
                                keyboardType="numeric"
                                value={credentials.otp}
                                onChangeText={(text) => handleChange('otp', text)}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                { showPassword ?<Eye color={theme.text} size={24} />:
                                                                <EyeOff color={theme.text} size={24} />}
                            </TouchableOpacity>
                        </View>

                    ) : (
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={theme.placeholder || '#999'}
                                style={[styles.passwordInput, { color: theme.text }]}
                                secureTextEntry={!showPassword}
                                value={credentials.password}
                                onChangeText={(text) => handleChange('password', text)}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                               { showPassword ?<Eye color={theme.text} size={24} />:
                                                               <EyeOff color={theme.text} size={24} />}
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Remember Me & Forgot Password */}
                <View style={styles.optionsRow}>
                    <View style={styles.rememberMe}>
                        <Switch
                            value={rememberMe}
                            onValueChange={() => setRememberMe(!rememberMe)}
                            thumbColor={rememberMe ? '#2563eb' : '#ccc'}
                            trackColor={{ false: '#d1d1d1', true: "#2563eb" }}
                        />
                        <Text style={[styles.rememberText, { color: theme.text }]}>Remember Me</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Login button */}
                <TouchableOpacity
                    style={[
                        styles.loginButton,
                        !isDark && styles.lightShadow,
                        { backgroundColor: CustomColor.CYAN_80 }
                    ]}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                {/* OTP Login Option */}
                <View style={styles.loginOptionContainer}>
                    <Text style={styles.orText}>Or Login with</Text>
                    <TouchableOpacity onPress={() => setIsOTPLogin(!isOTPLogin)}>
                        <Text style={styles.OTPText}>{isOTPLogin ? 'Password' : 'OTP'}</Text>
                    </TouchableOpacity>
                </View>

                {/* Social login icons */}
                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../../assets/google.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../../assets/mac-os.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image source={require('../../assets/windows-10.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                </View>

                {/* Navigation to user login/signup */}
                <Text style={[styles.signupPrompt, { color: theme.text, marginTop: 12 }]}>
                    User ?{' '}
                    <Text
                        style={styles.signupLink}
                        onPress={() => {navigation.navigate('Login'),  dispatch({type:"SET_LOGIN_TYPE", payload:"user"})}}
                    >
                        Log In
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default AdminLogin;

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
    passwordContainer: {
        marginBottom: 14,
    },

    otpWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },

    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },

    otpInput: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
    },

    passwordInput: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
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
