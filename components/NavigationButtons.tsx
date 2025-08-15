import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const NavigationButtons = ({ currentQuestionIndex, totalQuestions, onPrevious, onNext, onSubmit }: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between pt-8">
      <button
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      <div className="flex space-x-3">
        {currentQuestionIndex === totalQuestions - 1 ? (
          <button
            onClick={onSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
