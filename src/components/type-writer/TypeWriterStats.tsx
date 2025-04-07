interface TypeWriterStatsProps {
  wpm: number;
  accuracy: number;
  difficulty: number;
  comboCount: number;
  onReset: () => void;
  isComplete: boolean;
}

export default function TypeWriterStats({
  wpm,
  accuracy,
  difficulty,
  comboCount,
  onReset,
  isComplete,
}: TypeWriterStatsProps) {
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
          <p className="text-center">Your final score: {wpm} WPM with {accuracy}% accuracy</p>
        </div>
      )}
    </>
  );
} 