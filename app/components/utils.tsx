export const trimText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};


export function shuffleArray<T>(array: T[]): T[] {
  // Create a copy of the array to avoid mutating the original array
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements at indices i and j
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}


export function capitalize(text: string): string {
  if (!text) return text; // Handle empty string or null/undefined
  return text.charAt(0).toUpperCase() + text.slice(1);
}