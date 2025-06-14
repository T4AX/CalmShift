import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { motivationalQuotes as quotesData } from '../../../utils/quotesData'
import type { RootState } from '../../store'

export interface Quote {
  text: string
  author: string
}

export interface QuoteState {
  dailyQuote: Quote
  favoriteQuotes: Quote[]
  lastRefreshDate: string | null
  isLoading: boolean
  error: string | null
}

const getRandomQuote = (): Quote => {
  return quotesData[Math.floor(Math.random() * quotesData.length)]
}

const initialState: QuoteState = {
  dailyQuote: getRandomQuote(),
  favoriteQuotes: [],
  lastRefreshDate: null,
  isLoading: false,
  error: null,
}

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    refreshDailyQuote: (state) => {
      try {
        state.isLoading = true
        state.error = null
        state.dailyQuote = getRandomQuote()
        state.lastRefreshDate = new Date().toISOString()
        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.error = 'Failed to refresh quote'
      }
    },
    addToFavorites: (state, action: PayloadAction<Quote>) => {
      const exists = state.favoriteQuotes.some(
        quote => quote.text === action.payload.text && quote.author === action.payload.author
      )
      if (!exists) {
        state.favoriteQuotes.push(action.payload)
      }
    },
    removeFromFavorites: (state, action: PayloadAction<Quote>) => {
      state.favoriteQuotes = state.favoriteQuotes.filter(
        quote => !(quote.text === action.payload.text && quote.author === action.payload.author)
      )
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { 
  refreshDailyQuote, 
  addToFavorites, 
  removeFromFavorites, 
  clearError 
} = quoteSlice.actions

// Selectors
export const selectDailyQuote = (state: RootState) => state.quote.dailyQuote
export const selectFavoriteQuotes = (state: RootState) => state.quote.favoriteQuotes
export const selectQuoteLoading = (state: RootState) => state.quote.isLoading
export const selectQuoteError = (state: RootState) => state.quote.error
export const selectLastRefreshDate = (state: RootState) => state.quote.lastRefreshDate

export default quoteSlice.reducer
