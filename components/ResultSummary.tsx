import { UserInfo } from '@/lib/types';
import { User, Mail, RotateCcw } from 'lucide-react';
import Image from 'next/image';

interface ResultSummaryProps {
  userInfo: UserInfo;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  onReset: () => void;
}

export const ResultSummary = ({ userInfo, correctCount, totalQuestions, percentage, onReset }: ResultSummaryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="text-center">
        <div className="flex items-center justify-center mx-auto mb-4">
          <Image
            src="/quiz-meter.svg"
            alt="User Icon"
            width={200}
            height={32}
            // className="w-8 h-8"
           />

        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">Quiz Results</h1>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 text-gray-600 mb-4">
            <div className="flex items-center space-x-2 px-8">
                <User className="w-6 h-6 text-indigo-600" />
                <span className="font-medium text-xl">{userInfo.name}</span>
            </div>

            {/* <span className="hidden md:inline text-gray-400">•</span> */}

            <div className="flex items-center space-x-2">
                <Mail className="w-6 h-6 text-indigo-600" />
                <span className="font-medium text-xl">{userInfo.email}</span>
            </div>
            </div>


        <div className="flex justify-center space-x-8 mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{correctCount}</div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {(Number(totalQuestions) - Number(correctCount)) || 0}
            </div>
            <div className="text-sm text-gray-600">Incorrect</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">{percentage}%</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center space-x-2 mx-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Take Quiz Again</span>
        </button>
      </div>
    </div>
  );
};
