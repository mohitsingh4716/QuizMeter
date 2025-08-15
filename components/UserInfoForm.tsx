
import { UserInfo } from '@/lib/types';
import Image from 'next/image';

interface UserInfoFormProps {
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
  error: string;
  loading: boolean;
  onStartQuiz: () => void;
}

export const UserInfoForm = ({ userInfo, setUserInfo, error, loading, onStartQuiz }: UserInfoFormProps) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <div className=" flex items-center justify-center mx-auto mb-4">
          <Image
            src="/quiz-meter.svg"
            alt="User Icon"
            width={230}
            height={40}
            // className="w-8 h-8"
          />
         </div>
        {/* <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-indigo-600" />
          <Image
            src="/quizMeter.svg"
            alt="User Icon"
            width={320}
            height={320}
            className="w-8 h-8"
          />
        </div> */}
        <h1 className="text-3xl font-bold text-gray-700 mb-2">Welcome to QuizMeter</h1>
        <p className="text-gray-600">Enter your details to start the  quiz</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={onStartQuiz}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Loading Quiz...' : 'Start Quiz'}
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>• 15 questions</p>
        <p>• 30 minutes time limit</p>
        {/* <p>• Auto-submit when time ends</p> */}
      </div>
    </div>
  );
};
