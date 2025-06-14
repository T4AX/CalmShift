import { RootState } from './store';

export const selectDailyQuote = (state: RootState) => state.quote.dailyQuote;