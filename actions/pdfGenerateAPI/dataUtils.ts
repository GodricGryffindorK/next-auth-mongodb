export const capitalizeString = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const capitalizeWords = (str: string):string => {
  return str.toLowerCase().replace(/\b\w/g, match => match.toUpperCase());
}

export const showDate = (): string => {
  const currentDate: Date = new Date();
  const optionsDate: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate: string = currentDate.toLocaleDateString("es", optionsDate);

  return capitalizeString(formattedDate);
}