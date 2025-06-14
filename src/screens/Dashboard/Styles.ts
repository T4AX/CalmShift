import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/responsive'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: scale(16),
    paddingBottom: scale(32),
  },
  welcomeCard: {
    marginBottom: verticalScale(20),
    padding: scale(20),
  },
  welcomeTitle: {
    marginBottom: verticalScale(8),
  },
  welcomeSubtitle: {
    lineHeight: moderateScale(22),
  },
  quoteCard: {
    marginBottom: verticalScale(24),
  },
  quickActionsContainer: {
    marginBottom: verticalScale(24),
  },
  sectionTitle: {
    marginBottom: verticalScale(16),
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    padding: scale(16),
    borderRadius: scale(12),
    marginBottom: verticalScale(12),
    minHeight: verticalScale(100),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionDescription: {
    marginTop: verticalScale(4),
    lineHeight: moderateScale(18),
  },
})