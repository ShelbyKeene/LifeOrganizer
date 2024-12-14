// Collection of time-based greetings
export const morningGreetings = [
  "Good morning"
];

export const afternoonGreetings = [
  "Good afternoon",
  "Having a great day",
  "Afternoon delight",
  "Keep up the momentum",
  "Wonderful afternoon"
];

export const eveningGreetings = [
  "Good evening",
  "Winding down",
  "Sweet dreams ahead",
  "Time to reflect",
  "Evening peace"
];

export const getRandomGreeting = (greetings: string[]): string => {
  const index = Math.floor(Math.random() * greetings.length);
  return greetings[index];
};