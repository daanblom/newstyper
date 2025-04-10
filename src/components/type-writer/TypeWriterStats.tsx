interface TypeWriterStatsProps {
  wpm: number;
  accuracy: number;
  difficulty: number;
  elapsedTime: number; // Time in milliseconds
  comboCount: number;
  onReset: () => void;
  isComplete: boolean;
}

export default function TypeWriterStats({
  wpm,
  accuracy,
  difficulty,
  elapsedTime,
  comboCount,
  onReset,
  isComplete,
}: TypeWriterStatsProps) {
  // Format time in milliseconds to a readable format (mm:ss.ms)
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10); // Show only 2 decimal places
    
    return `${minutes > 0 ? `${minutes}:` : ''}${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
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
          <div>
            <span className="font-semibold">Time: </span>
            {formatTime(elapsedTime)}
          </div>
          <div>
            <span className="font-semibold">Difficulty: </span>
            {Array(difficulty).fill('★').join('')}
            {Array(5 - difficulty).fill('☆').join('')}
          </div>
          <div>
            <span className="font-semibold">Combo: </span>
            {comboCount}
          </div>
        </div>
        
        <button
          onClick={onReset}
          className="custom-button"
        >
          {isComplete ? "Try Again" : "Reset"}
        </button>
      </div>
      
      {isComplete && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          <p className="text-center font-bold">Congratulations! You&apos;ve completed this article.</p>
          <p className="text-center">Your final score: {wpm} WPM with {accuracy}% accuracy in {formatTime(elapsedTime)}</p>
        </div>
      )}
    </>
  );
} 