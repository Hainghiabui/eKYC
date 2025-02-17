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
import Entypo from 'react-native-vector-icons/Entypo';

const { height } = Dimensions.get('window');

const Login3Screen = () => {
    const [ password, setPassword ] = useState('');
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
    const navigation = useNavigation<NavigationProp<any>>();

    const handleSubmit = () => {
        if (!password) {
            Alert.alert('Please enter your password.');
            return;
        }


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
                <View style={styles.inforContainer}>
                    <Image
                        source={require('../../assets/images/avatar.png')}
                        style={styles.avatar} />
                    <Text style={styles.title}>
                        Puerto Rico </Text>
                    <Text style={styles.email}>
                        Vip member | email
                    </Text>
                </View>
                <View style={{ gap: 24 }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#999999"
                            secureTextEntry={!isPasswordVisible}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            style={styles.visibilityToggle}
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            <Entypo
                                name={isPasswordVisible ? 'eye' : 'eye-with-line'}
                                size={24}
                                color="#999999"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.submitButtonText}>SIGN IN</Text>
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
        gap: 60,
        paddingHorizontal: 24,
        paddingTop: height * 0.08,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    inputContainer: {
        position: 'relative',
        marginBottom: height * 0.04,
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
    visibilityToggle: {
        position: 'absolute',
        right: 16,
        top: 12,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
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
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 50,
    },
    email: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    inforContainer: {
    }
});

export default Login3Screen;

