import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Dimensions,
    Image,
    Animated,
    Alert,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const { height } = Dimensions.get('window');

const Login2Screen = () => {
    const [ email, setEmail ] = useState('');
    const navigation = useNavigation<NavigationProp<any>>();

    const handleSubmit = () => {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            Alert.alert('Please enter your email.');
            return;
        }

        if (!emailRegex.test(email)) {
            Alert.alert('Please enter a valid email address.');
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
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <FontAwesome6 name="arrow-left-long" size={24} />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.title}>
                    Enter your email
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#999999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>SUBMIT</Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or continue with</Text>
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
                    <Text style={styles.signupText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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
        paddingTop: height * 0.08,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        // marginBottom: height * 0.05,
        // textAlign: 'center',
        marginTop: height * 0.05,
        lineHeight: 40,
    },
    inputContainer: {
        // marginBottom: height * 0.04,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000000',
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        // marginBottom: height * 0.04,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        transform: [ { scale: 1.02 } ],
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
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
        // backgroundColor: '#FFFFFF',
    },
    socialIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
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

