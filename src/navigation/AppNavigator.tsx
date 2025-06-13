import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, type Theme } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';
import Dashboard from '../screens/Dashboard';
import FocusSession from '../screens/FocusSession';
import Mindfulness from '../screens/Mindfulness';
import Tasks from '../screens/Tasks';
import History from '../screens/History';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Splash from '../screens/Splash';
import Settings from '../screens/Settings';
import Projects from '../screens/Projects';

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const MainApp = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Focus" component={FocusSession} />
      <Tab.Screen name="Mindfulness" component={Mindfulness} />
      <Tab.Screen name="Tasks" component={Tasks} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { theme, colors } = useTheme();

  const MyTheme: Theme = {
    dark: theme === 'dark',
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text.primary,
      border: colors.border,
      notification: colors.danger,
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={colors.background}
          translucent={false}
        />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="MainApp" component={MainApp} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Projects" component={Projects} />
          <Stack.Screen
            name="Focus"
            component={FocusSession}
          />
          <Stack.Screen
            name="Mindfulness"
            component={Mindfulness}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;