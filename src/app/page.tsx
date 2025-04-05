'use client';

import { useState, useEffect } from 'react';
import TypeWriter from '@/components/TypeWriter';
import { Article } from '@/types/article';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const currentArticle = articles[currentArticleIndex];

  const handleNextArticle = () => {
    setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const handlePrevArticle = () => {
    setCurrentArticleIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background py-8 flex items-center justify-center">
        <div className="text-xl">Loading articles...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background py-8 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </main>
    );
  }

  if (articles.length === 0) {
    return (
      <main className="min-h-screen bg-background py-8 flex items-center justify-center">
        <div className="text-xl">No articles available.</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-8 flex flex-col justify-between">
      <div className="w-full max-w-3xl px-4 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">News Typing Practice</h1>
        <TypeWriter article={currentArticle} />
      </div>
      
      <div className="w-full max-w-3xl px-4 mx-auto mt-8">
        <div className="flex justify-center items-center gap-4">
          <button 
            onClick={handlePrevArticle}
            className="custom-button"
          >
            Previous
          </button>
          <span className="text-gray-600 article-counter">
            Article {currentArticleIndex + 1} of {articles.length}
          </span>
          <button 
            onClick={handleNextArticle}
            className="custom-button"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
