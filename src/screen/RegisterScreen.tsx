import React, { useState, useRef } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity,
    SafeAreaView, Dimensions, Alert, Animated, Keyboard
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase/config';
import { RootStackParamList } from '../@type';

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [ formData, setFormData ] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [ isPasswordVisible, setIsPasswordVisible ] = useState({
        password: false,
        confirmPassword: false
    });
    const [ isFocused, setIsFocused ] = useState({
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false
    });
    const [ loading, setLoading ] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleFocus = (field: string) => {
        setIsFocused(prev => ({ ...prev, [ field ]: true }));
    };

    const handleBlur = (field: string) => {
        setIsFocused(prev => ({ ...prev, [ field ]: false }));
    };

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleRegister = async () => {
        Keyboard.dismiss();
        animateButton();

        if (!validateForm()) return;

        try {
            setLoading(true);
            const { email, password, fullName } = formData;

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: fullName });
            await sendEmailVerification(userCredential.user);

            Alert.alert(
                'Xác thực email',
                'Vui lòng kiểm tra email để xác thực tài khoản của bạn.',
                [ { text: 'OK', onPress: () => navigation.navigate('Login2') } ]
            );
        } catch (error: any) {
            let message = 'Đã có lỗi xảy ra';
            if (error.code === 'auth/email-already-in-use') {
                message = 'Email này đã được sử dụng';
            }
            Alert.alert('Lỗi', message);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const { fullName, email, password, confirmPassword } = formData;
        if (!fullName.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập họ và tên');
            return false;
        }
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            Alert.alert('Lỗi', 'Vui lòng nhập email hợp lệ');
            return false;
        }
        if (password.length < 6) {
            Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }
        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
            return false;
        }
        return true;
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
                    <Text style={styles.title}>Tạo tài khoản</Text>
                    <Text style={styles.subtitle}>
                        Nhập thông tin của bạn để đăng ký
                    </Text>
                </View>

                <View style={styles.form}>
                    <TextInput
                        style={[ styles.input, isFocused.fullName && styles.inputFocused ]}
                        placeholder="Họ và tên"
                        value={formData.fullName}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
                        onFocus={() => handleFocus('fullName')}
                        onBlur={() => handleBlur('fullName')}
                        placeholderTextColor="#94a3b8"
                    />

                    <TextInput
                        style={[ styles.input, isFocused.email && styles.inputFocused ]}
                        placeholder="Email"
                        value={formData.email}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#94a3b8"
                    />

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[ styles.input, isFocused.password && styles.inputFocused ]}
                            placeholder="Mật khẩu"
                            value={formData.password}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                            onFocus={() => handleFocus('password')}
                            onBlur={() => handleBlur('password')}
                            secureTextEntry={!isPasswordVisible.password}
                            placeholderTextColor="#94a3b8"
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setIsPasswordVisible(prev => ({
                                ...prev,
                                password: !prev.password
                            }))}
                        >
                            <FontAwesome6
                                name={isPasswordVisible.password ? 'eye' : 'eye-slash'}
                                size={20}
                                color="#94a3b8"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[ styles.input, isFocused.confirmPassword && styles.inputFocused ]}
                            placeholder="Xác nhận mật khẩu"
                            value={formData.confirmPassword}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                            onFocus={() => handleFocus('confirmPassword')}
                            onBlur={() => handleBlur('confirmPassword')}
                            secureTextEntry={!isPasswordVisible.confirmPassword}
                            placeholderTextColor="#94a3b8"
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setIsPasswordVisible(prev => ({
                                ...prev,
                                confirmPassword: !prev.confirmPassword
                            }))}
                        >
                            <FontAwesome6
                                name={isPasswordVisible.confirmPassword ? 'eye' : 'eye-slash'}
                                size={20}
                                color="#94a3b8"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <Animated.View style={[ styles.buttonContainer, { transform: [ { scale: scaleAnim } ] } ]}>
                    <TouchableOpacity
                        onPress={handleRegister}
                        disabled={loading}
                        style={styles.registerButton}
                        activeOpacity={0.9}
                    >
                        <LinearGradient
                            colors={[ '#1e40af', '#3b82f6' ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradient}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG KÝ'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Đã có tài khoản? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login2')}>
                        <Text style={styles.loginLink}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
    },
    form: {
        gap: 16,
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
    buttonContainer: {
        marginTop: height * 0.04,
    },
    registerButton: {
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#1e40af',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    gradient: {
        paddingVertical: height * 0.022,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: width * 0.04,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.03,
    },
    loginText: {
        color: '#64748b',
        fontSize: width * 0.04,
    },
    loginLink: {
        color: '#1e40af',
        fontSize: width * 0.04,
        fontWeight: '600',
    },
});

export default RegisterScreen;