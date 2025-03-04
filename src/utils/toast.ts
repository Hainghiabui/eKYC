import { ToastAndroid, Platform } from 'react-native';
import { ToastType } from '../components/Toast';

/**
 * Format error message for display
 * @param error Any error object or message
 * @returns Formatted error message as string
 */
export const formatErrorMessage = (error: any): string => {
    if (!error) return 'Unknown error occurred';

    // If it's a string already
    if (typeof error === 'string') return error;

    // Handle Firebase auth errors by error code
    if (error.code) {
        switch (error.code) {
            // Authentication errors
            case 'auth/email-already-in-use':
                return 'Email này đã được sử dụng.';
            case 'auth/invalid-email':
                return 'Email không hợp lệ.';
            case 'auth/invalid-credential':
                return 'Email hoặc mật khẩu không đúng.';
            case 'auth/user-disabled':
                return 'Tài khoản này đã bị vô hiệu hóa.';
            case 'auth/user-not-found':
                return 'Không tìm thấy tài khoản với email này.';
            case 'auth/wrong-password':
                return 'Mật khẩu không đúng.';
            case 'auth/weak-password':
                return 'Mật khẩu quá yếu. Vui lòng sử dụng mật khẩu mạnh hơn.';
            case 'auth/operation-not-allowed':
                return 'Thao tác này không được phép.';
            case 'auth/network-request-failed':
                return 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối của bạn.';
            case 'auth/too-many-requests':
                return 'Quá nhiều yêu cầu. Vui lòng thử lại sau.';
            case 'auth/requires-recent-login':
                return 'Vui lòng đăng nhập lại để tiếp tục.';

            // Add other Firebase error codes as needed
            default:
                return error.message || `Lỗi: ${error.code}`;
        }
    }

    // If it's an Error object
    if (error instanceof Error) {
        return error.message || error.toString();
    }

    // If it has a message property
    if (error.message) return error.message;

    // Last resort: stringify the object
    try {
        return JSON.stringify(error);
    } catch (e) {
        return 'Error cannot be displayed';
    }
};

/**
 * Show a toast notification
 * This is a standalone function that will be overridden by the context when available
 */
export const showToast = (
    type: ToastType,
    title: string,
    message: any  // Accept any type of error
) => {
    // Format the message if it's an error object
    const formattedMessage = formatErrorMessage(message);

    // Fallback for Android when context is not available
    if (Platform.OS === 'android') {
        ToastAndroid.show(`${title}: ${formattedMessage}`, ToastAndroid.SHORT);
    } else {
        console.log(`[${type.toUpperCase()}] ${title}: ${formattedMessage}`);
    }
};