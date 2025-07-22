import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const [credentials, setCredentials] = useState({ loginId: '', password: '' });

    const handleChange = (name, value) => {
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = async () => {
        try {
            console.log('Attempting to log in with:', credentials);

            /*
            const response = await fetch('https://mobzway-task01.onrender.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
                credentials: 'include',
            });
            */
            // const data = await response.json();
            // console.log('Server Response:', data);

            if (true) {
                Alert.alert('Success', 'Login successful!');
                navigation.navigate('Home');
            } else {
                Alert.alert('Login Failed', data.error || 'Unknown error');
            }
        } catch (error) {
            console.error('Login Error:', error);
            Alert.alert('Error', 'Error logging in! Check console for details.');
        }
    };

    const handleSignUp = () => {
        navigation.navigate('Signup');
    };

    const handleHome = () => {
        navigation.navigate('Home');
    };

    const handleOtp = () => {
        navigation.navigate('Otp');
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <TouchableOpacity onPress={handleHome} style={styles.homeButton}>
                    <Text style={styles.homeIcon}>🏠</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Login</Text>

                <TextInput
                    placeholder="Login With Email or Phone"
                    value={credentials.loginId}
                    onChangeText={(text) => handleChange('loginId', text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    value={credentials.password}
                    onChangeText={(text) => handleChange('password', text)}
                    style={styles.input}
                />

                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.otpText}>
                    Login with otp
                    <Text onPress={handleOtp} style={styles.otpLink}>
                        Sign Up with OTP
                    </Text>
                </Text>

                <Text style={styles.signupText}>
                    New User?{' '}
                    <Text onPress={handleSignUp} style={styles.signupLink}>
                        Sign Up
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0e7ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 20,
        width: '90%',
        elevation: 6,
        position: 'relative',
    },
    homeButton: {
        position: 'absolute',
        top: 16,
        left: 16,
    },
    homeIcon: {
        fontSize: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: '#1e293b',
    },
    input: {
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 10,
        padding: 14,
        marginVertical: 10,
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 16,
    },
    loginText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    signupText: {
        marginTop: 16,
        textAlign: 'center',
        color: '#64748b',
    },
    signupLink: {
        color: '#2563eb',
        fontWeight: 'bold',
    },
});
