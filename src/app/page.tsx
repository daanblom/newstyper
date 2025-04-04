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
