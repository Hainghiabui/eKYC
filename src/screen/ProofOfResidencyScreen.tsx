import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Pressable,
    Dimensions,
    Animated,
    Alert,
    Linking,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import { checkCameraPermission } from '../utils/permissions';
import { launchCamera } from 'react-native-image-picker';
import textRecognition from '@react-native-ml-kit/text-recognition';
import { RootStackParamList } from '../@type';
import ScanFrame from '../components/scanner/ScanFrame';
import type { CCCDData } from '../@type';

const { width, height } = Dimensions.get('window');

const verificationMethods = [
    {
        id: 'cccd',
        title: 'Căn cước công dân',
        icon: 'id-card'
    },
    {
        id: 'passport',
        title: 'Hộ chiếu',
        icon: 'passport'
    },
    {
        id: 'license',
        title: 'Giấy phép lái xe',
        icon: 'car'
    },
];

const ProofOfResidencyScreen = () => {
    const [ selectedMethod, setSelectedMethod ] = useState(0);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const [ cccdText, setCccdText ] = useState('');
    const [ hasPermission, setHasPermission ] = useState(false);
    const [ showScanFrame, setShowScanFrame ] = useState(false);

    useEffect(() => {
        checkPermissions();
    }, []);

    const checkPermissions = async () => {
        const hasPermission = await checkCameraPermission();
        setHasPermission(hasPermission);
    };

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

    const handleCapture = async (uri: string) => {
        setShowScanFrame(false);

        try {
            const result = await textRecognition.recognize(uri);
            console.log(result.text);

            // Extract CCCD information
            const cccdInfo: Partial<CCCDData> = {
                idNumber: extractValue(result.text, /(?:No)[:.\s]*(\d{12})/i),
                fullName: extractValue(result.text, /(?:Name)[:.\s]*([^\n]+)/i),
                dateOfBirth: extractValue(result.text, /(?:Date of birth)[:.\s]*(\d{2}\/\d{2}\/\d{4})/i),
                sex: extractValue(result.text, /(?:Sex)[:.\s]*([^\n]+)/i),
                nationality: extractValue(result.text, /(?:Nationality)[:.\s]*([^\n]+)/i),
                placeOfOrigin: extractValue(result.text, /(?:Place of origin)[:.\s]*([^\n]+)/i),
                placeOfResidence: extractValue(result.text, /(?:Place of residence)[:.\s]*([^\n]+)/i),
                // dateOfExpiry: extractValue(result.text, /(?:Có giá trị đến)[:.\s]*(\d{2}\/\d{2}\/\d{4})/i),
            };

            // Validate required fields
            const missingFields = validateCCCDInfo(cccdInfo);

            if (missingFields.length > 0) {
                Alert.alert(
                    'Thiếu thông tin',
                    `Không thể nhận diện các thông tin sau:\n${missingFields.join('\n')}`,
                    [
                        { text: 'Quét lại', onPress: () => setShowScanFrame(true) },
                        { text: 'Hủy', style: 'cancel' }
                    ]
                );
                return;
            }

            // If all fields are present, navigate to result screen
            navigation.navigate('VerifyDatascreen', { cccdInfo: cccdInfo as CCCDData });

        } catch (error) {
            Alert.alert('Lỗi', 'Không thể nhận diện văn bản từ ảnh');
        }
    };

    const scanCCCD = async () => {
        if (!hasPermission) {
            Alert.alert(
                'Permission Required',
                'Camera permission is required to scan documents',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Settings', onPress: () => Linking.openSettings() }
                ]
            );
            return;
        }

        setShowScanFrame(true);
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
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [ { translateY: slideAnim } ]
                    }
                ]}
            >
                <Text style={styles.title}>Xác minh cư trú</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quốc tịch</Text>
                    <TouchableOpacity
                        style={styles.countrySelector}
                        onPress={() => console.log('Change country')}
                    >
                        <View style={styles.countryInfo}>
                            <Text style={styles.flagEmoji}>🇻🇳</Text>
                            <Text style={styles.countryName}>Việt Nam</Text>
                        </View>
                        <View style={styles.changeButtonContainer}>
                            <Text style={styles.changeButton}>Thay đổi</Text>
                            <FontAwesome6 name="chevron-right" size={16} color="#1e40af" />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Phương thức xác minh</Text>
                    <View style={styles.methodsContainer}>
                        {verificationMethods.map((method, index) => (
                            <Pressable
                                key={method.id}
                                style={[
                                    styles.methodButton,
                                    selectedMethod === index && styles.methodButtonSelected,
                                ]}
                                onPress={() => setSelectedMethod(index)}
                            >
                                <LinearGradient
                                    colors={[ 'rgba(59,130,246,0.1)', 'rgba(59,130,246,0.05)' ]}
                                    style={styles.methodGradient}
                                >
                                    <View style={[
                                        styles.radio,
                                        selectedMethod === index && styles.radioSelected,
                                    ]}>
                                        {selectedMethod === index && (
                                            <View style={styles.radioInner} />
                                        )}
                                    </View>
                                    <View style={styles.methodContent}>
                                        <Text style={[
                                            styles.methodText,
                                            selectedMethod === index && styles.methodTextSelected
                                        ]}>
                                            {method.title}
                                        </Text>
                                        <FontAwesome6
                                            name={method.icon}
                                            size={20}
                                            color={selectedMethod === index ? "#1e40af" : "#94a3b8"}
                                        />
                                    </View>
                                </LinearGradient>
                            </Pressable>
                        ))}
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={() => console.log('Skip')}
                    >
                        <Text style={styles.skipButtonText}>BỎ QUA</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() => scanCCCD()}
                    >
                        <LinearGradient
                            colors={[ '#1e40af', '#3b82f6' ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.continueButtonText}>TIẾP TỤC</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            {showScanFrame && (
                <ScanFrame
                    onClose={() => setShowScanFrame(false)}
                    method={verificationMethods[ selectedMethod ].id}
                    onCapture={handleCapture}
                />
            )}
        </SafeAreaView>
    );
};

