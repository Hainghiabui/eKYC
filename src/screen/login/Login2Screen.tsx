import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Dimensions,
    Image,
    Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const { width, height } = Dimensions.get('window');

const Login3Screen = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
    const [ isFocused, setIsFocused ] = useState({ email: false, password: false });
    const navigation = useNavigation<NavigationProp<any>>();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in user:', userCredential.user);
            navigation.navigate('Login3');
        } catch (error: any) {
            let errorMessage = 'Đã có lỗi xảy ra khi đăng nhập.';
            if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Email hoặc mật khẩu không đúng.';
            }
            Alert.alert('Lỗi', errorMessage);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={[ '#ffffff', '#f8faff' ]}
                style={StyleSheet.absoluteFill}
            />

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <FontAwesome6 name="arrow-left-long" size={24} color="#1e40af" />
            </TouchableOpacity>

            <View style={styles.content}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Đăng nhập</Text>
                    <Text style={styles.subtitle}>
                        Vui lòng đăng nhập để tiếp tục
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            isFocused.email && styles.inputFocused
                        ]}
                        placeholder="Email"
                        placeholderTextColor="#94a3b8"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
                        onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
                    />

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[
                                styles.input,
                                isFocused.password && styles.inputFocused
                            ]}
                            placeholder="Mật khẩu"
                            placeholderTextColor="#94a3b8"
                            secureTextEntry={!isPasswordVisible}
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                            onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            <FontAwesome6
                                name={isPasswordVisible ? 'eye' : 'eye-slash'}
                                size={20}
                                color="#94a3b8"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.forgotPassword}
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleLogin}
                    activeOpacity={0.9}
                >
                    <LinearGradient
                        colors={[ '#1e40af', '#3b82f6' ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.submitButtonText}>ĐĂNG NHẬP</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Chưa có tài khoản? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={styles.signupLink}>Đăng ký ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        padding: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: width * 0.06,
        paddingTop: height * 0.08,
    },
    headerContainer: {
        marginBottom: height * 0.04,
    },
    title: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        color: '#1e40af',
        marginBottom: height * 0.01,
    },
    subtitle: {
        fontSize: width * 0.04,
        color: '#64748b',
        lineHeight: width * 0.06,
    },
    inputContainer: {
        gap: 16,
        marginBottom: height * 0.02,
    },
    input: {
        height: height * 0.07,
        borderWidth: 1.5,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: width * 0.04,
        fontSize: width * 0.04,
        color: '#1e293b',
        backgroundColor: '#ffffff',
    },
    inputFocused: {
        borderColor: '#3b82f6',
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
    },
    passwordContainer: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: height * 0.023,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: height * 0.03,
    },
    forgotPasswordText: {
        color: '#3b82f6',
        fontSize: width * 0.04,
    },
    submitButton: {
        borderRadius: 12,
        marginBottom: height * 0.03,
        elevation: 4,
        shadowColor: '#1e40af',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        overflow: 'hidden',
    },
    gradientButton: {
        padding: height * 0.022,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: width * 0.04,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        paddingBottom: 40,
    },
    signupText: {
        color: '#000000',
        fontSize: 14,
    },
    signupLink: {
        color: '#3b82f6',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default Login3Screen;