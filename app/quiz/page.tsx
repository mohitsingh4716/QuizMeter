'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Question, UserAnswer } from '@/lib/types';
import { Timer } from '@/components/Timer';
import { QuestionOverview } from '@/components/QuestionOverview';
import { QuestionCard } from '@/components/QuestionCard';
import { NavigationButtons } from '@/components/NavigationButtons';
import Image from 'next/image';

export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(1800);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const storedQuestions = localStorage.getItem('questions');
      // console.log("from quiz", storedQuestions);
      
      if (storedQuestions && storedQuestions !== 'undefined') {
        try {
          const parsedQuestions = JSON.parse(storedQuestions);
          if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
            setQuestions(parsedQuestions);
            return;
          }
        } catch (error) {
          console.error('Error parsing stored questions:', error);
        }
      }
      
      // Fetch new questions if not in localStorage or invalid
      try {
        const res = await fetch('https://opentdb.com/api.php?amount=15');
        const data = await res.json();
        console.log("from quiz page", data.results);
        
        if (data.results && Array.isArray(data.results) && data.results.length > 0) {
          setQuestions(data.results);
          localStorage.setItem('questions', JSON.stringify(data.results));
        } else {
          console.error('Invalid API response:', data);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    
    loadQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/report');
    }
  }, [timeLeft, router]);

  // Shuffle options only when the current question changes
  useEffect(() => {
    if (Array.isArray(questions) && questions.length > 0 && currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      if (question && question.incorrect_answers && question.correct_answer) {
        const options = [...question.incorrect_answers, question.correct_answer];
        const newShuffledOptions = [...options].sort(() => Math.random() - 0.5);
        setShuffledOptions(newShuffledOptions);
        // Reset selected answer if question changes
        setSelectedAnswer('');
      }
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (userAnswers.length > 0) {
      localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    }
  }, [userAnswers]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const saveCurrentAnswer = () => {
    if (selectedAnswer) {
      const updatedAnswers = userAnswers.filter(ua => ua.questionIndex !== currentQuestionIndex);
      updatedAnswers.push({ questionIndex: currentQuestionIndex, selectedAnswer });
      setUserAnswers(updatedAnswers);
    }
  };

  const navigateToQuestion = (index: number) => {
    saveCurrentAnswer();
    setCurrentQuestionIndex(index);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      navigateToQuestion(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    saveCurrentAnswer();
    if (Array.isArray(questions) && currentQuestionIndex < questions.length - 1) {
      navigateToQuestion(currentQuestionIndex + 1);
    }
  };

  const handleSubmitQuiz = () => {
    saveCurrentAnswer();
    router.push('/report');
  };

  const currentQuestion = Array.isArray(questions) && questions.length > 0
    ? questions[currentQuestionIndex]
    : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-0 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* <h1 className="text-xl font-semibold text-gray-800">Quiz Application</h1> */}
             <Image
                        src="/quiz-meter.svg"
                        alt="User Icon"
                        width={200}
                        height={32}
                        // className="w-8 h-8"
                      />
            <span className="text-sm md:text-lg text-gray-600">
              Question {currentQuestionIndex + 1} of {Array.isArray(questions) ? questions.length : 0}
            </span>
          </div>
          <Timer timeLeft={timeLeft} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">

        <div className="flex flex-col md:flex-row gap-6">

          <div className="md:w-64 w-full ">
            <QuestionOverview
              questions={questions || []}
              userAnswers={userAnswers}
              currentQuestionIndex={currentQuestionIndex}
              onNavigate={navigateToQuestion}
            />
          </div>

          {/* QuestionCard - Takes remaining space */}
          <div className="flex-1">
            {currentQuestion && (
              <>
                <QuestionCard
                  question={currentQuestion}
                  options={shuffledOptions}
                  selectedAnswer={selectedAnswer}
                  onAnswerSelect={handleAnswerSelect}
                />
                <NavigationButtons
                  currentQuestionIndex={currentQuestionIndex}
                  totalQuestions={Array.isArray(questions) ? questions.length : 0}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onSubmit={handleSubmitQuiz}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}