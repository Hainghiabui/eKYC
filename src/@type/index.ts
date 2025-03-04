import { ParamListBase } from "@react-navigation/native";

export type CCCDData = {
    idNumber: string;
    fullName: string;
    dateOfBirth: string;
    sex: string;
    nationality: string;
    placeOfOrigin: string;
    placeOfResidence: string;
    image: string;
    dateOfExpiry?: string;
};

export type RootStackParamList = ParamListBase & {
    HomeScreen: undefined;
    VerifyFaceId: {
        idCardImage?: string;
        onComplete?: (faceImage: string) => void;
    };
    FaceComparisonResult: {
        comparisonResult: {
            similarity: number;
            cccd_url: string;
            face_url: string;
            result: 'high' | 'medium' | 'low' | 'unsimilar';
        };
    };
    ProofOfResidencyScreen: undefined;
    VerifyDatascreen: {
        cccdInfo: CCCDData;
    };
    Login1: undefined;
    ProfileScreen: {
        cccdInfo: CCCDData;
    };
    Login3: {
        name: string;
        email: string;
        photoURL?: string;
    };
};