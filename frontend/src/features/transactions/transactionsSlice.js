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
    
  },
  extraReducers(builder) {
    builder 
      .addCase(getTransactions.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.transactions = state.transactions.concat(action.payload);
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.status ='failed',
        state.error = action.error.message
      })
  }
});

const transactionsReducer = transactionsSlice.reducer;

export default transactionsReducer;

export const selectTransactions = state => state.transactions.transactions
