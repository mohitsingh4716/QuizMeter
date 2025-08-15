export interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizData {
  response_code: number;
  results: Question[];
}

export interface UserAnswer {
  questionIndex: number;
  selectedAnswer: string;
}

export interface UserInfo {
  name: string;
  email: string;
}
