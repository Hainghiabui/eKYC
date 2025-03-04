import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const { width } = Dimensions.get('window');

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
    visible: boolean;
    type: ToastType;
    title: string;
    message: string;
    onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({
    visible,
    type,
    title,
    message,
    onDismiss,
}) => {
    const [ animation ] = useState(new Animated.Value(-100));

    useEffect(() => {
        if (visible) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(() => {
                handleDismiss();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [ visible ]);

    const handleDismiss = () => {
        Animated.timing(animation, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            onDismiss();
        });
    };

    const getToastStyle = () => {
        switch (type) {
            case 'success':
                return {
                    backgroundColor: '#ecfdf5',
                    borderColor: '#10b981',
                    icon: 'circle-check',
                    iconColor: '#10b981',
                    textColor: '#064e3b',
                };
            case 'error':
                return {
                    backgroundColor: '#fef2f2',
                    borderColor: '#ef4444',
                    icon: 'circle-exclamation',
                    iconColor: '#ef4444',
                    textColor: '#7f1d1d',
                };
            case 'warning':
                return {
                    backgroundColor: '#fffbeb',
                    borderColor: '#f59e0b',
                    icon: 'triangle-exclamation',
                    iconColor: '#f59e0b',
                    textColor: '#78350f',
                };
            case 'info':
            default:
                return {
                    backgroundColor: '#eff6ff',
                    borderColor: '#3b82f6',
                    icon: 'circle-info',
                    iconColor: '#3b82f6',
                    textColor: '#1e3a8a',
                };
        }
    };

    const toastStyle = getToastStyle();

    if (!visible) return null;

    return (
        <SafeAreaView style={styles.safeArea}>
            <Animated.View
                style={[
                    styles.container,
                    {
                        backgroundColor: toastStyle.backgroundColor,
                        borderLeftColor: toastStyle.borderColor,
                        transform: [ { translateY: animation } ],
                    },
                ]}
            >
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <FontAwesome6
                            name={toastStyle.icon}
                            size={24}
                            color={toastStyle.iconColor}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={[ styles.title, { color: toastStyle.textColor } ]}>
                            {title}
                        </Text>
                        <Text style={[ styles.message, { color: toastStyle.textColor } ]}>
                            {message}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
                        <FontAwesome6 name="xmark" size={16} color="#64748b" />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
    },
    container: {
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 8,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        overflow: 'hidden',
    },
    content: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
        marginRight: 4,
    },
    title: {
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 2,
    },
    message: {
        fontSize: 14,
    },
    closeButton: {
        padding: 6,
    },
});

export default Toast;
