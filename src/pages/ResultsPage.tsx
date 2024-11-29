import React from 'react';
import { useLocation } from 'react-router-dom';
import { FinalResults } from '../components/FinalResults';

interface LocationState {
  score: number;
  totalQuestions: number;
}

export const ResultsPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <FinalResults
          score={state.score}
          totalQuestions={state.totalQuestions}
        />
        
      </div>
    </div>
  );
};