import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import ScanOverlay from './ScanOverlay';
import { SCAN_AREA_WIDTH, SCAN_AREA_HEIGHT, SCAN_AREA_TOP } from './ScanOverlay';

const { width, height } = Dimensions.get('window');

interface ScanFrameProps {
    onClose: () => void;
    method: string;
    onCapture: (uri: string) => void;
}

const ScanFrame: React.FC<ScanFrameProps> = ({ onClose, method, onCapture }) => {
    const cameraRef = useRef<any>(null);

    const handleCapture = useCallback(async () => {
        try {
            if (cameraRef.current) {
                const image = await cameraRef.current.capture();
                if (image?.uri) {
                    onCapture(image.uri);
                }
            }
        } catch (error) {
            console.error('Failed to capture:', error);
        }
    }, [ onCapture ]);

    const getInstructionText = () => {
        switch (method) {
            case 'cccd':
                return 'Đặt CCCD vào khung hình';
            case 'passport':
                return 'Đặt Hộ chiếu vào khung hình';
            case 'license':
                return 'Đặt GPLX vào khung hình';
            default:
                return 'Đặt giấy tờ vào khung hình';
        }
    };

    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                style={styles.camera}
                cameraType={CameraType.Back}
                flashMode="auto"
                focusMode="on"
                zoomMode="on"
                ratioOverlay="16:9"
            />

            <ScanOverlay />

            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <FontAwesome6 name="xmark" size={24} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.title}>{getInstructionText()}</Text>
            </View>

            <View style={[ styles.frameContainer, {
                top: SCAN_AREA_TOP,
                width: SCAN_AREA_WIDTH,
                height: SCAN_AREA_HEIGHT,
                left: (width - SCAN_AREA_WIDTH) / 2
            } ]}>
                <View style={styles.frame}>
                    <View style={styles.cornerTL} />
                    <View style={styles.cornerTR} />
                    <View style={styles.cornerBL} />
                    <View style={styles.cornerBR} />
                    <View style={styles.guidelines}>
                        <View style={styles.guidelineHorizontal} />
                        <View style={styles.guidelineVertical} />
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.instruction}>
                    Đảm bảo thông tin rõ ràng và không bị chói sáng
                </Text>
                <TouchableOpacity onPress={handleCapture} style={styles.captureButton}>
                    <LinearGradient
                        colors={[ '#1e40af', '#3b82f6' ]}
                        style={styles.captureButtonGradient}
                    >
                        <FontAwesome6 name="camera" size={24} color="#ffffff" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
    },
    camera: {
        ...StyleSheet.absoluteFillObject,
    },
    header: {
        padding: width * 0.04,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    closeButton: {
        position: 'absolute',
        top: width * 0.04,
        right: width * 0.04,
        padding: 8,
    },
    title: {
        color: '#ffffff',
        fontSize: width * 0.045,
        fontWeight: '600',
        marginTop: height * 0.02,
    },
    frameContainer: {
        position: 'absolute',
    },
    frame: {
        flex: 1,
        position: 'relative',
    },
    cornerTL: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 30,
        height: 30,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderColor: '#ffffff',
    },
    cornerTR: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 30,
        height: 30,
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderColor: '#ffffff',
    },
    cornerBL: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 30,
        height: 30,
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        borderColor: '#ffffff',
    },
    cornerBR: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderColor: '#ffffff',
    },
    guidelines: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guidelineHorizontal: {
        position: 'absolute',
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    guidelineVertical: {
        position: 'absolute',
        width: 1,
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    footer: {
        position: 'absolute',
        bottom: height * 0.05,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    instruction: {
        color: '#ffffff',
        fontSize: width * 0.035,
        opacity: 0.8,
        marginBottom: height * 0.03,
        textAlign: 'center',
    },
    captureButton: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: width * 0.075,
        overflow: 'hidden',
    },
    captureButtonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ScanFrame;