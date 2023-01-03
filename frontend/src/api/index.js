const url = 'http://localhost:7676/api/transactions';

export const fetchTransactions = () => fetch(`${url}`);

export const createTransaction = (transaction) => fetch(`${url}/create`, {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(transaction),
});
