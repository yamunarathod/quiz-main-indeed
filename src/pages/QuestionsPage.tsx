import React, { useEffect } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { QuestionCard } from '../components/QuestionCard';
import { ResultsCard } from '../components/ResultsCard';

export const QuestionsPage: React.FC = () => {
  const {
    currentQuestion,
    questions,
    userAnswers,
    showResults,
    score,
    handleAnswer,
    currentQuestionIndex,
    timer,
  } = useQuiz();

  const saveAnswers = async (answers: typeof userAnswers) => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not found');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/save-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, answers }),
      });

      if (!response.ok) {
        console.error('Failed to save answers:', await response.json());
      } else {
        console.log('Answers saved successfully');
      }
    } catch (error) {
      console.error('Error saving answers:', error);
    }
  };

  useEffect(() => {
    if (showResults) {
      saveAnswers(userAnswers);
    }
  }, [showResults, userAnswers]);

  if (!currentQuestion && !showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <p className="text-center text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        {!showResults ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  Score: {userAnswers.filter(
                    (answer) => answer.selectedAnswer === answer.correctAnswer
                  ).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  Time Left: {timer}s
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            <QuestionCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              selectedAnswer={userAnswers[currentQuestionIndex]?.selectedAnswer}
            />
          </>
        ) : (
          <ResultsCard
            questions={questions}
            userAnswers={userAnswers}
            score={score}
          />
        )}
      </div>
    </div>
  );
};
