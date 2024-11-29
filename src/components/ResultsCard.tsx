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

  // Redirect to the results page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/results', {
        state: {
          score,
          totalQuestions: questions.length,
        },
        replace: true,
      });
    }, 50000);

    return () => clearTimeout(timer); // Clear timeout when the component unmounts
  }, [navigate, score, questions.length]);

  return (
    <div className="w-full">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Results</h2>
        <p className="text-lg text-gray-600">
          Score: {score} / {questions.length}
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect =
            userAnswer?.selectedAnswer === question.correctAnswer;

          return (
            <div key={question.id} className="border rounded-lg p-4">
              {/* Question */}
              <p className="font-semibold mb-2">{question.question}</p>

              {/* User's Answer */}
              <div className="flex items-center gap-2">
                <span className="text-sm">Your answer:</span>
                <span
                  className={`font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                  {userAnswer?.selectedAnswer || 'No answer'}
                  {isCorrect ? (
                    <CheckCircle className="inline ml-2 w-4 h-4" />
                  ) : (
                    <XCircle className="inline ml-2 w-4 h-4" />
                  )}
                </span>
              </div>

              {/* Correct Answer (if incorrect) */}
              {!isCorrect && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm">Correct answer:</span>
                  <span className="font-medium text-green-600">
                    {question.correctAnswer}
                  </span>
                </div>
              )}

              {/* Statement */}
              <div className="mt-3">
                <p className="text-sm italic text-gray-700">
                  <strong>Statement:</strong> {question.statement}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
