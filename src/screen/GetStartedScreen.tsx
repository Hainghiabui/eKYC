import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Pressable,
    Dimensions,
    Animated,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../@type';

const { width, height } = Dimensions.get('window');

const options = [
    'Chi tiêu hoặc tiết kiệm hàng ngày',
    'Chi tiêu khi đi du lịch',
    'Gửi và quản lý tiền',
    'Tiếp cận các tài sản tài chính',
    'Khác',
];

const GetStartedScreen = () => {
    const [ selectedOption, setSelectedOption ] = useState<number>(2);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleContinue = () => {
        if (selectedOption !== null) {
            navigation.navigate('VerifyIdentityScreen');
        }
    };

    const toggleOption = (index: number) => {
        setSelectedOption(index);
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={[ '#ffffff', '#f8faff' ]}
                style={StyleSheet.absoluteFill}
            />

            <View style={styles.content}>
                <Text style={styles.title}>Bắt đầu</Text>
                <Text style={styles.subtitle}>
                    Hãy cho chúng tôi biết lý do chính bạn sử dụng ứng dụng.
                </Text>

                <View style={styles.optionsContainer}>
                    {options.map((option, index) => (
                        <Pressable
                            key={index}
                            style={[
                                styles.optionButton,
                                selectedOption === index && styles.optionButtonSelected,
                            ]}
                            onPress={() => toggleOption(index)}
                        >
                            <LinearGradient
                                colors={selectedOption === index
                                    ? [ 'rgba(59,130,246,0.1)', 'rgba(59,130,246,0.05)' ]
                                    : [ '#f8faff', '#F3F8FF' ]}
                                style={styles.optionGradient}
                            >
                                <View
                                    style={[
                                        styles.checkbox,
                                        selectedOption === index && styles.checkboxSelected,
                                    ]}
                                >
                                    {selectedOption === index && (
                                        <FontAwesome6 name="check" size={12} color="#ffffff" />
                                    )}
                                </View>
                                <Text style={[
                                    styles.optionText,
                                    selectedOption === index && styles.optionTextSelected
                                ]}>
                                    {option}
                                </Text>
                            </LinearGradient>
                        </Pressable>
                    ))}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={() => navigation.navigate('VerifyIdentityScreen')}
                    >
                        <Text style={styles.skipButtonText}>BỎ QUA</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.continueButton,
                            selectedOption === null && styles.continueButtonDisabled,
                        ]}
                        onPress={handleContinue}
                        disabled={selectedOption === null}
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
        padding: width * 0.04,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: width * 0.06,
        paddingTop: height * 0.02,
    },
    title: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        marginBottom: height * 0.01,
        color: '#1e40af',
    },
    subtitle: {
        fontSize: width * 0.04,
        color: '#64748b',
        marginBottom: height * 0.04,
        lineHeight: width * 0.06,
    },
    optionsContainer: {
        gap: height * 0.02,
    },
    optionButton: {
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 0.1,
    },
    optionGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: width * 0.04,
    },
    optionButtonSelected: {

    },
    checkbox: {
        width: width * 0.05,
        height: width * 0.05,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#e2e8f0',
        marginRight: width * 0.03,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    checkboxSelected: {
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
    },
    optionText: {
        fontSize: width * 0.04,
        color: '#1e293b',
        fontWeight: '500',
    },
    optionTextSelected: {
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
        padding: height * 0.02,
        alignItems: 'center',
    },
    continueButtonDisabled: {
        opacity: 0.5,
    },
    continueButtonText: {
        fontSize: width * 0.04,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
});

export default GetStartedScreen;