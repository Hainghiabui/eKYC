import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
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
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../@type';

const { width, height } = Dimensions.get('window');
type Login3RouteProp = RouteProp<RootStackParamList, 'Login3'>;


const Login3Screen = () => {
    const [ password, setPassword ] = useState('');
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
    const [ isFocused, setIsFocused ] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const route = useRoute<Login3RouteProp>();
    const user = { name: route.params.name, email: route.params.email, photoURL: route.params?.photoURL };
    console.log(user);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleSubmit = () => {
        // if (!password) {
        //     Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu của bạn.');
        //     return;
        // }
        navigation.navigate("GetStartedScreen");
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

            <Animated.View
                style={[ styles.content, { opacity: fadeAnim } ]}
            >
                <View style={styles.infoContainer}>
                    <LinearGradient
                        colors={[ 'rgba(59,130,246,0.1)', 'rgba(59,130,246,0.05)' ]}
                        style={styles.avatarWrapper}
                    >
                        <Image
                            source={user.photoURL ? { uri: user.photoURL } : require('../../assets/images/avatar.png')}
                            style={styles.avatar}
                        />
                    </LinearGradient>
                    <Text style={styles.title}>Xin chào {user.name}!</Text>
                    <Text style={styles.email}>
                        {user.email}
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    {/* <View style={styles.inputContainer}>
                        <TextInput
                            style={[
                                styles.input,
                                isFocused && styles.inputFocused
                            ]}
                            placeholder="Mật khẩu"
                            placeholderTextColor="#94a3b8"
                            secureTextEntry={!isPasswordVisible}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <TouchableOpacity
                            style={styles.visibilityToggle}
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            <Entypo
                                name={isPasswordVisible ? 'eye' : 'eye-with-line'}
                                size={24}
                                color="#94a3b8"
                            />
                        </TouchableOpacity>
                    </View> */}

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
                </View>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Chưa có tài khoản? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={styles.signupLink}>Đăng ký ngay</Text>
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
        justifyContent: 'space-between',
    },
    infoContainer: {
        alignItems: 'center',
        marginTop: height * 0.04,
    },
    avatarWrapper: {
        padding: 8,
        borderRadius: width * 0.25,
        backgroundColor: 'rgba(59,130,246,0.1)',
    },
    avatar: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: width * 0.125,
    },
    title: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: '#1e40af',
        marginTop: height * 0.02,
    },
    email: {
        fontSize: width * 0.04,
        color: '#64748b',
        marginTop: height * 0.01,
    },
    formContainer: {
        gap: height * 0.03,
    },
    inputContainer: {
        position: 'relative',
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
    visibilityToggle: {
        position: 'absolute',
        right: width * 0.04,
        top: height * 0.022,
    },
    submitButton: {
        borderRadius: 12,
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
        paddingBottom: height * 0.04,
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
});

export default Login3Screen;

