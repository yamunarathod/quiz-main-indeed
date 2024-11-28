import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, HeartCrack, Gift, RotateCcw } from 'lucide-react';
import { Button } from './Button';

interface FinalResultsProps {
  score: number;
  totalQuestions: number;
}

export const FinalResults: React.FC<FinalResultsProps> = ({ score, totalQuestions }) => {
  const navigate = useNavigate();
  const isHighScore = score >= 4;

  const handleRestart = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="text-center">
      {isHighScore ? (
        <div className="space-y-6">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-800">
            Congratulations! 🎉
          </h2>
          <p className="text-xl text-gray-600">
            Amazing performance! You scored {score} out of {totalQuestions}
          </p>
          <div className="bg-green-50 p-6 rounded-lg">
            <Gift className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <p className="text-green-800 font-medium">
              You've earned a goodie! Click below to claim your reward.
            </p>
            <Button
              className="mt-4"
              onClick={() => window.open('https://example.com/claim-reward', '_blank')}
            >
              Claim Your Goodie
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <HeartCrack className="w-16 h-16 text-blue-500 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-800">
            Better Luck Next Time!
          </h2>
          <p className="text-xl text-gray-600">
            You scored {score} out of {totalQuestions}
          </p>
          <p className="text-gray-600">
            Keep practicing and try again to win a special goodie!
          </p>
        </div>
      )}
      <Button
        onClick={handleRestart}
        className="mt-8 flex items-center gap-2 mx-auto"
      >
        <RotateCcw size={20} />
        Restart Quiz
      </Button>
    </div>
  );
}