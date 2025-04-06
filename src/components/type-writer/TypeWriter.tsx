'use client';

import { useState, useEffect, useRef } from 'react';
import AnimatedCharacter from '../animated-character/AnimatedCharacter';
import TypeWriterDisplay from './TypeWriterDisplay';
import TypeWriterStats from './TypeWriterStats';

interface Article {
  title: string;
  content: string;
  source: string;
  difficulty: number;
}

interface TypeWriterProps {
  article: Article;
}

export default function TypeWriter({ article }: TypeWriterProps) {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [completedChars, setCompletedChars] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [comboCount, setComboCount] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentCharRef = useRef<HTMLSpanElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Split article content into paragraphs
  const paragraphs = article.content.split(/\n+/).filter(p => p.trim().length > 0);
  const chars = article.content.split('');

  useEffect(() => {
    resetTyping();
  }, [article]);

  useEffect(() => {
    if (currentCharRef.current && articleRef.current) {
      const charRect = currentCharRef.current.getBoundingClientRect();
      const articleRect = articleRef.current.getBoundingClientRect();
      
      setCursorPosition({
        x: charRect.left - articleRect.left,
        y: charRect.top - articleRect.top
      });
    }
  }, [currentCharIndex]);

  const resetTyping = () => {
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setCurrentCharIndex(0);
    setCompletedChars(new Array(chars.length).fill(false));
    setIsComplete(false);
    setComboCount(0);
    setHasError(false);
    setIsTyping(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const calculateWpm = (timeElapsed: number, charsTyped: number) => {
    const minutes = timeElapsed / 60000;
    const wordsTyped = charsTyped / 5;
    return Math.round(wordsTyped / minutes);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);
    setIsTyping(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 500);

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (input.length > 0) {
      const lastChar = input[input.length - 1];
      const isCorrect = lastChar === chars[currentCharIndex];
      
      const newCompletedChars = [...completedChars];
      newCompletedChars[currentCharIndex] = isCorrect;
      setCompletedChars(newCompletedChars);

      if (isCorrect) {
        setComboCount(prev => prev + 1);
        setHasError(false);
        if (errorTimeoutRef.current) {
          clearTimeout(errorTimeoutRef.current);
          errorTimeoutRef.current = null;
        }
      } else {
        setComboCount(0);
        setHasError(true);
        
        if (errorTimeoutRef.current) {
          clearTimeout(errorTimeoutRef.current);
        }
        
        errorTimeoutRef.current = setTimeout(() => {
          setHasError(false);
          setIsTyping(false);
        }, 500);
      }

      setCurrentCharIndex(prev => {
        const nextIndex = prev + 1;
        if (nextIndex >= chars.length) {
          setIsComplete(true);
        }
        return nextIndex;
      });
      
      setUserInput('');
    }

    const charsTyped = completedChars.filter(Boolean).length;
    const timeElapsed = Date.now() - (startTime || Date.now());
    setWpm(calculateWpm(timeElapsed, charsTyped));
    
    const typedChars = completedChars.slice(0, currentCharIndex);
    const correctChars = typedChars.filter(Boolean).length;
    const totalTyped = typedChars.length;
    setAccuracy(totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && currentCharIndex > 0) {
      e.preventDefault();
      setCurrentCharIndex(prev => prev - 1);
      const newCompletedChars = [...completedChars];
      newCompletedChars[currentCharIndex - 1] = false;
      setCompletedChars(newCompletedChars);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleArticleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      {/* Title and source */}
      <div className="pb-6">
        <h1 className="text-2xl text-red-500 mb-2 article-source">{article.title}</h1>
        <p className="text-gray-600 article-source">Source: {article.source}</p>
      </div>

      {/* Article text */}
      <TypeWriterDisplay
        paragraphs={paragraphs}
        currentCharIndex={currentCharIndex}
        completedChars={completedChars}
        onArticleClick={handleArticleClick}
        currentCharRef={currentCharRef}
        articleRef={articleRef}
        cursorPosition={cursorPosition}
        isComplete={isComplete}
      />

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="text"
        className="opacity-0 absolute pointer-events-none"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={isComplete}
      />

      {/* Animated character */}
      <AnimatedCharacter
        isTyping={isTyping}
        hasError={hasError}
        comboCount={comboCount}
        animationFile="/animations/typing-character.riv"
      />

      {/* Stats */}
      <TypeWriterStats
        wpm={wpm}
        accuracy={accuracy}
        difficulty={article.difficulty}
        comboCount={comboCount}
        onReset={resetTyping}
        isComplete={isComplete}
      />
    </div>
  );
} 