import { ParamListBase } from "@react-navigation/native";

type RootStackParamList = ParamListBase & {
    Login1: undefined;
    ProfileScreen: {
        cccdInfo: CCCDData;
    };
}
interface CCCDData {
    idNumber: string;
    fullName: string;
    dateOfBirth: string;
    sex: string;
    nationality: string;
    placeOfOrigin: string;
    placeOfResidence: string;
    // dateOfExpiry: string;
}

export type { RootStackParamList, CCCDData };