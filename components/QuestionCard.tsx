import { decodeHTML } from '@/lib/utils';

interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuestionCardProps {
  question: Question;
  options: string[];
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
}

export const QuestionCard = ({ question, options, selectedAnswer, onAnswerSelect }: QuestionCardProps) => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded">
            {question.category}
          </span>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">
            {question.difficulty}
          </span>
        </div>

        <h2 className="text-xl font-medium text-gray-800 leading-relaxed">
          {decodeHTML(question.question)}
        </h2>
      </div>

      <div className="space-y-3 mb-8">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
              selectedAnswer === option
                ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                selectedAnswer === option
                  ? 'border-indigo-500 bg-indigo-500'
                  : 'border-gray-300'
              }`}>
                {selectedAnswer === option && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                )}
              </div>
              <span className="text-base">{decodeHTML(option)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
