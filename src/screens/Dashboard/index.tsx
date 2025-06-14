import React from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { selectDailyQuote, refreshDailyQuote } from '../../redux/features/quotes/quoteSlice'
import { Typography, Card, HeaderBar, Quotes } from '../../components'
import type { TabScreenProps } from '../../types'
import { styles } from './Styles'

type DashboardProps = TabScreenProps<'Dashboard'>

const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const dailyQuote = useAppSelector(selectDailyQuote)

  const handleRefreshQuote = () => {
    dispatch(refreshDailyQuote())
  }

  const navigateToFocus = () => {
    navigation.navigate('Focus')
  }

  const navigateToMindfulness = () => {
    navigation.navigate('Mindfulness')
  }

  const navigateToTasks = () => {
    navigation.navigate('Tasks')
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderBar title="Dashboard" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <Card style={styles.welcomeCard}>
          <Typography variant="h2" color="primary" style={styles.welcomeTitle}>
            Welcome Back!
          </Typography>
          <Typography variant="body1" color="secondary" style={styles.welcomeSubtitle}>
            Ready to have a productive day?
          </Typography>
        </Card>

        {/* Daily Quote */}
        <Quotes 
          quote={dailyQuote}
          onRefresh={handleRefreshQuote}
          style={styles.quoteCard}
        />

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Typography variant="h3" color="primary" style={styles.sectionTitle}>
            Quick Actions
          </Typography>
          
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: colors.card }]}
              onPress={navigateToFocus}
            >
              <Typography variant="h4" color="primary">
                Focus Session
              </Typography>
              <Typography variant="body2" color="secondary" style={styles.actionDescription}>
                Start a focused work session
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: colors.card }]}
              onPress={navigateToMindfulness}
            >
              <Typography variant="h4" color="primary">
                Mindfulness
              </Typography>
              <Typography variant="body2" color="secondary" style={styles.actionDescription}>
                Take a moment to breathe
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionCard, { backgroundColor: colors.card }]}
              onPress={navigateToTasks}
            >
              <Typography variant="h4" color="primary">
                Tasks
              </Typography>
              <Typography variant="body2" color="secondary" style={styles.actionDescription}>
                Manage your to-do list
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Dashboard