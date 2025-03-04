import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Animated,
    ActivityIndicator,
    Alert
} from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import FaceOverlay from '../components/faceVerify/FaceOverlay';
import { compareFaces } from '../services/faceVerifyService';
import { RootStackParamList } from '../@type';

const { width, height } = Dimensions.get('window');

type RouteParams = {
    idCardImage?: string;
    onComplete?: (faceImage: string) => void;
};

type Props = {
    onComplete?: (faceImage: string) => void;
    onCancel?: () => void;
};

const VerifyFaceId = ({ onComplete: propOnComplete, onCancel }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const route = useRoute();
    const params = route.params as RouteParams;
    const insets = useSafeAreaInsets();

    const cameraRef = useRef<any>(null);
    const [ isCameraReady, setIsCameraReady ] = useState(false);
    const [ processing, setProcessing ] = useState(false);
    const [ showSuccess, setShowSuccess ] = useState(false);
    const [ comparing, setComparing ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    // Animation references
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const successAnim = useRef(new Animated.Value(0)).current;

    // Check if we're doing ID comparison or just capture
    const isComparingWithID = !!params?.idCardImage;
    const onComplete = propOnComplete || params?.onComplete;

    const handleCapture = useCallback(async () => {
        if (processing || !cameraRef.current) return;

        setProcessing(true);
        setError(null);

        // Fade out animation
        Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 300,
            useNativeDriver: true,
        }).start();

        try {
            const image = await cameraRef.current.capture();
            if (image?.uri) {
                // Show success feedback
                setShowSuccess(true);
                Animated.timing(successAnim, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }).start();

                // If we have an ID image, compare with the backend
                if (isComparingWithID && params.idCardImage) {
                    setTimeout(async () => {
                        try {
                            setComparing(true);
                            const result = await compareFaces(image.uri, params.idCardImage!);

                            // Navigate to comparison result screen
                            navigation.navigate('FaceComparisonResult', { comparisonResult: result });
                        } catch (error: Error | any) {
                            console.error('Face comparison error:', error);
                            setError(error.message || 'Lỗi khi xác minh khuôn mặt');

                            // Reset UI state
                            setShowSuccess(false);
                            setProcessing(false);
                            setComparing(false);

                            // Reset animations
                            successAnim.setValue(0);
                            Animated.timing(fadeAnim, {
                                toValue: 1,
                                duration: 300,
                                useNativeDriver: true,
                            }).start();

                            // Show error alert
                            Alert.alert('Lỗi xác minh', error.message || 'Có lỗi xảy ra khi xác minh khuôn mặt. Vui lòng thử lại.');
                        }
                    }, 800);
                } else {
                    // Standard flow without comparison
                    setTimeout(() => {
                        if (onComplete) {
                            onComplete(image.uri);
                        } else {
                            console.log('Face captured:', image.uri);
                            setShowSuccess(false);
                            setProcessing(false);

                            // Reset animations
                            successAnim.setValue(0);
                            Animated.timing(fadeAnim, {
                                toValue: 1,
                                duration: 300,
                                useNativeDriver: true,
                            }).start();
                        }
                    }, 800);
                }
            }
        } catch (error) {
            console.error('Failed to capture face:', error);
            setProcessing(false);
            setError('Không thể chụp ảnh. Vui lòng thử lại.');

            // Reset animation on error
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [ onComplete, processing, params ]);

    const handleClose = () => {
        if (onCancel) {
            onCancel();
        } else {
            navigation.goBack();
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (cameraRef.current) {
                setIsCameraReady(true);
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                <Camera
                    ref={cameraRef}
                    style={styles.camera}
                    cameraType={CameraType.Front}
                    flashMode="off"
                    focusMode="on"
                    zoomMode="off"
                    ratioOverlay="1:1"
                />

                <FaceOverlay />
            </Animated.View>

            {/* Success overlay */}
            {showSuccess && (
                <Animated.View
                    style={[
                        styles.successOverlay,
                        { opacity: successAnim }
                    ]}
                >
                    <View style={styles.successIconWrapper}>
                        {comparing ? (
                            <ActivityIndicator size="large" color="#ffffff" />
                        ) : (
                            <FontAwesome6 name="check-circle" size={60} color="#4ade80" />
                        )}
                    </View>
                    {comparing && (
                        <Text style={styles.comparingText}>
                            Đang xác minh khuôn mặt...
                        </Text>
                    )}
                </Animated.View>
            )}

            <View style={[ styles.header, { paddingTop: insets.top || StatusBar.currentHeight || 20 } ]}>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                    <View style={styles.closeButtonCircle}>
                        <FontAwesome6 name="xmark" size={20} color="#ffffff" />
                    </View>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {isComparingWithID ? 'Xác thực danh tính' : 'Xác thực khuôn mặt'}
                    </Text>
                    <Text style={styles.subtitle}>
                        {isComparingWithID
                            ? 'Chụp ảnh selfie để xác minh với CCCD của bạn'
                            : 'Xác thực danh tính bằng khuôn mặt của bạn'}
                    </Text>
                </View>
            </View>

            <View style={[ styles.footer, { paddingBottom: insets.bottom || 20 } ]}>
                <View style={styles.instructionContainer}>
                    <View style={styles.instructionBox}>
                        <Text style={styles.instruction}>
                            Đặt khuôn mặt vào giữa khung hình
                        </Text>
                        <Text style={styles.subInstruction}>
                            Đảm bảo khuôn mặt hiển thị rõ và không bị che khuất
                        </Text>
                        {error && <Text style={styles.errorText}>{error}</Text>}
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handleCapture}
                    style={[ styles.captureButton, (processing || !isCameraReady) && styles.disabledButton ]}
                    disabled={processing || !isCameraReady}
                >
                    <LinearGradient
                        colors={[ '#0ea5e9', '#2563eb' ]}
                        style={styles.captureButtonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        {processing && !showSuccess ? (
                            <ActivityIndicator color="#ffffff" size={24} />
                        ) : (
                            <FontAwesome6 name="camera" size={24} color="#ffffff" />
                        )}
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    camera: {
        ...StyleSheet.absoluteFillObject,
    },
    header: {
        padding: width * 0.04,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        borderBottomWidth: 1,
    },
    closeButton: {
        position: 'absolute',
        top: width * 0.04 + (StatusBar.currentHeight || 20),
        left: width * 0.04,
        zIndex: 10,
    },
    closeButtonCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    title: {
        color: '#ffffff',
        fontSize: width * 0.045,
        fontWeight: '700',
        textAlign: 'center',
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: width * 0.03,
        marginTop: 4,
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingHorizontal: width * 0.04,
    },
    instructionContainer: {
        marginBottom: height * 0.03,
        width: '100%',
    },
    instructionBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    instruction: {
        color: '#ffffff',
        fontSize: width * 0.04,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    subInstruction: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: width * 0.035,
        textAlign: 'center',
    },
    errorText: {
        color: '#ef4444',
        fontSize: width * 0.035,
        textAlign: 'center',
        marginTop: 8,
    },
    captureButton: {
        width: width * 0.17,
        height: width * 0.17,
        borderRadius: width * 0.085,
        overflow: 'hidden',
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    disabledButton: {
        opacity: 0.5,
    },
    captureButtonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: width * 0.085,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    successOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    successIconWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    comparingText: {
        color: '#ffffff',
        fontSize: width * 0.04,
        marginTop: 20,
        fontWeight: '500',
    },
});

export default VerifyFaceId;