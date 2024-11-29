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
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

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
    // Timer countdown logic
    if (isTimerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval); // Cleanup on unmount or question change
    } else if (timer === 0) {
      // Automatically proceed to the next question if the timer runs out
      handleAnswer('');
    }
  }, [isTimerActive, timer]);

  useEffect(() => {
    // Reset the timer when the question index changes
    setTimer(15); // Reset timer to 15 seconds
    setIsTimerActive(true); // Reactivate the timer
  }, [currentQuestionIndex]);

  const handleAnswer = (selectedAnswer: string) => {
    if (questions.length === 0) return;

    const currentQuestion = questions[currentQuestionIndex];
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
    };

    setUserAnswers((prevAnswers) => [...prevAnswers, newAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      // Move to the next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // End of quiz
      const correctAnswers = [...userAnswers, newAnswer].filter(
        (answer) => answer.selectedAnswer === answer.correctAnswer
      ).length;
      setScore(correctAnswers);
      setShowResults(true);
      setIsTimerActive(false); // Stop the timer
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
