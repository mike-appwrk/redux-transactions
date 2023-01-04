import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTransactions } from "../../api";

const initialState = {
  transactions: [],
  status: 'idle',
  errro: null
};

export const getTransactions = createAsyncThunk('/transactions/getTransactions', async () => {
  const res = await fetchTransactions();
  const transactions = await res.json();
  return transactions;
})

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    transactionCreated(state, action) {
      state.transactions.push(action.payload);
    },

    transactionUpdated(state, action) {
      state.transactions = [...state.transactions.map((item) => item._id === action.payload._id ? action.payload : item)]
    },
 
    transactionDeleted(state, action) {
      console.log('Deletion!')
      state.transactions = [...state.transactions.filter((item) => item._id !== action.payload)];
    }
  },
  extraReducers(builder) {
    builder 
      .addCase(getTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.status ='failed';
        state.error = action.error.message;
      })
  }
});

export const { transactionCreated, transactionUpdated, transactionDeleted } = transactionsSlice.actions;

const transactionsReducer = transactionsSlice.reducer;

export default transactionsReducer;

export const selectTransactions = state => state.transactions.transactions;

export const selectTransactionById = (state, id) => state.transactions.transactions.find(transaction => transaction._id === id);

export const selectSortedTransactions = (state) => [...state.transactions.transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
