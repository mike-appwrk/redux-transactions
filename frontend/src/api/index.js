const url = 'http://localhost:7676/api/transactions';

export const fetchTransactions = () => fetch(`${url}`);

export const createTransaction = (transaction) => fetch(`${url}/create`, {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(transaction),
});

export const getTransaction = (id) => fetch(`${url}/${id}`);

export const updateTransaction = (transaction, id) => fetch(`${url}/update/${id}`, {
  method: 'PATCH', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(transaction),
})

export const deleteTransaction = (id) => fetch(`${url}/delete/${id}`,  { method: 'DELETE' });
