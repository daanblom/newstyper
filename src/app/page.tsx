'use client';

import { useState } from 'react';
import TypeWriter from '@/components/TypeWriter';
import { articles } from '@/data/articles';

export default function Home() {
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const currentArticle = articles[currentArticleIndex];

  const handleNextArticle = () => {
    setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const handlePrevArticle = () => {
    setCurrentArticleIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length);
  };

  return (
    <main className="min-h-screen bg-background py-8 flex justify-center">
      <div className="w-full max-w-3xl px-4">
        <h1 className="text-4xl font-bold text-center mb-8">News Typing Practice</h1>
        
        <div className="flex justify-center items-center mb-6 gap-4">
          <button 
            onClick={handlePrevArticle}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Article {currentArticleIndex + 1} of {articles.length}
          </span>
          <button 
            onClick={handleNextArticle}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Next
          </button>
        </div>
        
        <TypeWriter article={currentArticle} />
      </div>
    </main>
  );
}
