const { MONTHS } = require("@/constants/months");

export const getMonthCount = date => {
	const splitDate = date.split(' ');
  const monthIndex = MONTHS.findIndex(month => month === splitDate[1]);
	splitDate.splice(1, 1, monthIndex + 1);
  return splitDate.join('-');
};