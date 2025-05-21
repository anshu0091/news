import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNews } from '../store/slices/newsSlice';
import NewsFilter from '../components/news/NewsFilter';
import NewsGrid from '../components/news/NewsGrid';
import LoadMoreButton from '../components/news/LoadMoreButton';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch initial news on component mount
    dispatch(fetchNews({}));
  }, [dispatch]);

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Today's News</h1>
        <p className="text-xl text-gray-600">
          Stay informed with the latest news from around the world.
        </p>
      </section>

      <NewsFilter />
      <NewsGrid />
      <LoadMoreButton />
    </div>
  );
};

export default HomeScreen;