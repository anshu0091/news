import React from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '../../store/slices/newsSlice';
import { Calendar, Globe } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSelectedArticle } from '../../store/slices/newsSlice';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const dispatch = useDispatch();
  const formattedDate = new Date(article.pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Default image for articles without an image
  const imageUrl = article.image_url || 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg';
  
  // Handle article selection
  const handleSelectArticle = () => {
    dispatch(setSelectedArticle(article));
  };
  
  return (
    <article className="card hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {article.category && article.category.length > 0 && (
          <span className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 text-sm rounded-full">
            {article.category[0]}
          </span>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.description || 'No description available.'}
        </p>
        
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-4">
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
          
          {article.country && article.country.length > 0 && (
            <div className="flex items-center">
              <Globe size={16} className="mr-1" />
              <span>{article.country[0].toUpperCase()}</span>
            </div>
          )}
          
          <div>
            <span className="font-medium">Source: </span>
            <span>{article.source_id}</span>
          </div>
        </div>
        
        <Link 
          to={`/news/${article.article_id}`} 
          className="btn btn-primary inline-block w-full text-center"
          onClick={handleSelectArticle}
          aria-label={`Read full article: ${article.title}`}
        >
          Read Article
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;