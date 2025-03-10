import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToastProvider } from './src/context/ToastContext';
import OnboardingScreen from './src/screen/OnboardingScreen';
import Login1Screen from './src/screen/login/Login1Screen';
import Login2Screen from './src/screen/login/Login2Screen';
import Login3Screen from './src/screen/login/Login3Screen';
import GetStartedScreen from './src/screen/GetStartedScreen';
import VerifyIdentityScreen from './src/screen/VerifyIdentityScreen';
import ProofOfResidencyScreen from './src/screen/ProofOfResidencyScreen';
import VerifyDataScreen from './src/screen/VerifyDataScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import AccountPin from './src/screen/AccountPin';
import RegisterScreen from './src/screen/RegisterScreen';
import VerifyFaceId from './src/screen/VerifyFaceId';
import FaceComparisonResultScreen from './src/screen/FaceComparisonResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ToastProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="Login1" component={Login1Screen} />
          <Stack.Screen name="Login2" component={Login2Screen} />
          <Stack.Screen name="Login3" component={Login3Screen} />
          <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
          <Stack.Screen name="VerifyIdentityScreen" component={VerifyIdentityScreen} />
          <Stack.Screen name="ProofOfResidencyScreen" component={ProofOfResidencyScreen} />
          <Stack.Screen name="VerifyDatascreen" component={VerifyDataScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="AccountPin" component={AccountPin} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="VerifyFaceId" component={VerifyFaceId} />
          <Stack.Screen name="FaceComparisonResult" component={FaceComparisonResultScreen} />
        </Stack.Navigator>
      </ToastProvider>
    </NavigationContainer>
  );
}