import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.background}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../assets/images/BG.png')}
                            style={styles.img} />
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.logoText}>eKYC</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>GET STARTED</Text>
                    </TouchableOpacity>
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login1')}>
                            <Text style={styles.loginLink}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
    },
    img: {
        width: width,
        height: width,
        resizeMode: 'contain',
    },
    footer: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        paddingHorizontal: 30,
        paddingVertical: 40,
        paddingBottom: 100,
    },
    logoText: {
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#192f6a',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    button: {
        backgroundColor: '#005bea',
        borderRadius: 15,
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        paddingVertical: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 1,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    loginText: {
        color: '#333',
        fontSize: 16,
    },
    loginLink: {
        color: '#005bea',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default OnboardingScreen;