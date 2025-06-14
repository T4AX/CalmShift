import { StyleSheet } from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/responsive'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsCard: {
    margin: scale(16),
    marginBottom: scale(8),
    padding: scale(16),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: scale(16),
    marginBottom: scale(8),
    borderRadius: scale(8),
    overflow: 'hidden',
  },
  filterTab: {
    flex: 1,
    paddingVertical: scale(12),
    alignItems: 'center',
  },
  filterText: {
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(16),
    marginBottom: scale(8),
    paddingVertical: scale(12),
    borderRadius: scale(8),
  },
  addButtonText: {
    marginLeft: scale(8),
    fontWeight: '500',
  },
  addTaskCard: {
    marginHorizontal: scale(16),
    marginBottom: scale(8),
    padding: scale(16),
  },
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addTaskInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    fontSize: moderateScale(16),
    marginRight: scale(8),
  },
  addTaskActions: {
    flexDirection: 'row',
    gap: scale(8),
  },
  actionButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tasksList: {
    flex: 1,
  },
  tasksContent: {
    padding: scale(16),
    paddingTop: 0,
  },
  taskCard: {
    marginBottom: scale(12),
    padding: scale(16),
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  taskCheckbox: {
    marginRight: scale(12),
    marginTop: scale(2),
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    marginBottom: scale(4),
    fontWeight: '500',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  taskDescription: {
    marginBottom: scale(8),
    lineHeight: moderateScale(20),
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityIndicator: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    marginRight: scale(6),
  },
  deleteButton: {
    padding: scale(4),
    marginLeft: scale(8),
  },
  emptyState: {
    alignItems: 'center',
    padding: scale(32),
    marginTop: scale(32),
  },
  emptyTitle: {
    marginTop: scale(16),
    marginBottom: scale(8),
  },
  emptyDescription: {
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
})