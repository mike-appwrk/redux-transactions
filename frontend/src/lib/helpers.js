import moment from "moment";

export const dateFormatter = (date, format='MM/DD/YYYY') => {
  return moment(date).format(format);
}
