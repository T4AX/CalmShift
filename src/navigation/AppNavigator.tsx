import { NavigationContainer, type Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

import Dashboard from '../screens/Dashboard';
import FocusSession from '../screens/FocusSession';
import Mindfulness from '../screens/Mindfulness';
import Tasks from '../screens/Tasks';
import History from '../screens/History';
import Splash from '../screens/Splash';
import Settings from '../screens/Settings';
import Projects from '../screens/Projects';
import { TabParamList, RootStackParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();
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
  const { theme, colors } = useTheme()

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
    fonts: {
      regular: {
        fontFamily: 'System',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'System',
        fontWeight: 'bold',
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '900',
      },
    },
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="MainApp" component={MainApp} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Projects" component={Projects} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default AppNavigator