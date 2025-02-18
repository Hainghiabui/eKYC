import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Dimensions,
    Animated,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const VerifyIdentityScreen = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

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

            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [ { translateY: slideAnim } ]
                    }
                ]}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Xác minh danh tính</Text>
                    <Text style={styles.description}>
                        Chúng tôi cần xác minh danh tính của bạn trước khi sử dụng ứng dụng.
                        Thông tin của bạn sẽ được mã hóa và bảo mật an toàn.
                    </Text>
                </View>

                <View style={styles.illustrationContainer}>
                    <LinearGradient
                        colors={[ 'rgba(59,130,246,0.1)', 'rgba(59,130,246,0.05)' ]}
                        style={styles.imageWrapper}
                    >
                        <Image
                            source={require("../assets/images/idCard.png")}
                            style={styles.illustration}
                            resizeMode="contain"
                        />
                    </LinearGradient>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.verifyButton}
                        onPress={() => navigation.navigate("ProofOfResidencyScreen")}
                        activeOpacity={0.9}
                    >
                        <LinearGradient
                            colors={[ '#1e40af', '#3b82f6' ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.verifyButtonText}>XÁC MINH NGAY</Text>
                            <FontAwesome6 name="arrow-right" size={16} color="#ffffff" style={styles.buttonIcon} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        padding: width * 0.04,
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
        marginBottom: height * 0.02,
        lineHeight: width * 0.11,
    },
    description: {
        fontSize: width * 0.04,
        color: '#64748b',
        lineHeight: width * 0.06,
    },
    illustrationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageWrapper: {
        padding: width * 0.06,
        borderRadius: width * 0.06,
        backgroundColor: 'rgba(59,130,246,0.05)',
    },
    illustration: {
        width: width * 0.7,
        height: width * 0.5,
    },
    buttonContainer: {
        paddingBottom: height * 0.05,
    },
    verifyButton: {
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#1e40af',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        overflow: 'hidden',
    },
    gradientButton: {
        padding: height * 0.022,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    verifyButtonText: {
        color: '#FFFFFF',
        fontSize: width * 0.04,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    buttonIcon: {
        marginLeft: width * 0.02,
    },
});

export default VerifyIdentityScreen;