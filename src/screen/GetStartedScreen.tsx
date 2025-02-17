import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Pressable,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const options = [
    'Spend or save daily',
    'Spend while travelling',
    'Send and manage money',
    'Gain exposure to financial assets',
    'Others',
];

const GetStartedScreen = () => {
    const [ selectedOptions, setSelectedOptions ] = useState<number[]>([ 2 ]);
    const navigation = useNavigation<NavigationProp<any>>();

    const handleContinue = () => {
        if (selectedOptions.length > 0) {
            navigation.navigate('NextScreen', {
                reasons: selectedOptions.map(index => options[ index ]),
            });
        }
    };

    const toggleOption = (index: number) => {
        setSelectedOptions(prevSelectedOptions =>
            prevSelectedOptions.includes(index)
                ? prevSelectedOptions.filter(option => option !== index)
                : [ ...prevSelectedOptions, index ]
        );
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
                <Text style={styles.title}>Get started</Text>
                <Text style={styles.subtitle}>
                    Tell us the main reason for using the FintechX application please.
                </Text>

                <View style={styles.optionsContainer}>
                    {options.map((option, index) => (
                        <Pressable
                            key={index}
                            style={[
                                styles.optionButton,
                                selectedOptions.includes(index) && styles.optionButtonSelected,
                            ]}
                            onPress={() => toggleOption(index)}
                        >
                            <View
                                style={[
                                    styles.checkbox,
                                    selectedOptions.includes(index) && styles.checkboxSelected,
                                ]}
                            >
                                {selectedOptions.includes(index) && <View style={styles.checkboxInner} />}
                            </View>
                            <Text style={styles.optionText}>{option}</Text>
                        </Pressable>
                    ))}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={() => navigation.navigate('NextScreen')}
                    >
                        <Text style={styles.skipButtonText}>SKIP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.continueButton,
                            selectedOptions.length === 0 && styles.continueButtonDisabled,
                        ]}
                        onPress={handleContinue}
                        disabled={selectedOptions.length === 0}
                    >
                        <Text style={styles.continueButtonText}>CONTINUE</Text>
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
        paddingTop: 100,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000000',
    },
    subtitle: {
        fontSize: 16,
        color: '#1E1E1E',
        marginBottom: 32,
        lineHeight: 22,
    },
    optionsContainer: {
        gap: 12,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
    },
    optionButtonSelected: {
        backgroundColor: '#EBF5FF',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#CCCCCC',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        borderColor: '#007AFF',
    },
    checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: '#007AFF',
    },
    optionText: {
        fontSize: 16,
        color: '#1E1E1E',
        fontWeight: '600',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        position: 'absolute',
        bottom: 40,
        left: 24,
        right: 24,
    },
    skipButton: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },
    skipButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
    },
    continueButton: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#007AFF',
        alignItems: 'center',
    },
    continueButtonDisabled: {
        backgroundColor: '#CCCCCC',
    },
    continueButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default GetStartedScreen;