import { Platform } from 'react-native';
import FormData from 'form-data';
import axios from 'axios';

const API_URL = 'http://192.168.0.108:5000'; // Use 10.0.2.2 for Android emulator, localhost for iOS

export type FaceComparisonResult = {
    similarity: number;
    cccd_url: string;
    face_url: string;
    result: 'high' | 'medium' | 'low' | 'unsimilar';
};

/**
 * Compare face from selfie with face from ID card
 * @param selfieUri - URI of the captured selfie image
 * @param idCardUri - URI of the previously captured ID card image
 * @returns Promise with face comparison results
 */
export const compareFaces = async (
    selfieUri: string,
    idCardUri: string
): Promise<FaceComparisonResult> => {
    try {
        const formData = new FormData();

        // For React Native, we need to modify the URI for different platforms
        const selfieUriFormatted = Platform.OS === 'android'
            ? selfieUri
            : selfieUri.replace('file://', '');

        const idCardUriFormatted = Platform.OS === 'android'
            ? idCardUri
            : idCardUri.replace('file://', '');

        formData.append('image', {
            uri: selfieUriFormatted,
            type: 'image/jpeg',
            name: 'selfie.jpg',
        });

        formData.append('image2', {
            uri: idCardUriFormatted,
            type: 'image/jpeg',
            name: 'idcard.jpg',
        });

        const response = await axios.post(`${API_URL}/detect`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 15000, // 15 second timeout
        });

        return response.data;
    } catch (error: Error | any) {
        console.error('Error comparing faces:', error);
        throw new Error(
            error.response?.data?.error ||
            'Không thể xác minh danh tính. Vui lòng thử lại.'
        );
    }
};

/**
 * Get result message based on similarity level
 */
export const getFaceComparisonMessage = (result: string): {
    title: string;
    message: string;
    color: string;
} => {
    switch (result) {
        case 'high':
            return {
                title: 'Xác minh thành công',
                message: 'Khuôn mặt của bạn khớp với CCCD',
                color: '#10b981', // green
            };
        case 'medium':
            return {
                title: 'Xác minh thất bại',
                message: 'Khuôn mặt của bạn tương đối khớp với CCCD',
                color: '#f59e0b', // amber
            };
        case 'low':
            return {
                title: 'Xác minh thất bại',
                message: 'Khuôn mặt của bạn có ít điểm tương đồng với CCCD',
                color: '#f97316', // orange
            };
        case 'unsimilar':
            return {
                title: 'Xác minh thất bại',
                message: 'Khuôn mặt của bạn không khớp với CCCD',
                color: '#ef4444', // red
            };
        default:
            return {
                title: 'Lỗi xác minh',
                message: 'Có lỗi xảy ra trong quá trình xác minh',
                color: '#6b7280', // gray
            };
    }
};
