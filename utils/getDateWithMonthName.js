import { MONTHS } from '@/constants/months';

export const getMonthName = date => {
  const splitDate = date.split('-');
  splitDate.splice(1, 1, MONTHS[splitDate[1] - 1]);
  return splitDate.join(' ');
};
