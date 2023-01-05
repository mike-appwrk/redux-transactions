import { dateFormatter } from "./helpers";

export const transactionsTableCols = [
  {
      name: 'Description',
      selector: row => row.description,
      sortable: true
  },
  {
      name: 'Date',
      selector: row => dateFormatter(row.date),
      sortable: true
  },
  {
    name: 'Credit',
    selector: row => row.type === 'credit' ? row.amount : '-',
    sortable: true
  },
  {
    name: 'Debit',
    selector: row => row.type === 'debit' ? row.amount : '-',
    sortable: true
  },
  {
    name: 'Running',
    selector: row => row.balance,
    sortable: true
  },
]; 