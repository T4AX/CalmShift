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
import Icon from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const MainApp = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;
          const iconSize = size || 24;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Focus':
              iconName = focused ? 'timer' : 'timer-outline';
              break;
            case 'Mindfulness':
              iconName = focused ? 'leaf' : 'leaf-outline';
              break;
            case 'Tasks':
              iconName = focused ? 'checkbox' : 'checkbox-outline';
              break;

            case 'History':
              iconName = focused ? 'time' : 'time-outline';
              break;
            default:
              iconName = 'circle';
          }

          return (
            <Icon 
              name={iconName} 
              size={iconSize} 
              color={color}
              style={{
                marginBottom: focused ? 2 : 0,
              }}
            />
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
          elevation: 8,
          shadowColor: colors.text.primary,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Focus" 
        component={FocusSession}
        options={{
          tabBarLabel: 'Focus',
        }}
      />
      <Tab.Screen 
        name="Mindfulness" 
        component={Mindfulness}
        options={{
          tabBarLabel: 'Mindful',
        }}
      />
      <Tab.Screen 
        name="Tasks" 
        component={Tasks}
        options={{
          tabBarLabel: 'Tasks',
        }}
      />
      <Tab.Screen 
        name="History" 
        component={History}
        options={{
          tabBarLabel: 'History',
        }}
      />
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