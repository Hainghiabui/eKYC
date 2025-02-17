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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const Login2Screen = () => {
    const [ email, setEmail ] = useState('');
    const [ isFocused, setIsFocused ] = useState(false);
    const navigation = useNavigation<NavigationProp<any>>();

    const handleSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            Alert.alert('Thông báo', 'Vui lòng nhập email của bạn.');
            return;
        }

        if (!emailRegex.test(email)) {
            Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ email hợp lệ.');
            return;
        }
        navigation.navigate('Login3');
    };

    const handleSocialLogin = (provider: 'facebook' | 'google' | 'apple') => {
        // Implement social login logic
        console.log(`${provider} login pressed`);
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
                    <Text style={styles.title}>Nhập email của bạn</Text>
                    <Text style={styles.subtitle}>
                        Chúng tôi sẽ gửi mã xác thực đến email của bạn
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            isFocused && styles.inputFocused
                        ]}
                        placeholder="Email"
                        placeholderTextColor="#94a3b8"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    activeOpacity={0.9}
                >
                    <LinearGradient
                        colors={[ '#1e40af', '#3b82f6' ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.submitButtonText}>TIẾP TỤC</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>hoặc tiếp tục với</Text>
                    <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialButtons}>
                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={() => handleSocialLogin('facebook')}
                    >
                        <Image
                            source={require('../../assets/images/logoFB.png')}
                            style={styles.img} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={() => handleSocialLogin('google')}
                    >
                        <Image
                            source={require('../../assets/images/logoGG.png')}
                            style={styles.img} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={() => handleSocialLogin('apple')}
                    >
                        <Image
                            source={require('../../assets/images/logoApple.png')}
                            style={styles.img} />
                    </TouchableOpacity>
                </View>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Chưa có tài khoản? </Text>
                    <TouchableOpacity onPress={() => console.log('Sign up pressed')}>
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
        marginBottom: height * 0.03,
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
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.04,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E5E5',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#666666',
        fontSize: 14,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: height * 0.04,
    },
    socialButton: {
        paddingHorizontal: 35,
        paddingVertical: 13,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
    },
    signupText: {
        color: '#000000',
        fontSize: 14,
    },
    signupLink: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '600',
    },
    img: {
        width: 30,
        height: 30,
    }
});

export default Login2Screen;

