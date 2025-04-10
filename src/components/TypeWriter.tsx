'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import AnimatedCharacter from './animated-character/AnimatedCharacter';
import TypeWriterStats from './type-writer/TypeWriterStats';
import TypeWriterDisplay from './type-writer/TypeWriterDisplay';

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
  const [elapsedTime, setElapsedTime] = useState(0); // Time in milliseconds
  const [typingSpeed, setTypingSpeed] = useState(0); // Current typing speed in WPM
  const [isSleeping, setIsSleeping] = useState(false); // Track if character is sleeping
  const articleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentCharRef = useRef<HTMLSpanElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Split article content into paragraphs, then words, then characters
  const paragraphs = article.content.split(/\n+/).filter(p => p.trim().length > 0);
  const text = paragraphs.join('\n\n');
  
  // First split into words (preserving spaces), then into characters
  const chars = text.split('');

  const resetTyping = useCallback(() => {
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
    setElapsedTime(0);
    setTypingSpeed(0);
    setIsSleeping(false);
    
    // Clear any existing timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chars.length]);

  // Initialize completed characters array
  useEffect(() => {
    resetTyping();
  }, [article, resetTyping]);

  // Update cursor position when current character changes
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

  // Timer effect to update elapsed time
  useEffect(() => {
    if (startTime && !isComplete) {
      // Update more frequently (every 10ms) for more precise timing
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const timeElapsed = now - startTime;
        setElapsedTime(timeElapsed); // Keep in milliseconds
        
        // Update WPM in real-time
        const charsTyped = completedChars.filter(Boolean).length;
        setWpm(calculateWpm(timeElapsed, charsTyped));
        setTypingSpeed(calculateWpm(timeElapsed, charsTyped));
      }, 10); // Update every 10ms for smoother display
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTime, isComplete, completedChars]);

  // Idle timer effect to transition to sleeping state after 10 seconds of inactivity
  useEffect(() => {
    // Clear any existing idle timer
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }

    // Only start the idle timer if not typing, not in error state, and not complete
    if (!isTyping && !hasError && !isComplete) {
      idleTimerRef.current = setTimeout(() => {
        setIsSleeping(true);
      }, 10000); // 10 seconds of inactivity
    } else {
      // If typing or in error state, make sure we're not sleeping
      setIsSleeping(false);
    }

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [isTyping, hasError, isComplete]);

  const calculateWpm = (timeElapsed: number, charsTyped: number) => {
    const minutes = timeElapsed / 60000;
    // Assuming 5 characters per word on average
    const wordsTyped = charsTyped / 5;
    return Math.round(wordsTyped / minutes);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);
    setIsTyping(true);
    setIsSleeping(false); // Wake up from sleeping state when typing

    // Clear the previous typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set a new timeout to mark typing as finished
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 500);

    if (!startTime) {
      setStartTime(Date.now());
    }

    // Process each character typed
    if (input.length > 0) {
      const lastChar = input[input.length - 1];
      const isCorrect = lastChar === chars[currentCharIndex];
      
      const newCompletedChars = [...completedChars];
      newCompletedChars[currentCharIndex] = isCorrect;
      setCompletedChars(newCompletedChars);

      // Update combo count and error state
      if (isCorrect) {
        setComboCount(prev => prev + 1);
        setHasError(false);
        // Clear any existing error timeout since we're back to correct typing
        if (errorTimeoutRef.current) {
          clearTimeout(errorTimeoutRef.current);
          errorTimeoutRef.current = null;
        }
      } else {
        setComboCount(0);
        setHasError(true);
        
        // Clear any existing error timeout
        if (errorTimeoutRef.current) {
          clearTimeout(errorTimeoutRef.current);
        }
        
        // Set a new timeout to transition back to idle state if no typing occurs
        errorTimeoutRef.current = setTimeout(() => {
          setHasError(false);
          setIsTyping(false);
        }, 10); // Transition back to idle after 0.1 second of no typing
      }

      // Move to the next character
      setCurrentCharIndex(prev => {
        const nextIndex = prev + 1;
        if (nextIndex >= chars.length) {
          setIsComplete(true);
          // Clear the timer when typing is complete
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }
        return nextIndex;
      });
      
      // Reset input after processing
      setUserInput('');
    }

    // Calculate accuracy based only on characters typed so far
    const typedChars = completedChars.slice(0, currentCharIndex);
    const correctChars = typedChars.filter(Boolean).length;
    const totalTyped = typedChars.length;
    setAccuracy(totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100);
  };

  // Handle keyboard events for backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && currentCharIndex > 0) {
      e.preventDefault();
      // Move back one character
      setCurrentCharIndex(prev => prev - 1);
      // Reset the completed status of the previous character
      const newCompletedChars = [...completedChars];
      newCompletedChars[currentCharIndex - 1] = false;
      setCompletedChars(newCompletedChars);
    }
  };

  // Focus the input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle clicks on the article to focus the input
  const handleArticleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative">
      {/* Title and source */}
      <div className="pb-6">
        <h1 className="text-6xl mb-2 article-source">{article.title}</h1>
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
      
      {/* Hidden input for capturing keyboard events */}
      <input
        ref={inputRef}
        type="text"
        className="sr-only"
        aria-label="Type the text"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={isComplete}
      />

      {/* Animated character */}
      <AnimatedCharacter
        isTyping={isTyping}
        hasError={hasError}
        typingSpeed={typingSpeed}
        isSleeping={isSleeping}
        animationFile="/animations/typing-character.riv"
      />

      {/* Stats and controls */}
      <TypeWriterStats
        wpm={wpm}
        accuracy={accuracy}
        difficulty={article.difficulty}
        elapsedTime={elapsedTime}
        comboCount={comboCount}
        onReset={resetTyping}
        isComplete={isComplete}
      />
    </div>
  );
} 