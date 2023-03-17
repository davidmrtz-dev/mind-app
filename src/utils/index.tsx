export const capitalizeFirst = (str: string) => {
  const firstLetter = str.slice(0, 1).toUpperCase();
  const rest = str.slice(1);

  return `${firstLetter}${rest}`;
};

export const formatViewDate = (date: string) =>
  date.split('-').reverse().join('-');
