import { decodeHTML } from '@/lib/utils';

interface ResultCardProps {
  result: {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  };
  index: number;
}

export const ResultCard = ({ result, index }: ResultCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex-1 mr-4">
          Q{index + 1}. {decodeHTML(result.question)}
        </h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          result.isCorrect
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {result.isCorrect ? 'Correct' : 'Incorrect'}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <span className="block text-sm font-medium text-gray-600 mb-1">Your Answer:</span>
          <div className={`p-3 rounded-lg ${
            result.userAnswer === 'Not Answered'
              ? 'bg-gray-100 text-gray-600'
              : result.isCorrect
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}>
            {result.userAnswer === 'Not Answered' ? 'Not Answered' : decodeHTML(result.userAnswer)}
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium text-gray-600 mb-1">Correct Answer:</span>
          <div className="p-3 bg-green-50 text-green-800 rounded-lg">
            {decodeHTML(result.correctAnswer)}
          </div>
        </div>
      </div>
    </div>
  );
};
