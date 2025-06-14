import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { generateId } from '../../../utils/helpers'

export interface FocusSession {
  id: string
  duration: number // in minutes
  actualDuration?: number // in minutes
  startTime: string
  endTime?: string
  completed: boolean
  interrupted: boolean
  type: 'pomodoro' | 'deep-work' | 'custom'
  taskId?: string
  notes?: string
}

export interface FocusSettings {
  defaultDuration: number
  breakDuration: number
  longBreakDuration: number
  sessionsUntilLongBreak: number
  soundEnabled: boolean
  vibrationEnabled: boolean
  autoStartBreaks: boolean
  autoStartSessions: boolean
}

export interface FocusState {
  currentSession: FocusSession | null
  sessions: FocusSession[]
  settings: FocusSettings
  isActive: boolean
  isPaused: boolean
  timeRemaining: number // in seconds
  sessionCount: number
  isBreak: boolean
  breakTimeRemaining: number // in seconds
  stats: {
    totalSessions: number
    totalFocusTime: number // in minutes
    averageSessionLength: number // in minutes
    completionRate: number // percentage
    streak: number // consecutive days with sessions
  }
}

const defaultSettings: FocusSettings = {
  defaultDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4,
  soundEnabled: true,
  vibrationEnabled: true,
  autoStartBreaks: false,
  autoStartSessions: false,
}

const initialState: FocusState = {
  currentSession: null,
  sessions: [],
  settings: defaultSettings,
  isActive: false,
  isPaused: false,
  timeRemaining: 0,
  sessionCount: 0,
  isBreak: false,
  breakTimeRemaining: 0,
  stats: {
    totalSessions: 0,
    totalFocusTime: 0,
    averageSessionLength: 0,
    completionRate: 0,
    streak: 0,
  },
}

export const focusSlice = createSlice({
  name: 'focus',
  initialState,
  reducers: {
    startSession: (state, action: PayloadAction<{ duration?: number; type?: FocusSession['type']; taskId?: string }>) => {
      const { duration = state.settings.defaultDuration, type = 'pomodoro', taskId } = action.payload
      
      const newSession: FocusSession = {
        id: generateId(),
        duration,
        startTime: new Date().toISOString(),
        completed: false,
        interrupted: false,
        type,
        taskId,
      }
      
      state.currentSession = newSession
      state.isActive = true
      state.isPaused = false
      state.timeRemaining = duration * 60 // convert to seconds
      state.isBreak = false
    },
    pauseSession: (state) => {
      state.isPaused = true
    },
    resumeSession: (state) => {
      state.isPaused = false
    },
    stopSession: (state, action: PayloadAction<{ completed?: boolean; notes?: string }>) => {
      if (state.currentSession) {
        const { completed = false, notes } = action.payload
        const endTime = new Date().toISOString()
        const actualDuration = Math.round((new Date(endTime).getTime() - new Date(state.currentSession.startTime).getTime()) / (1000 * 60))
        
        const completedSession: FocusSession = {
          ...state.currentSession,
          endTime,
          actualDuration,
          completed,
          interrupted: !completed,
          notes,
        }
        
        state.sessions.push(completedSession)
        state.currentSession = null
        state.isActive = false
        state.isPaused = false
        state.timeRemaining = 0
        
        if (completed) {
          state.sessionCount += 1
        }
        
        // Update stats
        state.stats.totalSessions = state.sessions.length
        state.stats.totalFocusTime = state.sessions.reduce((total, session) => 
          total + (session.actualDuration || 0), 0)
        state.stats.averageSessionLength = state.stats.totalSessions > 0 
          ? state.stats.totalFocusTime / state.stats.totalSessions 
          : 0
        state.stats.completionRate = state.stats.totalSessions > 0 
          ? (state.sessions.filter(s => s.completed).length / state.stats.totalSessions) * 100 
          : 0
      }
    },
    updateTimeRemaining: (state, action: PayloadAction<number>) => {
      state.timeRemaining = Math.max(0, action.payload)
    },
    startBreak: (state) => {
      const isLongBreak = state.sessionCount % state.settings.sessionsUntilLongBreak === 0
      const breakDuration = isLongBreak ? state.settings.longBreakDuration : state.settings.breakDuration
      
      state.isBreak = true
      state.breakTimeRemaining = breakDuration * 60 // convert to seconds
    },
    updateBreakTimeRemaining: (state, action: PayloadAction<number>) => {
      state.breakTimeRemaining = Math.max(0, action.payload)
    },
    endBreak: (state) => {
      state.isBreak = false
      state.breakTimeRemaining = 0
    },
    updateSettings: (state, action: PayloadAction<Partial<FocusSettings>>) => {
      state.settings = { ...state.settings, ...action.payload }
    },
    resetSessionCount: (state) => {
      state.sessionCount = 0
    },
    addSessionNote: (state, action: PayloadAction<{ sessionId: string; notes: string }>) => {
      const session = state.sessions.find(s => s.id === action.payload.sessionId)
      if (session) {
        session.notes = action.payload.notes
      }
    },
    deleteSession: (state, action: PayloadAction<string>) => {
      state.sessions = state.sessions.filter(s => s.id !== action.payload)
      // Recalculate stats
      state.stats.totalSessions = state.sessions.length
      state.stats.totalFocusTime = state.sessions.reduce((total, session) => 
        total + (session.actualDuration || 0), 0)
      state.stats.averageSessionLength = state.stats.totalSessions > 0 
        ? state.stats.totalFocusTime / state.stats.totalSessions 
        : 0
      state.stats.completionRate = state.stats.totalSessions > 0 
        ? (state.sessions.filter(s => s.completed).length / state.stats.totalSessions) * 100 
        : 0
    },
  },
})

export const {
  startSession,
  pauseSession,
  resumeSession,
  stopSession,
  updateTimeRemaining,
  startBreak,
  updateBreakTimeRemaining,
  endBreak,
  updateSettings,
  resetSessionCount,
  addSessionNote,
  deleteSession,
} = focusSlice.actions

// Selectors
export const selectCurrentSession = (state: RootState) => state.focus.currentSession
export const selectAllSessions = (state: RootState) => state.focus.sessions
export const selectFocusSettings = (state: RootState) => state.focus.settings
export const selectIsActive = (state: RootState) => state.focus.isActive
export const selectIsPaused = (state: RootState) => state.focus.isPaused
export const selectTimeRemaining = (state: RootState) => state.focus.timeRemaining
export const selectSessionCount = (state: RootState) => state.focus.sessionCount
export const selectIsBreak = (state: RootState) => state.focus.isBreak
export const selectBreakTimeRemaining = (state: RootState) => state.focus.breakTimeRemaining
export const selectFocusStats = (state: RootState) => state.focus.stats

export const selectSessionById = (state: RootState, sessionId: string) =>
  state.focus.sessions.find(session => session.id === sessionId)

export const selectTodaysSessions = (state: RootState) => {
  const today = new Date().toDateString()
  return state.focus.sessions.filter(session => 
    new Date(session.startTime).toDateString() === today
  )
}

export const selectSessionsByDate = (state: RootState, date: string) =>
  state.focus.sessions.filter(session => 
    new Date(session.startTime).toDateString() === new Date(date).toDateString()
  )

export default focusSlice.reducer