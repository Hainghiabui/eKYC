import { PermissionsAndroid, Platform } from 'react-native';

export const checkCameraPermission = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (granted) {
            return true;
        } else {
            const request = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            return request === PermissionsAndroid.RESULTS.GRANTED;
        }
    } else {
        // For iOS, permissions are handled differently
        return true; // Assume permission is granted for iOS
    }
};