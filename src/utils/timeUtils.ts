export const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' => {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  return 'evening';
};

export const getGreeting = (name: string): string => {
  const timeOfDay = getTimeOfDay();
  
  switch (timeOfDay) {
    case 'morning':
      return `Good morning, ${name}!`;
    case 'afternoon':
      return `Hope you're having an amazing day, ${name}!`;
    case 'evening':
      return `Good evening, ${name}!`;
  }
};