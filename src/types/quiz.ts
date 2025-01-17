export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  statement?: string;
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: string;
  correctAnswer: string;
}