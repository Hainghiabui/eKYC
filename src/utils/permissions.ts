import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const checkCameraPermission = async () => {
    try {
        const permission = Platform.select({
            android: PERMISSIONS.ANDROID.CAMERA,
            ios: PERMISSIONS.IOS.CAMERA,
        });

        if (!permission) {
            throw new Error('Permission is not defined');
        }

        const result = await check(permission);

        switch (result) {
            case RESULTS.GRANTED:
                return true;
            case RESULTS.DENIED:
                const requestResult = await request(permission);
                return requestResult === RESULTS.GRANTED;
            default:
                return false;
        }
    } catch (error) {
        console.error('Permission check failed:', error);
        return false;
    }
};