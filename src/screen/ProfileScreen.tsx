import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Image,
    Platform,
    Alert,
    Dimensions,
    ScrollView,
    ActionSheetIOS,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import type { Asset } from 'react-native-image-picker';
import { RootStackParamList } from '../@type';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

interface ProfileForm {
    fullName: string;
    nickName: string;
    email: string;
    phoneNumber: string;
}

const ProfileScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [ form, setForm ] = useState<ProfileForm>({
        fullName: '',
        nickName: '',
        email: '',
        phoneNumber: '',
    });
    const [ profileImage, setProfileImage ] = useState<Asset | null>(null);

    const handleImagePicker = async () => {
        Alert.alert(
            'Chọn ảnh',
            'Vui lòng chọn phương thức',
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Chụp ảnh', onPress: () => captureImage() },
                { text: 'Chọn từ thư viện', onPress: () => pickImage() },
            ]
        );
    };

    const captureImage = async () => {
        try {
            const result = await launchCamera({
                mediaType: 'photo',
                quality: 0.8,
                saveToPhotos: true,
            });

            if (result.assets && result.assets[ 0 ]) {
                setProfileImage(result.assets[ 0 ]);
            }
        } catch (error) {
            console.log('Camera error:', error);
        }
    };

    const pickImage = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 0.8,
            });

            if (result.assets && result.assets[ 0 ]) {
                setProfileImage(result.assets[ 0 ]);
            }
        } catch (error) {
            console.log('Image picker error:', error);
        }
    };

    const handleSubmit = () => {
        if (!form.fullName || !form.email || !form.phoneNumber) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }
        console.log('Form submitted:', { ...form, profileImage });
        // navigation.navigate('NextScreen');
    };

    const isFormValid = form.fullName && form.email && form.phoneNumber;

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

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Hoàn thiện hồ sơ</Text>
                    <Text style={styles.subtitle}>
                        Bạn có thể thay đổi thông tin này sau
                    </Text>

                    <TouchableOpacity
                        style={styles.avatarContainer}
                        onPress={handleImagePicker}
                    >
                        <View style={styles.avatar}>
                            {profileImage ? (
                                <Image
                                    source={{ uri: profileImage.uri }}
                                    style={styles.avatarImage}
                                />
                            ) : (
                                <View style={styles.avatarPlaceholder}>
                                    <FontAwesome6 name="user" size={40} color="#94a3b8" />
                                </View>
                            )}
                            <View style={styles.editIcon}>
                                <FontAwesome6 name="camera" size={12} color="#ffffff" />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.formScroll}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.formScrollContent}
                >
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Họ và tên</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập họ và tên"
                            value={form.fullName}
                            onChangeText={(text) => setForm({ ...form, fullName: text })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Tên hiển thị</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập tên hiển thị"
                            value={form.nickName}
                            onChangeText={(text) => setForm({ ...form, nickName: text })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập địa chỉ email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={form.email}
                            onChangeText={(text) => setForm({ ...form, email: text })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Số điện thoại</Text>
                        <View style={styles.phoneInput}>
                            <View style={styles.countryFlag}>
                                <Text>🇻🇳</Text>
                                <Text style={styles.countryCode}>+84</Text>
                            </View>
                            <TextInput
                                style={styles.phoneNumber}
                                placeholder="Nhập số điện thoại"
                                keyboardType="phone-pad"
                                value={form.phoneNumber}
                                onChangeText={(text) => setForm({ ...form, phoneNumber: text })}
                            />
                        </View>
                    </View>
                    <View style={styles.bottomPadding} />
                </ScrollView>

                <View style={styles.submitButtonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            isFormValid && styles.submitButtonActive
                        ]}
                        onPress={handleSubmit}
                        disabled={!isFormValid}
                    >
                        <LinearGradient
                            colors={isFormValid ? [ '#1e40af', '#3b82f6' ] : [ '#e2e8f0', '#e2e8f0' ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientButton}
                        >
                            <Text style={[
                                styles.submitButtonText,
                                isFormValid && styles.submitButtonTextActive
                            ]}>
                                XÁC NHẬN
                            </Text>
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
    },
    title: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        marginBottom: height * 0.01,
        color: '#1e40af',
        lineHeight: width * 0.11,
    },
    subtitle: {
        fontSize: width * 0.04,
        color: '#64748b',
        marginBottom: height * 0.04,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: height * 0.04,
    },
    avatar: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: width * 0.125,
        backgroundColor: '#f8faff',
        position: 'relative',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    avatarImage: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: width * 0.125,
    },
    avatarPlaceholder: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: width * 0.125,
        backgroundColor: '#f8faff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editIcon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: width * 0.07,
        height: width * 0.07,
        borderRadius: width * 0.035,
        backgroundColor: '#1e40af',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        gap: height * 0.02,
    },
    inputContainer: {
        marginBottom: height * 0.02,
    },
    label: {
        fontSize: width * 0.035,
        color: '#1e293b',
        marginBottom: height * 0.01,
        fontWeight: '500',
    },
    input: {
        height: height * 0.06,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: width * 0.04,
        fontSize: width * 0.04,
        color: '#1e293b',
        backgroundColor: '#ffffff',
    },
    phoneInput: {
        flexDirection: 'row',
        height: height * 0.06,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    countryFlag: {
        paddingHorizontal: width * 0.04,
        borderRightWidth: 1,
        borderRightColor: '#e2e8f0',
        flexDirection: 'row',
        alignItems: 'center',
        gap: width * 0.02,
    },
    countryCode: {
        color: '#64748b',
        fontSize: width * 0.035,
    },
    phoneNumber: {
        flex: 1,
        paddingHorizontal: width * 0.04,
        fontSize: width * 0.04,
        color: '#1e293b',
    },
    submitButton: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    submitButtonActive: {
        opacity: 1,
    },
    gradientButton: {
        padding: height * 0.022,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        color: '#94a3b8',
        fontSize: width * 0.04,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    submitButtonTextActive: {
        color: '#ffffff',
    },
    header: {
        paddingTop: height * 0.08,
    },
    formScroll: {
        flex: 1,
        marginTop: height * 0.02,
    },
    formScrollContent: {
        paddingBottom: height * 0.1,
    },
    bottomPadding: {
        height: height * 0.02,
    },
    submitButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.02,
        borderTopWidth: 1,
        borderTopColor: 'rgba(226, 232, 240, 0.5)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default ProfileScreen;