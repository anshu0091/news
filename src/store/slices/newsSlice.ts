import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchNewsAPI } from '../../services/newsService';

export interface NewsArticle {
  article_id: string;
  title: string;
  link: string;
  keywords: string[];
  creator: string[];
  description: string;
  content: string;
  pubDate: string;
  image_url: string | null;
  source_id: string;
  source_priority: number;
  country: string[];
  category: string[];
  language: string;
}

interface NewsState {
  articles: NewsArticle[];
  selectedArticle: NewsArticle | null;
  loading: boolean;
  error: string | null;
  totalResults: number;
  nextPage: string | null;
  lastFetched: number | null;
  currentFilters: {
    q: string;
    country: string;
    category: string;
    language: string;
  };
  currentPage: number;
}

const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

const initialState: NewsState = {
  articles: [],
  selectedArticle: null,
  loading: false,
  error: null,
  totalResults: 0,
  nextPage: null,
  lastFetched: null,
  currentFilters: {
    q: '',
    country: '',
    category: '',
    language: 'en'
  },
  currentPage: 0
};

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ 
    q = '', 
    country = '', 
    category = '',
    language = 'en', 
    page = 0 
  }: { 
    q?: string; 
    country?: string; 
    category?: string;
    language?: string;
    page?: number;
  }, { getState }) => {
    const state = getState() as { news: NewsState };
    const { lastFetched, currentFilters, currentPage } = state.news;
    const now = Date.now();

    // Check if we need to fetch new data
    const filtersChanged = 
      q !== currentFilters.q ||
      country !== currentFilters.country ||
      category !== currentFilters.category ||
      language !== currentFilters.language;

    const cacheExpired = lastFetched === null || (now - lastFetched) > CACHE_DURATION;

    // Always fetch if:
    // 1. It's a new search (page 0 and filters changed)
    // 2. It's pagination (page > 0)
    // 3. Cache is expired and no filters are active
    if ((page === 0 && filtersChanged) || page > 0 || (cacheExpired && !q && !country && !category)) {
      return await fetchNewsAPI(q, country, category, language, page);
    }

    // Return current state if cache is valid
    return {
      status: 'success',
      totalResults: state.news.totalResults,
      results: state.news.articles,
      nextPage: state.news.nextPage
    };
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setSelectedArticle: (state, action: PayloadAction<NewsArticle | null>) => {
      state.selectedArticle = action.payload;
    },
    clearNews: (state) => {
      state.articles = [];
      state.nextPage = null;
      state.totalResults = 0;
      state.lastFetched = null;
      state.currentPage = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        
        // For initial load or fresh search
        if (action.meta.arg.page === 0) {
          state.articles = action.payload.results;
          state.currentPage = 0;
        } else {
          // For pagination, append new results while avoiding duplicates
          const existingIds = new Set(state.articles.map(article => article.article_id));
          const newArticles = action.payload.results.filter(
            article => !existingIds.has(article.article_id)
          );
          
          // Only append if we have new articles
          if (newArticles.length > 0) {
            state.articles = [...state.articles, ...newArticles];
            state.currentPage = action.meta.arg.page || 0;
          }
        }
        
        state.totalResults = action.payload.totalResults;
        state.nextPage = action.payload.nextPage;
        state.lastFetched = Date.now();
        state.currentFilters = {
          q: action.meta.arg.q || '',
          country: action.meta.arg.country || '',
          category: action.meta.arg.category || '',
          language: action.meta.arg.language || 'en'
        };
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
      });
  },
});

export const { setSelectedArticle, clearNews } = newsSlice.actions;
export default newsSlice.reducer;