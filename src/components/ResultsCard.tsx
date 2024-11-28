import React, { useEffect } from 'react';
import { Question, UserAnswer } from '../types/quiz';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

interface ResultsCardProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  score: number;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({
  questions,
  userAnswers,
  score,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/results', {
        state: {
          score,
          totalQuestions: questions.length
        },
        replace: true
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, score, questions.length]);

  return (
    <div className="w-full">

      <div className="space-y-6">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer?.selectedAnswer === question.correctAnswer;

          return (
            <div key={question.id} className="border rounded-lg p-4">
              <p className="font-semibold mb-2">{question.question}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm">Your answer:</span>
                <span
                  className={`font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                  {userAnswer?.selectedAnswer}
                  {isCorrect ? (
                    <CheckCircle className="inline ml-2 w-4 h-4" />
                  ) : (
                    <XCircle className="inline ml-2 w-4 h-4" />
                  )}
                </span>
              </div>
              {!isCorrect && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm">Correct answer:</span>
                  <span className="font-medium text-green-600">
                    {question.correctAnswer}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};