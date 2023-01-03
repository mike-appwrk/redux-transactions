const url = 'http://localhost:7676/api';

export const fetchTransactions = () => fetch(`${url}/transactions`);
