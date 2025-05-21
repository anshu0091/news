import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Calendar, Globe, ArrowLeft, ExternalLink } from 'lucide-react';
import TextToSpeech from '../components/accessibility/TextToSpeech';

const NewsDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { selectedArticle } = useSelector((state: RootState) => state.news);
  
  useEffect(() => {
    if (!selectedArticle) {
      // If no article is selected, redirect to home
      navigate('/');
    }
  }, [selectedArticle, navigate]);
  
  if (!selectedArticle) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-xl text-gray-600">Loading article...</p>
      </div>
    );
  }
  
  const formattedDate = new Date(selectedArticle.pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Generate full article text for text-to-speech
  const fullArticleText = `
    ${selectedArticle.title}. 
    ${selectedArticle.description || ''}
    ${selectedArticle.content || ''}
  `;
  
  return (
    <article className="max-w-4xl mx-auto">
      <Link 
        to="/" 
        className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6"
        aria-label="Back to news list"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to All News
      </Link>
      
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{selectedArticle.title}</h1>
      
      <div className="flex flex-wrap items-center text-gray-600 mb-6 gap-4">
        <div className="flex items-center">
          <Calendar size={18} className="mr-2" />
          <span>{formattedDate}</span>
        </div>
        
        {selectedArticle.country && selectedArticle.country.length > 0 && (
          <div className="flex items-center">
            <Globe size={18} className="mr-2" />
            <span>{selectedArticle.country[0].toUpperCase()}</span>
          </div>
        )}
        
        <div>
          <span className="font-medium">Source: </span>
          <span>{selectedArticle.source_id}</span>
        </div>
      </div>
      
      {/* Text-to-Speech Component */}
      <TextToSpeech text={fullArticleText} />
      
      {/* Featured Image */}
      {selectedArticle.image_url && (
        <div className="mb-8">
          <img 
            src={selectedArticle.image_url} 
            alt={selectedArticle.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}
      
      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        {selectedArticle.description && (
          <p className="text-xl font-medium mb-6">{selectedArticle.description}</p>
        )}
        
        {selectedArticle.content ? (
          <div className="space-y-4">
            {selectedArticle.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 italic">No content available for this article.</p>
        )}
      </div>
      
      {/* Original Source Link */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <a 
          href={selectedArticle.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary-600 hover:text-primary-800"
          aria-label="Read article at original source"
        >
          Read the full article at the original source
          <ExternalLink size={18} className="ml-2" />
        </a>
      </div>
      
      {/* Categories and Keywords */}
      <div className="mt-8">
        {selectedArticle.category && selectedArticle.category.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Categories:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedArticle.category.map((category, index) => (
                <span 
                  key={index}
                  className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {selectedArticle.keywords && selectedArticle.keywords.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Keywords:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedArticle.keywords.map((keyword, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default NewsDetailsScreen;