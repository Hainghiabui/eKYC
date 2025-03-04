import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Face detection area dimensions
export const FACE_AREA_SIZE = width * 0.75;
export const FACE_AREA_TOP = height * 0.22;

const FaceOverlay = () => {
    const insets = useSafeAreaInsets();
    const pulseAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    // Interpolations for animations
    const pulseScale = pulseAnim.interpolate({
        inputRange: [ 0, 1 ],
        outputRange: [ 0.95, 1.05 ],
    });

    const pulseOpacity = pulseAnim.interpolate({
        inputRange: [ 0, 0.5, 1 ],
        outputRange: [ 0.6, 0.9, 0.6 ],
    });

    const effectiveAreaTop = FACE_AREA_TOP + (insets.top > 0 ? 0 : 20);

    return (
        <View style={styles.container}>
            {/* Top mask */}
            <View style={[ styles.mask, { height: effectiveAreaTop } ]} />

            {/* Middle row */}
            <View style={styles.middleRow}>
                {/* Left mask */}
                <View style={[ styles.mask, { width: (width - FACE_AREA_SIZE) / 2 } ]} />

                {/* Transparent face detection area */}
                <View style={styles.faceArea}>
                    {/* Animated oval guide */}
                    <Animated.View
                        style={[
                            styles.faceOvalContainer,
                            {
                                transform: [ { scale: pulseScale } ],
                                opacity: pulseOpacity,
                            }
                        ]}
                    >
                        <View style={styles.faceOval} />
                    </Animated.View>

                    {/* Face position guides */}
                    <View style={styles.guidesContainer}>
                        <View style={[ styles.guideCorner, styles.guideTopLeft ]} />
                        <View style={[ styles.guideCorner, styles.guideTopRight ]} />
                        <View style={[ styles.guideCorner, styles.guideBottomLeft ]} />
                        <View style={[ styles.guideCorner, styles.guideBottomRight ]} />

                        {/* Face alignment lines */}
                        <View style={[ styles.alignmentLine, styles.horizontalLine ]} />
                        <View style={[ styles.alignmentLine, styles.verticalLine ]} />
                    </View>
                </View>

                {/* Right mask */}
                <View style={[ styles.mask, { width: (width - FACE_AREA_SIZE) / 2 } ]} />
            </View>

            {/* Bottom mask */}
            <View style={[ styles.mask, {
                height: height - FACE_AREA_SIZE - effectiveAreaTop - insets.bottom
            } ]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
    },
    mask: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    middleRow: {
        flexDirection: 'row',
        height: FACE_AREA_SIZE,
    },
    faceArea: {
        width: FACE_AREA_SIZE,
        height: FACE_AREA_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    faceOvalContainer: {
        position: 'absolute',
        width: FACE_AREA_SIZE * 0.85,
        height: FACE_AREA_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    faceOval: {
        width: FACE_AREA_SIZE * 0.75,
        height: FACE_AREA_SIZE * 0.9,
        borderRadius: FACE_AREA_SIZE * 0.4,
        borderWidth: 2,
        borderColor: 'rgba(82, 190, 242, 0.8)',
        backgroundColor: 'transparent',
    },
    guidesContainer: {
        position: 'absolute',
        width: FACE_AREA_SIZE * 0.75,
        height: FACE_AREA_SIZE * 0.9,
    },
    guideCorner: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderColor: '#ffffff',
    },
    guideTopLeft: {
        top: 0,
        left: 0,
        borderLeftWidth: 3,
        borderTopWidth: 3,
        borderTopLeftRadius: 8,
    },
    guideTopRight: {
        top: 0,
        right: 0,
        borderRightWidth: 3,
        borderTopWidth: 3,
        borderTopRightRadius: 8,
    },
    guideBottomLeft: {
        bottom: 0,
        left: 0,
        borderLeftWidth: 3,
        borderBottomWidth: 3,
        borderBottomLeftRadius: 8,
    },
    guideBottomRight: {
        bottom: 0,
        right: 0,
        borderRightWidth: 3,
        borderBottomWidth: 3,
        borderBottomRightRadius: 8,
    },
    alignmentLine: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    horizontalLine: {
        width: '100%',
        height: 1,
        top: '50%',
    },
    verticalLine: {
        width: 1,
        height: '100%',
        left: '50%',
    },
});

export default FaceOverlay;
