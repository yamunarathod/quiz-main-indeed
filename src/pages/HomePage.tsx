import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Quiz App
        </h1>
        <p className="text-gray-600 mb-8">
          Test your knowledge and challenge yourself with our exciting quiz questions!
        </p>
        <Button
          onClick={() => navigate('/register')}
          className="flex items-center justify-center gap-2 mx-auto"
        >
          Start Quiz
          <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};