interface TypeWriterDisplayProps {
  paragraphs: string[];
  currentCharIndex: number;
  completedChars: boolean[];
  onArticleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  currentCharRef: React.RefObject<HTMLSpanElement | null>;
  articleRef: React.RefObject<HTMLDivElement | null>;
  cursorPosition: { x: number; y: number };
  isComplete: boolean;
}

export default function TypeWriterDisplay({
  paragraphs,
  currentCharIndex,
  completedChars,
  onArticleClick,
  currentCharRef,
  articleRef,
  cursorPosition,
  isComplete,
}: TypeWriterDisplayProps) {
  return (
    <div 
      ref={articleRef}
      className="typing-container"
      onClick={onArticleClick}
    >
      {paragraphs.map((paragraph, pIndex) => (
        <p key={pIndex} className="mb-4 whitespace-pre-wrap">
          {paragraph.split(/(\s+)/).map((word, wIndex) => (
            <span key={wIndex} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
              {word.split('').map((char, cIndex) => {
                const charsBeforeInParagraph = paragraph
                  .split(/(\s+)/)
                  .slice(0, wIndex)
                  .join('')
                  .length;
                
                const globalIndex = pIndex === 0
                  ? charsBeforeInParagraph + cIndex
                  : paragraphs.slice(0, pIndex).join('').length + charsBeforeInParagraph + cIndex + (pIndex * 2);
                
                let className = "typing-char ";
                
                if (globalIndex < currentCharIndex) {
                  className += completedChars[globalIndex] ? "correct" : "incorrect";
                } else if (globalIndex === currentCharIndex) {
                  className += "current";
                } else {
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
            </span>
          ))}
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
    </div>
  );
} 