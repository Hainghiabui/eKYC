import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './src/screen/OnboardingScreen';
import Login1Screen from './src/screen/login/Login1Screen';
import Login2Screen from './src/screen/login/Login2Screen';
import Login3Screen from './src/screen/login/Login3Screen';
import GetStartedScreen from './src/screen/GetStartedScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login1" component={Login1Screen} />
        <Stack.Screen name="Login2" component={Login2Screen} />
        <Stack.Screen name="Login3" component={Login3Screen} />
        <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}