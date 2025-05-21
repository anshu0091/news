import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import NewsCard from './NewsCard';
import { Loader } from 'lucide-react';

const NewsGrid: React.FC = () => {
  const { articles, loading, error } = useSelector((state: RootState) => state.news);

  if (loading && articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Loader size={48} className="text-primary-600 animate-spin mb-4" />
        <p className="text-xl text-gray-600">Loading news articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 border border-error-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-error-800 mb-2">Error</h3>
        <p className="text-error-600">{error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Articles Found</h3>
        <p className="text-gray-600">Try adjusting your search or filter criteria to find more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <NewsCard key={article.article_id} article={article} />
      ))}
    </div>
  );
};

export default NewsGrid;