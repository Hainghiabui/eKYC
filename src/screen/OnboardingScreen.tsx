import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Animated,
    StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../@type';

const { width, height } = Dimensions.get('window');

const BackgroundCircles = () => (
    <View style={styles.bgCircles}>
        <LinearGradient
            colors={[ 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)' ]}
            style={[ styles.circle, { top: height * 0.1, left: -width * 0.2 } ]}
        />
        <LinearGradient
            colors={[ 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)' ]}
            style={[ styles.circle, { top: height * 0.3, right: -width * 0.3 } ]}
        />
        <LinearGradient
            colors={[ 'rgba(59,130,246,0.1)', 'rgba(59,130,246,0.05)' ]}
            style={[ styles.circle, { bottom: height * 0.15, left: -width * 0.3 } ]}
        />
    </View>
);

const OnboardingScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;


    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleGetStarted = () => {
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 0.95,
                friction: 5,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start(() => {
            navigation.navigate('RegisterScreen');
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
            <LinearGradient
                colors={[ '#1a365d', '#2563eb', '#3b82f6' ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.backgroundGradient}
            />
            <BackgroundCircles />
            <SafeAreaView style={styles.safeArea}>
                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: fadeAnim,
                            transform: [ { translateY: slideAnim } ]
                        }
                    ]}
                >
                    <View style={styles.header}>
                        <LinearGradient
                            colors={[ 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)' ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.headerGradient}
                        >
                            <Text style={styles.logoText}>eKYC</Text>
                            <View style={styles.taglineContainer}>
                                <Text style={styles.tagline}>An Toàn</Text>
                                <View style={styles.dot} />
                                <Text style={styles.tagline}>Nhanh Chóng</Text>
                                <View style={styles.dot} />
                                <Text style={styles.tagline}>Tin Cậy</Text>
                            </View>
                        </LinearGradient>
                    </View>

                    <View style={styles.background}>
                        <Animated.View
                            style={[
                                styles.imageContainer,
                                { transform: [ { scale: scaleAnim } ] }
                            ]}
                        >
                            <Image
                                source={require('../assets/images/BG.png')}
                                style={styles.img}
                            />
                        </Animated.View>
                    </View>

                    <View style={styles.footer}>
                        <LinearGradient
                            colors={[ 'rgba(255,255,255,0.95)', '#ffffff' ]}
                            style={[ styles.gradient, styles.footerShadow ]}
                        >
                            <Text style={styles.welcomeText}>Chào mừng đến với eKYC</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleGetStarted}
                                activeOpacity={0.85}
                            >
                                <LinearGradient
                                    colors={[ '#1e40af', '#3b82f6' ]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.buttonText}>BẮT ĐẦU</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <View style={styles.loginContainer}>
                                <LinearGradient
                                    colors={[ 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.2)' ]}
                                    style={styles.loginWrapper}
                                >
                                    <Text style={styles.loginText}>Đã có tài khoản? </Text>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Login1')}
                                        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                                        style={styles.loginButton}
                                    >
                                        <Text style={styles.loginLink}>Đăng nhập</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </LinearGradient>
                    </View>
                </Animated.View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a365d',
    },
    backgroundGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        paddingTop: height * 0.05,
        alignItems: 'center',
        // marginBottom: height * 0.04,
    },
    logoContainer: {
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: height * 0.02,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: width * 0.85,
        height: width * 0.85,
        resizeMode: 'contain',
    },
    footer: {
        backgroundColor: 'transparent',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
    },
    gradient: {
        paddingHorizontal: width * 0.08,
        paddingVertical: height * 0.04,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 20,
    },
    logoText: {
        fontSize: width * 0.12,
        fontWeight: 'bold',
        color: '#ffffff',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    tagline: {
        fontSize: width * 0.04,
        color: '#ffffff',
        opacity: 0.9,
        marginTop: 5,
        letterSpacing: 2,
    },
    welcomeText: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        color: '#1a365d',
        marginBottom: 10,
        textAlign: 'center',
    },
    descriptionText: {
        fontSize: width * 0.04,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: height * 0.03,
        lineHeight: width * 0.06,
    },
    button: {
        borderRadius: 16,
        marginVertical: height * 0.02,
        elevation: 8,
        shadowColor: '#1e40af',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        overflow: 'hidden',
    },
    buttonGradient: {
        paddingVertical: height * 0.022,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: width * 0.045,
        fontWeight: '700',
        letterSpacing: 1.2,
    },
    loginContainer: {
        alignItems: 'center',
    },
    loginWrapper: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    loginText: {
        color: '#1a365d',
        fontSize: width * 0.04,
    },
    loginButton: {
        padding: 4,
    },
    loginLink: {
        color: '#1e40af',
        fontSize: width * 0.04,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    bgCircles: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    circle: {
        position: 'absolute',
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
    },
    headerGradient: {
        padding: width * 0.06,
        borderRadius: width * 0.04,
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    taglineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.01,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginHorizontal: width * 0.02,
    },
    footerShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 24,
    },
});

export default OnboardingScreen;