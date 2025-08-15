import { Clock } from 'lucide-react';
import { formatTime } from '@/lib/utils';

interface TimerProps {
  timeLeft: number;
}

export const Timer = ({ timeLeft }: TimerProps) => {
  return (
    <div className="flex items-center space-x-2 bg-red-50 px-3 py-2 rounded-lg">
      <Clock className="w-6 h-6 text-red-600" />
      <span className="text-red-600 font-medium text-xl">{formatTime(timeLeft)}</span>
    </div>
  );
};
