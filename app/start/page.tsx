'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserInfoForm } from '@/components/UserInfoForm';


export default function StartPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStartQuiz = () => {
    if (!userInfo.name.trim() || !userInfo.email.trim()) {
      setError('Please enter both name and email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setLoading(true);
    
    // Save user info to localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    // Clear previous quiz data for a fresh start
    localStorage.removeItem('questions');
    localStorage.removeItem('userAnswers');
    
    router.push('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <UserInfoForm
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        error={error}
        loading={loading}
        onStartQuiz={handleStartQuiz}
      />
    </div>
  );
}
