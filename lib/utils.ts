export const decodeHTML = (html: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};
