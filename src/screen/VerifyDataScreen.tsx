import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../@type';

const { width, height } = Dimensions.get('window');
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ProfileScreen'>;

const VerifyDataScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<ProfileScreenRouteProp>();
    const { cccdInfo } = route.params;

    console.log(cccdInfo);
    const fields = [
        { label: 'Số CCCD', value: cccdInfo.idNumber },
        { label: 'Họ và tên', value: cccdInfo.fullName },
        { label: 'Ngày sinh', value: cccdInfo.dateOfBirth },
        { label: 'Giới tính', value: cccdInfo.sex },
        { label: 'Quốc tịch', value: cccdInfo.nationality },
        { label: 'Quê quán', value: cccdInfo.placeOfOrigin },
        { label: 'Nơi thường trú', value: cccdInfo.placeOfResidence },
        // { label: 'Có giá trị đến', value: cccdInfo.dateOfExpiry },
    ];

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
                <Text style={styles.title}>Xác thực thông tin</Text>
                <Text style={styles.subtitle}>
                    Vui lòng kiểm tra lại thông tin được trích xuất từ CCCD của bạn
                </Text>

                <ScrollView style={styles.fieldsContainer}>
                    {fields.map((field, index) => (
                        <View key={index} style={styles.fieldGroup}>
                            <Text style={styles.fieldLabel}>{field.label}</Text>
                            <View style={styles.fieldValue}>
                                <Text style={styles.fieldText}>{field.value}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.retakeButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.retakeButtonText}>CHỤP LẠI</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={() => navigation.navigate('FaceVerification')}
                    >
                        <LinearGradient
                            colors={[ '#1e40af', '#3b82f6' ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.confirmButtonText}>XÁC NHẬN</Text>
                            <FontAwesome6 name="arrow-right" size={16} color="#ffffff" style={styles.buttonIcon} />
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
        paddingTop: height * 0.08,
    },
    title: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        color: '#1e40af',
        marginBottom: height * 0.01,
    },
    subtitle: {
        fontSize: width * 0.04,
        color: '#64748b',
        marginBottom: height * 0.04,
        lineHeight: width * 0.06,
    },
    fieldsContainer: {
        flex: 1,
    },
    fieldGroup: {
        marginBottom: height * 0.02,
    },
    fieldLabel: {
        fontSize: width * 0.035,
        color: '#64748b',
        marginBottom: height * 0.01,
    },
    fieldValue: {
        backgroundColor: '#f8faff',
        borderRadius: 12,
        padding: width * 0.04,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    fieldText: {
        fontSize: width * 0.04,
        color: '#1e293b',
        fontWeight: '500',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: width * 0.03,
        paddingVertical: height * 0.03,
    },
    retakeButton: {
        flex: 1,
        padding: height * 0.02,
        borderRadius: 12,
        backgroundColor: '#f8faff',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    retakeButtonText: {
        fontSize: width * 0.04,
        fontWeight: '600',
        color: '#64748b',
    },
    confirmButton: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#1e40af',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    gradientButton: {
        padding: height * 0.022,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButtonText: {
        fontSize: width * 0.04,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    buttonIcon: {
        marginLeft: width * 0.02,
    },
});

export default VerifyDataScreen;