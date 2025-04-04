'use client';

import { useState, useEffect, useRef } from 'react';

interface Article {
  title: string;
  content: string;
  source: string;
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
  const articleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentCharRef = useRef<HTMLSpanElement>(null);

  // Split article content into paragraphs and then characters
  const paragraphs = article.content.split(/\n+/).filter(p => p.trim().length > 0);
  const text = paragraphs.join('\n\n');
  const chars = text.split('');

  // Initialize completed characters array
  useEffect(() => {
    resetTyping();
  }, [article]);

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

  const resetTyping = () => {
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setCurrentCharIndex(0);
    setCompletedChars(new Array(chars.length).fill(false));
    setIsComplete(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const calculateWpm = (timeElapsed: number, charsTyped: number) => {
    const minutes = timeElapsed / 60000;
    // Assuming 5 characters per word on average
    const wordsTyped = charsTyped / 5;
    return Math.round(wordsTyped / minutes);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);

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

      // Move to the next character
      setCurrentCharIndex(prev => {
        const nextIndex = prev + 1;
        if (nextIndex >= chars.length) {
          setIsComplete(true);
        }
        return nextIndex;
      });
      
      // Reset input after processing
      setUserInput('');
    }

    // Calculate WPM and accuracy
    const charsTyped = completedChars.filter(Boolean).length;
    const timeElapsed = Date.now() - (startTime || Date.now());
    setWpm(calculateWpm(timeElapsed, charsTyped));
    
    // Calculate accuracy based on completed characters
    const correctChars = completedChars.filter(Boolean).length;
    const totalCompleted = completedChars.filter(char => char !== null).length;
    setAccuracy(totalCompleted > 0 ? Math.round((correctChars / totalCompleted) * 100) : 100);
  };

  // Focus the input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle clicks on the article to focus the input
  const handleArticleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Render the article text with highlighting
  const renderArticleText = () => {
    return (
      <div 
        ref={articleRef}
        className="typing-container"
        onClick={handleArticleClick}
      >
        {paragraphs.map((paragraph, pIndex) => (
          <p key={pIndex} className="mb-4 whitespace-pre-wrap">
            {paragraph.split('').map((char, cIndex) => {
              const globalIndex = pIndex === 0 
                ? cIndex 
                : paragraphs.slice(0, pIndex).join('').length + cIndex + (pIndex * 2); // +2 for newlines
              
              let className = "typing-char ";
              
              if (globalIndex < currentCharIndex) {
                // Completed characters
                className += completedChars[globalIndex] ? "correct" : "incorrect";
              } else if (globalIndex === currentCharIndex) {
                // Current character
                className += "current";
              } else {
                // Upcoming characters
                className += "upcoming";
              }
              
              return (
                <span
                  key={globalIndex} 
                  className={className}
                  ref={globalIndex === currentCharIndex ? currentCharRef : null}
                >
                  {char}
                </span>
              );
            })}
          </p>
        ))}
        
        {/* Visual cursor */}
        {!isComplete && (
          <div
            className="typing-cursor"
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`
            }}
          />
        )}
        
        {/* Hidden input for capturing keyboard events */}
        <input
          ref={inputRef}
          type="text"
          className="opacity-0 absolute pointer-events-none"
          value={userInput}
          onChange={handleInputChange}
          disabled={isComplete}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
        <p className="text-gray-600">Source: {article.source}</p>
      </div>

      {renderArticleText()}

      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-6 text-lg">
          <div>
            <span className="font-semibold">WPM: </span>
            {wpm}
          </div>
          <div>
            <span className="font-semibold">Accuracy: </span>
            {accuracy}%
          </div>
        </div>
        
        <button
          onClick={resetTyping}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
        >
          {isComplete ? "Try Again" : "Reset"}
        </button>
      </div>
      
      {isComplete && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          <p className="text-center font-bold">Congratulations! You've completed this article.</p>
          <p className="text-center">Your final score: {wpm} WPM with {accuracy}% accuracy</p>
        </div>
      )}
    </div>
  );
} 