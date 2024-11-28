import React from 'react';
import { Question } from '../types/quiz';
import { Button } from './Button';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  selectedAnswer?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  selectedAnswer,
}) => {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h3>
      <div className="space-y-3">
        {question.options.map((option) => (
          <Button
            key={option}
            onClick={() => onAnswer(option)}
            variant={selectedAnswer === option ? 'primary' : 'secondary'}
            className="w-full text-left justify-start"
            disabled={selectedAnswer !== undefined}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};