import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const Login1Screen = () => {
    const navigation = useNavigation<NavigationProp<any>>();

    const handleFacebookLogin = () => {
        // Implement Facebook login logic
        console.log('Facebook login pressed');
    };

    const handleGoogleLogin = () => {
        // Implement Google login logic
        console.log('Google login pressed');
    };

    const handlePasswordLogin = () => {
        navigation.navigate('Login2');
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <FontAwesome6 name="arrow-left-long" size={24} />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.title}>Let's you in</Text>

                <View style={styles.socialButtons}>
                    <TouchableOpacity
                        style={[ styles.socialButton, styles.facebookButton ]}
                        onPress={handleFacebookLogin}
                    >
                        <Image
                            source={require('../../assets/images/logoFB.png')}
                            style={styles.img} />
                        <Text style={styles.socialButtonText}>
                            Continue with Facebook
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[ styles.socialButton, styles.googleButton ]}
                        onPress={handleGoogleLogin}
                    >
                        <Image
                            source={require('../../assets/images/logoGG.png')}
                            style={styles.img} />
                        <Text style={styles.socialButtonText}>
                            Continue with Google
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or</Text>
                    <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                    style={styles.passwordButton}
                    onPress={handlePasswordLogin}
                >
                    <Text style={styles.passwordButtonText}>
                        SIGN IN WITH PASSWORD
                    </Text>
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account? </Text>
                    <TouchableOpacity>
                        <Text style={styles.signupLink}>Sign up</Text>
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
    backButtonText: {
        fontSize: 24,
        color: '#000000',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 32,
        color: '#000000',
    },
    socialButtons: {
        gap: 16,
        marginBottom: 24,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
    },
    facebookButton: {
        backgroundColor: '#F1F1FF',
    },
    googleButton: {
        backgroundColor: '#E8F5E9',
    },
    socialButtonText: {
        fontSize: 16,
        color: '#000000',
        marginLeft: 12,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
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
    passwordButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 24,
    },
    passwordButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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

export default Login1Screen;