import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { generateId } from '../../../utils/helpers'

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  createdAt: string
  updatedAt: string
  category?: string
  tags: string[]
}

export interface TaskState {
  tasks: Task[]
  filter: 'all' | 'active' | 'completed'
  sortBy: 'dueDate' | 'priority' | 'createdAt' | 'title'
  isLoading: boolean
  error: string | null
}

const initialState: TaskState = {
  tasks: [],
  filter: 'all',
  sortBy: 'createdAt',
  isLoading: false,
  error: null,
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const now = new Date().toISOString()
      const newTask: Task = {
        ...action.payload,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      }
      state.tasks.push(newTask)
      state.error = null
    },
    updateTask: (state, action: PayloadAction<{ id: string; updates: Partial<Task> }>) => {
      const { id, updates } = action.payload
      const taskIndex = state.tasks.findIndex(task => task.id === id)
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        }
        state.error = null
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
      state.error = null
    },
    toggleTaskComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
        task.updatedAt = new Date().toISOString()
      }
    },
    setFilter: (state, action: PayloadAction<TaskState['filter']>) => {
      state.filter = action.payload
    },
    setSortBy: (state, action: PayloadAction<TaskState['sortBy']>) => {
      state.sortBy = action.payload
    },
    clearCompletedTasks: (state) => {
      state.tasks = state.tasks.filter(task => !task.completed)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  setFilter,
  setSortBy,
  clearCompletedTasks,
  setLoading,
  setError,
  clearError,
} = taskSlice.actions

// Selectors
export const selectAllTasks = (state: RootState) => state.tasks.tasks
export const selectTasksFilter = (state: RootState) => state.tasks.filter
export const selectTasksSortBy = (state: RootState) => state.tasks.sortBy
export const selectTasksLoading = (state: RootState) => state.tasks.isLoading
export const selectTasksError = (state: RootState) => state.tasks.error

export const selectFilteredTasks = (state: RootState) => {
  const tasks = selectAllTasks(state)
  const filter = selectTasksFilter(state)
  
  switch (filter) {
    case 'active':
      return tasks.filter(task => !task.completed)
    case 'completed':
      return tasks.filter(task => task.completed)
    default:
      return tasks
  }
}

export const selectTaskById = (state: RootState, taskId: string) =>
  state.tasks.tasks.find(task => task.id === taskId)

export const selectTaskStats = (state: RootState) => {
  const tasks = selectAllTasks(state)
  return {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    active: tasks.filter(task => !task.completed).length,
    overdue: tasks.filter(task => 
      !task.completed && 
      task.dueDate && 
      new Date(task.dueDate) < new Date()
    ).length,
  }
}

export default taskSlice.reducer