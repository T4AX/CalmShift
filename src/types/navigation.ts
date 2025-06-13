import type { NavigationProp, RouteProp } from "@react-navigation/native"

export type RootStackParamList = {
  Splash: undefined
  MainApp: undefined
  Dashboard: undefined
  Focus: undefined
  Mindfulness: undefined
  Goals: undefined
  History: undefined
  Settings: undefined
  MindfulnessExercise: { exerciseId: string }
  MindfulnessLibrary: undefined
  TaskDetail: { taskId: string }
  ProjectDetail: { projectId: string }
  Reports: undefined
  Tasks: undefined
  NotificationSettings: undefined
  NotificationHistory: undefined
  SessionDetail: { sessionId: string }
}

export type AppNavigationProp = NavigationProp<RootStackParamList>

export type AppScreenProps<T extends keyof RootStackParamList> = {
  navigation: NavigationProp<RootStackParamList, T>
  route: RouteProp<RootStackParamList, T>
}

