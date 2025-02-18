import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Dimensions,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../@type';

const { width, height } = Dimensions.get('window');

const Login1Screen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleFacebookLogin = () => {
        console.log('Facebook login pressed');
    };

    const handleGoogleLogin = () => {
        console.log('Google login pressed');
    };

    const handlePasswordLogin = () => {
        navigation.navigate('Login2');
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
                <Text style={styles.title}>Đăng nhập ngay</Text>
                <Text style={styles.subtitle}>
                    Chọn phương thức đăng nhập phù hợp với bạn
                </Text>

                <View style={styles.socialButtons}>
                    <TouchableOpacity
                        style={[ styles.socialButton, styles.facebookButton ]}
                        onPress={handleFacebookLogin}
                        activeOpacity={0.8}
                    >
                        <Image
                            source={require('../../assets/images/logoFB.png')}
                            style={styles.img}
                        />
                        <Text style={styles.socialButtonText}>
                            Tiếp tục với Facebook
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[ styles.socialButton, styles.googleButton ]}
                        onPress={handleGoogleLogin}
                        activeOpacity={0.8}
                    >
                        <Image
                            source={require('../../assets/images/logoGG.png')}
                            style={styles.img}
                        />
                        <Text style={styles.socialButtonText}>
                            Tiếp tục với Google
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>hoặc</Text>
                    <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                    style={styles.passwordButton}
                    onPress={handlePasswordLogin}
                    activeOpacity={0.9}
                >
                    <LinearGradient
                        colors={[ '#1e40af', '#3b82f6' ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.passwordButtonText}>
                            ĐĂNG NHẬP BẰNG MẬT KHẨU
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Chưa có tài khoản? </Text>
                    <TouchableOpacity>
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
    title: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        marginBottom: height * 0.01,
        color: '#1e40af',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: width * 0.04,
        color: '#64748b',
        marginBottom: height * 0.04,
        textAlign: 'center',
    },
    socialButtons: {
        gap: height * 0.02,
        marginBottom: height * 0.03,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: height * 0.02,
        borderRadius: 16,
        marginVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    facebookButton: {
        backgroundColor: '#F1F1FF',
    },
    googleButton: {
        backgroundColor: '#E8F5E9',
    },
    socialButtonText: {
        fontSize: width * 0.04,
        color: '#1e293b',
        marginLeft: 12,
        fontWeight: '500',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.03,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e2e8f0',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#64748b',
        fontSize: width * 0.035,
        fontWeight: '500',
    },
    passwordButton: {
        borderRadius: 16,
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
    passwordButtonText: {
        color: '#FFFFFF',
        fontSize: width * 0.04,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.02,
    },
    signupText: {
        color: '#64748b',
        fontSize: width * 0.035,
    },
    signupLink: {
        color: '#1e40af',
        fontSize: width * 0.035,
        fontWeight: '600',
    },
    img: {
        width: width * 0.07,
        height: width * 0.07,
        resizeMode: 'contain',
    }
});

export default Login1Screen;