import type { NavigationProp, RouteProp } from "@react-navigation/native"

export type TabParamList = {
  Dashboard: undefined
  Focus: undefined
  Mindfulness: undefined
  Tasks: undefined
  History: undefined
}

export type RootStackParamList = {
  Splash: undefined
  MainApp: undefined
  Settings: undefined
  Projects: undefined
  Focus: undefined
  Mindfulness: undefined
}

export type AppNavigationProp = NavigationProp<RootStackParamList>
export type TabNavigationProp = NavigationProp<TabParamList>

export type AppScreenProps<T extends keyof RootStackParamList> = {
  navigation: NavigationProp<RootStackParamList, T>
  route: RouteProp<RootStackParamList, T>
}

export type TabScreenProps<T extends keyof TabParamList> = {
  navigation: NavigationProp<TabParamList, T>
  route: RouteProp<TabParamList, T>
}

