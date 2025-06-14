import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { motivationalQuotes as quotesData } from '../../../utils/quotesData';

export interface QuoteState {
  dailyQuote: {
    text: string;
    author: string;
  };
}

const initialState: QuoteState = {
  dailyQuote: quotesData[Math.floor(Math.random() * quotesData.length)],
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    refreshDailyQuote: (state) => {
      state.dailyQuote = quotesData[Math.floor(Math.random() * quotesData.length)];
    },
  },
});

export const { refreshDailyQuote } = quoteSlice.actions;

export const selectDailyQuote = (state: { quote: QuoteState }) => state.quote.dailyQuote;

export default quoteSlice.reducer;
