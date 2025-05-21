import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchQuery: string;
  selectedCountry: string;
  selectedCategory: string;
  language: string;
}

const initialState: FilterState = {
  searchQuery: '',
  selectedCountry: '',
  selectedCategory: '',
  language: 'en', // Default language is English
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedCountry = '';
      state.selectedCategory = '';
      // Keep language as is
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCountry,
  setSelectedCategory,
  setLanguage,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;