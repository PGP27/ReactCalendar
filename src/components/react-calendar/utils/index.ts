export const getNumberOfDay = (month: number, year: number) => {
  const days31 = [0, 2, 4, 6, 7, 9, 11];
  const days30 = [3, 5, 8, 10, 12];

  if(days31.includes(month)) return 31;
  if(days30.includes(month)) return 30;

  if(year % 4 === 0) {
    if(year % 100 === 0 && year % 400 !== 0) {
      return 28;
    }
    return 29;
  }
  return 28;
};
