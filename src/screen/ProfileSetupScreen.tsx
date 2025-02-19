import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Animated,
    Platform,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ProfileSetupScreen = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const [ formData, setFormData ] = useState({
        phoneNumber: '',
        address: '',
        dateOfBirth: '',
        occupation: ''
    });

    const fadeAnim = new Animated.Value(0);
    const slideAnim = new Animated.Value(50);

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
            })
        ]).start();
    }, []);

    const FloatingCard = ({ children }: { children: React.ReactNode }) => (
        <LinearGradient
            colors={[ 'rgba(255,255,255,0.9)', 'rgba(255,255,255,0.8)' ]}
            style={styles.cardContainer}
        >
            {children}
        </LinearGradient>
    );

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[ '#1a365d', '#2563eb' ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            <ScrollView style={styles.scrollView}>
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
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <FontAwesome6 name="arrow-left" size={20} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Thiết Lập Hồ Sơ</Text>
                    </View>

                    <View style={styles.avatarContainer}>
                        <TouchableOpacity style={styles.avatarWrapper}>
                            <Image
                                source={require('../assets/default-avatar.png')}
                                style={styles.avatar}
                            />
                            <View style={styles.avatarBadge}>
                                <FontAwesome6 name="camera" size={16} color="#fff" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <FloatingCard>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Số Điện Thoại</Text>
                            <View style={styles.inputWrapper}>
                                <FontAwesome6 name="phone" size={16} color="#4b5563" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập số điện thoại"
                                    keyboardType="phone-pad"
                                    value={formData.phoneNumber}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, phoneNumber: text }))}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Địa Chỉ</Text>
                            <View style={styles.inputWrapper}>
                                <FontAwesome6 name="location-dot" size={16} color="#4b5563" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập địa chỉ"
                                    value={formData.address}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Ngày Sinh</Text>
                            <View style={styles.inputWrapper}>
                                <FontAwesome6 name="calendar" size={16} color="#4b5563" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="DD/MM/YYYY"
                                    value={formData.dateOfBirth}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, dateOfBirth: text }))}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nghề Nghiệp</Text>
                            <View style={styles.inputWrapper}>
                                <FontAwesome6 name="briefcase" size={16} color="#4b5563" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập nghề nghiệp"
                                    value={formData.occupation}
                                    onChangeText={(text) => setFormData(prev => ({ ...prev, occupation: text }))}
                                />
                            </View>
                        </View>
                    </FloatingCard>

                    <TouchableOpacity style={styles.submitButton}>
                        <LinearGradient
                            colors={[ '#3b82f6', '#1d4ed8' ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.buttonText}>Hoàn Tất</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    backButton: {
        padding: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 15,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#fff',
    },
    avatarBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#3b82f6',
        padding: 8,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#fff',
    },
    cardContainer: {
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4b5563',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#1f2937',
    },
    submitButton: {
        marginTop: 30,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    gradientButton: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProfileSetupScreen;
