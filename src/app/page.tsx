'use client';

import { useState, useEffect } from 'react';
import TypeWriter from '@/components/TypeWriter';
import { Article } from '@/types/article';

export default function Home() {
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticle = async (id?: string) => {
    try {
      setIsLoading(true);
      const url = id ? `/api/articles?id=${id}` : '/api/articles';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch article');
      }
      const data = await response.json();
      setCurrentArticle(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  const handleNextArticle = () => {
    fetchArticle();
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background py-8 flex items-center justify-center">
        <div className="text-xl">Loading article...</div>
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

  if (!currentArticle) {
    return (
      <main className="min-h-screen bg-background py-8 flex items-center justify-center">
        <div className="text-xl">No articles available.</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-8 flex flex-col">
      <div className="w-full max-w-3xl px-4 mx-auto flex-grow">
        <TypeWriter article={currentArticle} />
      </div>
      
      {/* Fixed navigation at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background py-4">
        <div className="w-full max-w-3xl px-4 mx-auto">
          <div className="flex justify-center items-center gap-4">
            <button 
              onClick={handleNextArticle}
              className="custom-button"
            >
              Next Article
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