const extractValue = (text: string, regex: RegExp): string => {
    const match = text.match(regex);
    return match?.[ 1 ]?.trim() || '';
};

const validateCCCDInfo = (info: Partial<CCCDData>): string[] => {
    const requiredFields: { [ key in keyof CCCDData ]: string } = {
        idNumber: 'Số CCCD',
        fullName: 'Họ và tên',
        dateOfBirth: 'Ngày sinh',
        sex: 'Giới tính',
        nationality: 'Quốc tịch',
        placeOfOrigin: 'Quê quán',
        placeOfResidence: 'Nơi thường trú',
        // dateOfExpiry: 'Giá trị đến'
    };

    return Object.entries(requiredFields)
        .filter(([ key ]) => !info[ key as keyof CCCDData ])
        .map(([ _, label ]) => `- ${label}`);
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
    title: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        marginBottom: height * 0.04,
        color: '#1e40af',
        lineHeight: width * 0.11,
    },
    section: {
        marginBottom: height * 0.03,
    },
    sectionTitle: {
        fontSize: width * 0.045,
        color: '#1e293b',
        marginBottom: height * 0.02,
        fontWeight: '600',
    },
    countrySelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: width * 0.04,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#e2e8f0',
    },
    countryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flagEmoji: {
        fontSize: width * 0.06,
        marginRight: width * 0.03,
    },
    countryName: {
        fontSize: width * 0.04,
        color: '#1e293b',
        fontWeight: '500',
    },
    changeButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: width * 0.02,
    },
    changeButton: {
        color: '#1e40af',
        fontSize: width * 0.04,
        fontWeight: '600',
    },
    methodsContainer: {
        gap: height * 0.02,
    },
    methodButton: {
        borderRadius: 12,
        overflow: 'hidden',

    },
    methodGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: width * 0.04,
    },
    methodContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    methodButtonSelected: {

    },
    radio: {
        width: width * 0.06,
        height: width * 0.06,
        borderRadius: width * 0.03,
        borderWidth: 2,
        borderColor: '#e2e8f0',
        marginRight: width * 0.03,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    radioSelected: {
        borderColor: '#3b82f6',
    },
    radioInner: {
        width: width * 0.03,
        height: width * 0.03,
        borderRadius: width * 0.015,
        backgroundColor: '#3b82f6',
    },
    methodText: {
        fontSize: width * 0.04,
        color: '#1e293b',
        fontWeight: '500',
    },
    methodTextSelected: {
        color: '#1e40af',
        fontWeight: '600',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: width * 0.03,
        position: 'absolute',
        bottom: height * 0.05,
        left: width * 0.06,
        right: width * 0.06,
    },
    skipButton: {
        flex: 1,
        padding: height * 0.02,
        borderRadius: 12,
        backgroundColor: '#f8faff',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    skipButtonText: {
        fontSize: width * 0.04,
        fontWeight: '600',
        color: '#64748b',
    },
    continueButton: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',

    },
    gradientButton: {
        padding: height * 0.022,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueButtonText: {
        fontSize: width * 0.04,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    buttonIcon: {
        marginLeft: width * 0.02,
    },
});

export default ProofOfResidencyScreen;