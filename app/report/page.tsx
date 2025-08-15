'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Question, UserAnswer } from '@/lib/types';
import { ResultSummary } from '@/components/ResultSummary';
import { ResultCard } from '@/components/ResultCard';

export default function ReportPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  useEffect(() => {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions && storedQuestions !== 'undefined') {
      try {
        const parsedQuestions = JSON.parse(storedQuestions);
        if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
          setQuestions(parsedQuestions);
        }
      } catch (error) {
        console.error('Error parsing stored questions:', error);
      }
    } else {
      // fallback: fetch from API if not in localStorage
      const fetchData = async () => {
        try {
          const res = await fetch('https://opentdb.com/api.php?amount=15');
          const data = await res.json();
          if (data.results && Array.isArray(data.results)) {
            setQuestions(data.results);
          }
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };
      fetchData();
    }
    
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo && storedUserInfo !== 'undefined') {
      try {
        setUserInfo(JSON.parse(storedUserInfo));
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
    }
    
    const storedUserAnswers = localStorage.getItem('userAnswers');
    if (storedUserAnswers && storedUserAnswers !== 'undefined') {
      try {
        setUserAnswers(JSON.parse(storedUserAnswers));
      } catch (error) {
        console.error('Error parsing user answers:', error);
      }
    }
  }, []);

  const calculateResults = () => {
    let correctCount = 0;
    const results = Array.isArray(questions) && questions.length > 0 
      ? questions.map((question, index) => {
          const userAnswer = userAnswers.find(ua => ua.questionIndex === index);
          const isCorrect = userAnswer?.selectedAnswer === question.correct_answer;
          if (isCorrect) correctCount++;
          return {
            question: question.question,
            userAnswer: userAnswer?.selectedAnswer || 'Not Answered',
            correctAnswer: question.correct_answer,
            isCorrect
          };
        })
      : [];
    return { results, correctCount, totalQuestions: questions?.length || 0 };
  };

  const { results, correctCount, totalQuestions } = calculateResults();
  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const handleReset = () => {
    localStorage.removeItem('userAnswers');
    localStorage.removeItem('questions');
    localStorage.removeItem('userInfo');
    router.push('/start');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-0 to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <ResultSummary
          userInfo={userInfo}
          correctCount={correctCount}
          totalQuestions={totalQuestions}
          percentage={percentage}
          onReset={handleReset}
        />
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Detailed Results</h2>
          {Array.isArray(results) && results.map((result, index) => (
            <ResultCard key={index} result={result} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
