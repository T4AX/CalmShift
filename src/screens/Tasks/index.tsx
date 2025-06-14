import React, { useState } from 'react'
import { View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '../../context/ThemeContext'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import {
  selectFilteredTasks,
  selectTasksFilter,
  selectTaskStats,
  addTask,
  toggleTaskComplete,
  deleteTask,
  setFilter,
  type Task,
} from '../../redux/features/tasks/taskSlice'
import { Typography, Card, HeaderBar } from '../../components'
import type { TabScreenProps } from '../../types'
import { styles } from './Styles'

type TasksProps = TabScreenProps<'Tasks'>

const Tasks: React.FC<TasksProps> = ({ navigation }) => {
  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectFilteredTasks)
  const filter = useAppSelector(selectTasksFilter)
  const stats = useAppSelector(selectTaskStats)
  
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [showAddTask, setShowAddTask] = useState(false)

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      dispatch(addTask({
        title: newTaskTitle.trim(),
        completed: false,
        priority: 'medium',
        tags: [],
      }))
      setNewTaskTitle('')
      setShowAddTask(false)
    }
  }

  const handleToggleTask = (taskId: string) => {
    dispatch(toggleTaskComplete(taskId))
  }

  const handleDeleteTask = (taskId: string, taskTitle: string) => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${taskTitle}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => dispatch(deleteTask(taskId)) },
      ]
    )
  }

  const handleFilterChange = (newFilter: typeof filter) => {
    dispatch(setFilter(newFilter))
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return colors.danger
      case 'medium':
        return '#F59E0B'
      case 'low':
        return colors.success
      default:
        return colors.text.secondary
    }
  }

  const renderTask = (task: Task) => (
    <Card key={task.id} style={styles.taskCard}>
      <View style={styles.taskContent}>
        <TouchableOpacity
          style={styles.taskCheckbox}
          onPress={() => handleToggleTask(task.id)}
        >
          <Icon
            name={task.completed ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color={task.completed ? colors.success : colors.text.secondary}
          />
        </TouchableOpacity>
        
        <View style={styles.taskDetails}>
          <Typography
            variant="body1"
            style={[
              styles.taskTitle,
              task.completed && styles.completedTask,
            ]}
          >
            {task.title}
          </Typography>
          
          {task.description && (
            <Typography variant="body2" color="secondary" style={styles.taskDescription}>
              {task.description}
            </Typography>
          )}
          
          <View style={styles.taskMeta}>
            <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(task.priority) }]} />
            <Typography variant="caption" color="secondary">
              {task.priority} priority
            </Typography>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteTask(task.id, task.title)}
        >
          <Icon name="delete-outline" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </Card>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <HeaderBar title="Tasks" />
      
      {/* Stats */}
      <Card style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Typography variant="h4" color="primary">{stats.total}</Typography>
            <Typography variant="caption" color="secondary">Total</Typography>
          </View>
          <View style={styles.statItem}>
            <Typography variant="h4" color="success">{stats.completed}</Typography>
            <Typography variant="caption" color="secondary">Completed</Typography>
          </View>
          <View style={styles.statItem}>
            <Typography variant="h4" color="warning">{stats.active}</Typography>
            <Typography variant="caption" color="secondary">Active</Typography>
          </View>
          <View style={styles.statItem}>
            <Typography variant="h4" color="danger">{stats.overdue}</Typography>
            <Typography variant="caption" color="secondary">Overdue</Typography>
          </View>
        </View>
      </Card>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {(['all', 'active', 'completed'] as const).map((filterOption) => (
          <TouchableOpacity
            key={filterOption}
            style={[
              styles.filterTab,
              { backgroundColor: filter === filterOption ? colors.primary : colors.card },
            ]}
            onPress={() => handleFilterChange(filterOption)}
          >
            <Typography
              variant="body2"
              color={filter === filterOption ? 'inverse' : 'primary'}
              style={styles.filterText}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add Task Button */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => setShowAddTask(true)}
      >
        <Icon name="plus" size={24} color={colors.background} />
        <Typography variant="body2" color="inverse" style={styles.addButtonText}>
          Add Task
        </Typography>
      </TouchableOpacity>

      {/* Add Task Input */}
      {showAddTask && (
        <Card style={styles.addTaskCard}>
          <View style={styles.addTaskContainer}>
            <TextInput
              style={[styles.addTaskInput, { color: colors.text.primary, borderColor: colors.border }]}
              placeholder="Enter task title..."
              placeholderTextColor={colors.text.secondary}
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              autoFocus
              onSubmitEditing={handleAddTask}
            />
            <View style={styles.addTaskActions}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.success }]}
                onPress={handleAddTask}
              >
                <Icon name="check" size={20} color={colors.background} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.danger }]}
                onPress={() => {
                  setShowAddTask(false)
                  setNewTaskTitle('')
                }}
              >
                <Icon name="close" size={20} color={colors.background} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      )}

      {/* Tasks List */}
      <ScrollView 
        style={styles.tasksList}
        contentContainerStyle={styles.tasksContent}
        showsVerticalScrollIndicator={false}
      >
        {tasks.length === 0 ? (
          <Card style={styles.emptyState}>
            <Icon name="clipboard-text-outline" size={48} color={colors.text.secondary} />
            <Typography variant="h4" color="secondary" style={styles.emptyTitle}>
              No tasks found
            </Typography>
            <Typography variant="body2" color="secondary" style={styles.emptyDescription}>
              {filter === 'all' 
                ? 'Add your first task to get started!'
                : `No ${filter} tasks at the moment.`
              }
            </Typography>
          </Card>
        ) : (
          tasks.map(renderTask)
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Tasks