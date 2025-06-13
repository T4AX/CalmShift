import type { NavigationProp, RouteProp } from "@react-navigation/native"

export type RootStackParamList = {
  Splash: undefined
  MainApp: undefined
  Dashboard: undefined
  Focus: undefined
  Mindfulness: undefined
  History: undefined
  Settings: undefined
  Tasks: undefined
  Projects: undefined
}

export type AppNavigationProp = NavigationProp<RootStackParamList>

export type AppScreenProps<T extends keyof RootStackParamList> = {
  navigation: NavigationProp<RootStackParamList, T>
  route: RouteProp<RootStackParamList, T>
}

