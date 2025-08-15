interface UserAnswer {
  questionIndex: number;
  selectedAnswer: string;
}

interface QuestionOverviewProps {
  questions: any[];
  userAnswers: UserAnswer[];
  currentQuestionIndex: number;
  onNavigate: (index: number) => void;
}

export const QuestionOverview = ({ questions, userAnswers, currentQuestionIndex, onNavigate }: QuestionOverviewProps) => {
  return (
    <div className="md:w-64 w-full bg-white rounded-lg shadow-sm p-4 h-fit">
      <h3 className="font-medium text-gray-800 mb-4">Questions Overview</h3>
      <div className="grid grid-cols-5 md:grid-cols-4 gap-2">
        {Array.isArray(questions) && questions.map((_, index) => {
          const isAnswered = userAnswers.some(ua => ua.questionIndex === index);
          const isCurrent = index === currentQuestionIndex;

          return (
            <button
              key={index}
              onClick={() => onNavigate(index)}
              className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                isCurrent
                  ? 'bg-indigo-600 text-white'
                  : isAnswered
                  ? 'bg-green-300 text-green-800 hover:bg-green-500'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

     <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-600">
        <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-300 rounded"></div>
            <span>Answered</span>
        </div>
        <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-indigo-600 rounded"></div>
            <span>Current</span>
        </div>
        <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-100 rounded"></div>
            <span>Not visited</span>
        </div>
        </div>
    </div>
  );
};
