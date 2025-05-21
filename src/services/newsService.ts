import { NewsArticle } from '../store/slices/newsSlice';

const API_KEY = 'pub_38a841c1f4f6409fb0959c5146d235b1';
const BASE_URL = 'https://newsdata.io/api/1/news';

interface NewsResponse {
  status: string;
  totalResults: number;
  results: NewsArticle[];
  nextPage: string | null;
}

export const fetchNewsAPI = async (
  q: string = '',
  country: string = '',
  category: string = '',
  language: string = 'en',
  page: number = 0
): Promise<NewsResponse> => {
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}&language=${language}`;
    
    if (q) url += `&q=${encodeURIComponent(q)}`;
    if (country) url += `&country=${country}`;
    if (category) url += `&category=${category}`;
    
    // For pagination
    if (page > 0) {
      url += `&page=${page}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      status: data.status,
      totalResults: data.totalResults || 0,
      results: data.results || [],
      nextPage: data.nextPage || null,
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

// Countries supported by the API
export const countries = [
  { code: 'au', name: 'Australia' },
  { code: 'ca', name: 'Canada' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'in', name: 'India' },
  { code: 'us', name: 'United States' },
  { code: 'za', name: 'South Africa' },
  // Add more countries as needed
];

// Categories supported by the API
export const categories = [
  { code: 'business', name: 'Business' },
  { code: 'entertainment', name: 'Entertainment' },
  { code: 'environment', name: 'Environment' },
  { code: 'food', name: 'Food' },
  { code: 'health', name: 'Health' },
  { code: 'politics', name: 'Politics' },
  { code: 'science', name: 'Science' },
  { code: 'sports', name: 'Sports' },
  { code: 'technology', name: 'Technology' },
  { code: 'top', name: 'Top News' },
  { code: 'world', name: 'World' },
];