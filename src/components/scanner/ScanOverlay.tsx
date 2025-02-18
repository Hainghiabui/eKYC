import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Constants for scan area dimensions
export const SCAN_AREA_WIDTH = width * 0.85;
export const SCAN_AREA_HEIGHT = height * 0.3;
export const SCAN_AREA_TOP = height * 0.35;

const ScanOverlay = () => {
    return (
        <View style={styles.overlay}>
            <View style={[ styles.topMask, { height: SCAN_AREA_TOP } ]} />
            <View style={styles.middleSection}>
                <View style={styles.leftMask} />
                <View style={styles.scanArea} />
                <View style={styles.rightMask} />
            </View>
            <View style={styles.bottomMask} />
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    topMask: {
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    middleSection: {
        flexDirection: 'row',
        height: SCAN_AREA_HEIGHT,
    },
    leftMask: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    scanArea: {
        width: SCAN_AREA_WIDTH,
        backgroundColor: 'transparent',
    },
    rightMask: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    bottomMask: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
});

export default ScanOverlay;