import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    StatusBar,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { FaceComparisonResult, getFaceComparisonMessage } from '../services/faceVerifyService';
import { RootStackParamList } from '../@type';

const { width, height } = Dimensions.get('window');

type RouteParams = {
    comparisonResult: FaceComparisonResult;
};
type VerifyFaceId = RouteProp<RootStackParamList, 'VerifyFaceId'>;

const FaceComparisonResultScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<VerifyFaceId>();

    const params = route.params as RouteParams;
    const { comparisonResult } = params || {};

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    const resultData = getFaceComparisonMessage(comparisonResult?.result || 'unsimilar');

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
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

    if (!comparisonResult) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3b82f6" />
                <Text style={styles.loadingText}>Đang tải kết quả...</Text>
            </View>
        );
    }

    const { similarity, cccd_url, face_url } = comparisonResult;
    const similarityPercent = Math.round(similarity * 100);

    const handleContinue = () => {
        // Navigate to the next screen in your flow
        if (comparisonResult.result === 'high') {
            // navigation.navigate('HomeScreen'); // Replace with your success navigation
        } else {
            navigation.goBack(); // Go back to try again
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar barStyle="dark-content" backgroundColor="#ffffff" /> */}

            <View style={styles.header}>
                <Text style={styles.title}>Kết quả xác minh</Text>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome6 name="xmark" size={20} color="#64748b" />
                </TouchableOpacity>
            </View>

            <Animated.View
                style={[
                    styles.resultContainer,
                    {
                        opacity: fadeAnim,
                        transform: [ { translateY: slideAnim } ]
                    }
                ]}
            >
                <View style={[ styles.resultHeader, { backgroundColor: resultData.color + '20' } ]}>
                    <View style={[ styles.resultIconContainer, { backgroundColor: resultData.color } ]}>
                        <FontAwesome6
                            name={comparisonResult.result === 'high' || comparisonResult.result === 'medium' ? 'check' : 'xmark'}
                            size={24}
                            color="#ffffff"
                        />
                    </View>
                    <Text style={[ styles.resultTitle, { color: resultData.color } ]}>
                        {resultData.title}
                    </Text>
                    <Text style={styles.resultMessage}>{resultData.message}</Text>
                    {/* <View style={styles.similarityContainer}>
                        <Text style={styles.similarityText}>Độ tương đồng: </Text>
                        <Text style={[ styles.similarityValue, { color: resultData.color } ]}>
                            {similarityPercent}%
                        </Text>
                    </View> */}
                </View>

                {/* <View style={styles.imagesContainer}>
                    <View style={styles.imageCard}>
                        <Text style={styles.imageLabel}>CCCD</Text>
                        <Image
                            source={{ uri: `file://${cccd_url}` }}
                            style={styles.faceImage}
                            resizeMode="cover"
                        />
                    </View>

                    <View style={styles.compareIconContainer}>
                        <FontAwesome6 name="arrows-left-right" size={20} color="#64748b" />
                    </View>

                    <View style={styles.imageCard}>
                        <Text style={styles.imageLabel}>Khuôn mặt của bạn</Text>
                        <Image
                            source={{ uri: `file://${face_url}` }}
                            style={styles.faceImage}
                            resizeMode="cover"
                        />
                    </View>
                </View> */}

                <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                    <LinearGradient
                        colors={comparisonResult.result === 'high' || comparisonResult.result === 'medium' ?
                            [ '#1e40af', '#3b82f6' ] : [ '#64748b', '#94a3b8' ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.buttonText}>
                            {comparisonResult.result === 'high' || comparisonResult.result === 'medium' ?
                                'TIẾP TỤC' : 'THỬ LẠI'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#64748b',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.06,
        paddingVertical: width * 0.04,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        marginTop: StatusBar.currentHeight || 0,
    },
    title: {
        fontSize: width * 0.05,
        fontWeight: '700',
        color: '#1e293b',
    },
    closeButton: {
        position: 'absolute',
        right: width * 0.04,
        padding: 8,
    },
    resultContainer: {
        flex: 1,
        padding: width * 0.06,
    },
    resultHeader: {
        alignItems: 'center',
        padding: width * 0.06,
        borderRadius: 16,
        marginBottom: width * 0.06,
    },
    resultIconContainer: {
        width: width * 0.14,
        height: width * 0.14,
        borderRadius: width * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: width * 0.03,
    },
    resultTitle: {
        fontSize: width * 0.05,
        fontWeight: '700',
        marginBottom: 8,
    },
    resultMessage: {
        fontSize: width * 0.04,
        color: '#475569',
        textAlign: 'center',
        marginBottom: 12,
    },
    similarityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    similarityText: {
        fontSize: width * 0.04,
        color: '#475569',
    },
    similarityValue: {
        fontSize: width * 0.045,
        fontWeight: '700',
    },
    imagesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: width * 0.06,
    },
    imageCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flex: 1,
    },
    imageLabel: {
        fontSize: width * 0.035,
        fontWeight: '500',
        color: '#64748b',
        marginBottom: 8,
    },
    faceImage: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: 8,
    },
    compareIconContainer: {
        padding: width * 0.02,
    },
    continueButton: {
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 'auto',
    },
    gradientButton: {
        padding: height * 0.022,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: width * 0.04,
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: 0.5,
    },
});

export default FaceComparisonResultScreen;
