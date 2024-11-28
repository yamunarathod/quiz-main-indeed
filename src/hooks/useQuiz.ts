// import { useState, useEffect } from 'react';
// import { Question, UserAnswer } from '../types/quiz';
// import questionsData from '../data/questions.json';

// export const useQuiz = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
//   const [showResults, setShowResults] = useState(false);
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     const allQuestions = questionsData.questions;
//     const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
//     setQuestions(shuffled.slice(0, 5));
//   }, []);

//   const handleAnswer = (selectedAnswer: string) => {
//     const currentQuestion = questions[currentQuestionIndex];
//     const newAnswer: UserAnswer = {
//       questionId: currentQuestion.id,
//       selectedAnswer,
//       correctAnswer: currentQuestion.correctAnswer,
//     };

//     setUserAnswers([...userAnswers, newAnswer]);

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       const correctAnswers = userAnswers.filter(
//         (answer) => answer.selectedAnswer === answer.correctAnswer
//       ).length;
//       setScore(correctAnswers);
//       setShowResults(true);
//     }
//   };

//   return {
//     currentQuestion: questions[currentQuestionIndex],
//     questions,
//     userAnswers,
//     showResults,
//     score,
//     handleAnswer,
//     currentQuestionIndex,
//   };
// };



// import { useState, useEffect } from 'react';
// import { Question, UserAnswer } from '../types/quiz';
// import questionsData from '../data/questions.json';

// // Utility function to shuffle an array
// const shuffleArray = <T,>(array: T[]): T[] => {
//   return [...array].sort(() => Math.random() - 0.5);
// };

// export const useQuiz = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
//   const [showResults, setShowResults] = useState(false);
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     // Shuffle questions and their options
//     const shuffledQuestions = questionsData.questions.map((question) => ({
//       ...question,
//       options: shuffleArray(question.options),
//     }));

//     // Shuffle the questions and pick the first 5
//     setQuestions(shuffleArray(shuffledQuestions).slice(0, 5));
//   }, []);

//   const handleAnswer = (selectedAnswer: string) => {
//     const currentQuestion = questions[currentQuestionIndex];
//     const newAnswer: UserAnswer = {
//       questionId: currentQuestion.id,
//       selectedAnswer,
//       correctAnswer: currentQuestion.correctAnswer,
//     };

//     setUserAnswers([...userAnswers, newAnswer]);

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       const correctAnswers = [...userAnswers, newAnswer].filter(
//         (answer) => answer.selectedAnswer === answer.correctAnswer
//       ).length;
//       setScore(correctAnswers);
//       setShowResults(true);
//     }
//   };

//   return {
//     currentQuestion: questions[currentQuestionIndex],
//     questions,
//     userAnswers,
//     showResults,
//     score,
//     handleAnswer,
//     currentQuestionIndex,
//   };
// };


import { useState, useEffect } from 'react';
import { Question, UserAnswer } from '../types/quiz';
import questionsData from '../data/questions.json';

// Utility function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const useQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState<number>(15); // Timer for each question
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  useEffect(() => {
    // Shuffle questions and their options
    const shuffledQuestions = questionsData.questions.map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    }));

    // Shuffle the questions and pick the first 5
    setQuestions(shuffleArray(shuffledQuestions).slice(0, 5));
  }, []);

  useEffect(() => {
    // When the question changes, reset the timer and start it again
    if (questions.length > 0) {
      setTimer(15); // Reset the timer
      setIsTimerActive(true); // Start the timer
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (isTimerActive) {
      const interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime === 1) {
            handleAnswer(""); // Automatically answer (empty string) when time runs out
            clearInterval(interval);
            return 15; // Reset timer for the next question
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval); // Clean up interval on unmount or when timer stops
    }
  }, [isTimerActive]);

  const handleAnswer = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
    };

    setUserAnswers([...userAnswers, newAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const correctAnswers = [...userAnswers, newAnswer].filter(
        (answer) => answer.selectedAnswer === answer.correctAnswer
      ).length;
      setScore(correctAnswers);
      setShowResults(true);
    }
  };

  return {
    currentQuestion: questions[currentQuestionIndex],
    questions,
    userAnswers,
    showResults,
    score,
    handleAnswer,
    currentQuestionIndex,
    timer,
  };
};
