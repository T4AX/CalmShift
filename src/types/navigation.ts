import type { NavigationProp, RouteProp } from "@react-navigation/native"

export type TabParamList = {
  Dashboard: undefined;
  Focus: undefined;
  Mindfulness: undefined;
  Tasks: undefined;
  History: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  MainApp: undefined;
  Settings: undefined;
  Projects: undefined;
};


export type AppNavigationProp = NavigationProp<RootStackParamList>

export type AppScreenProps<T extends keyof RootStackParamList> = {
  navigation: NavigationProp<RootStackParamList, T>
  route: RouteProp<RootStackParamList, T>
}

