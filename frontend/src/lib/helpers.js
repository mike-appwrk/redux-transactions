import moment from "moment";

export const dateFormatter = (date, format='MM/DD/YYYY') => {
  return moment(date).format(format);
}

export const validateFormData = (data) => {
  let errors = [];
  const { description, amount, type, date } = data;
  if (!description) errors.push({ msg: 'Please enter a descrption' });
  if (amount < 1) errors.push({ msg: 'Please enter an amount greater than 0' });
  if (typeof amount !== 'number' ) errors.push({ msg: 'Amount should be a number!' });
  if (! ['credit', 'debit'].includes(type) ) errors.push({ msg: 'Please select a valid type!' });
  if (!date) errors.push({ msg: 'Please select a date!' });
  
  if (errors.length) return errors;
  return false;
}
