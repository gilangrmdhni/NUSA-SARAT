import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import Modal from 'react-native-modal';

const BASE_URL = 'https://reqres.in/api';
const API_KEY = '59927e4dffe0be25f937';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                email,
                password,
            }, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                },
            });

            if (response.data.token) {
                console.log('Login berhasil:', response.data);
                navigation.navigate('Home');
            } else {
                if (response.data.error) {
                    console.error('Login gagal:', response.data.error);
                    setErrorMessage('Email atau kata sandi salah.');
                } else {
                    console.error('Login gagal: Tidak ada respons yang valid dari server');
                    setErrorMessage('Terjadi kesalahan saat mencoba login.');
                }

                setErrorVisible(true);
            }
        } catch (error) {
            console.error('Terjadi kesalahan saat mencoba login:', error);
            setErrorMessage('Terjadi kesalahan saat mencoba login.');
            setErrorVisible(true);
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logoSAIM.png')} style={styles.logo} />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <View style={styles.passwordInputContainer}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={styles.passwordInput}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <MaterialIcons
                        name={showPassword ? 'visibility' : 'visibility-off'}
                        size={24}
                        color="#C0142B"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity style={styles.forgotPasswordButton}>
                    <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Masuk</Text>
            </TouchableOpacity>
            <Modal
                isVisible={errorVisible}
                backdropOpacity={0.5}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                onBackdropPress={() => setErrorVisible(false)}
            >
                <View style={styles.errorModal}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                    <TouchableOpacity onPress={() => setErrorVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Tutup</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 30,
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '75%',
        padding: 20,
        marginBottom: 15,
        backgroundColor: '#FFE8E8',
        borderColor: '#ccc',
        borderRadius: 15,
        borderWidth: 0,

    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '75%',
        backgroundColor: '#FFE8E8',
        borderColor: '#ccc',
        borderRadius: 15,
        borderWidth: 0,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 20,
    },
    loginButton: {
        backgroundColor: '#F16877',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginTop: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    forgotPasswordContainer: {
        width: '75%',
        alignItems: 'flex-end',
    },
    forgotPasswordButton: {
        paddingBottom: 20,
    },
    forgotPasswordText: {
        color: 'black',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    errorModal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#F16877',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default LoginScreen;
