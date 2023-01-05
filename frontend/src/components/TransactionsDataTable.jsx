import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useMemo, useEffect } from 'react';
import { selectTransactions } from "../features/transactions/transactionsSlice";
import { transactionsTableCols as columns } from '../lib/transactionsTableCols';
import { multipleTransactionsDeleted } from '../features/transactions/transactionsSlice';
import { deleteMultipleTransactions } from '../api';

const TransactionsDataTable = ({ activeTransactionUpdater }) => {

  const transactions = useSelector(selectTransactions);

  let balance = 0;

  const transactionsWithBalance = transactions.map((transaction) => {
    balance = transaction.type === 'credit' ? balance + parseInt(transaction.amount) : balance - parseInt(transaction.amount);
    return {
      ...transaction,
      balance
    }
  });

  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setData(transactionsWithBalance.filter((item) => item.description && item.description.toLowerCase().includes(filterText.toLocaleLowerCase())));
  }, [transactions, filterText]);

  const [ selectedRows, setSelectedRows ] = useState(false);
  const [toggleCleared, setToggleCleared] = useState(false);

  function handleRowClicked (row) {
    activeTransactionUpdater(row);
  }

  function handleRowsSelect ({ selectedRows }) {
    setSelectedRows(selectedRows);
  }

  const handleRowsClear = () => {
    setToggleCleared(!toggleCleared);
  }

  const contextActions = useMemo(() => {
		const handleDelete = async () => {
			
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => ' ' + r.description)}?`)) {
				setToggleCleared(!toggleCleared);
        try{
          const res = await deleteMultipleTransactions(selectedRows.map(row => row._id));
          if (res.status === 200){
            dispatch(multipleTransactionsDeleted(selectedRows.map(row => row._id)));
          }
        } catch (error) {
          console.log({ error });
        }
        //when you are not using redux
				// setData(data.filter((item) => {
        //   return !selectedRows.map(row => row._id).includes(item._id);
        // }));
			}
		};

		return (
			<button className="btn btn--primary" onClick={handleDelete}>
				Delete
			</button>
		);
	}, [data, selectedRows, toggleCleared]);

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText('');
      }
    }

    return (
      <div className="flex items-stretch">
        <input className="border border-black px-2 py-1" type="text" placeholder="Search Text" onChange={e => setFilterText(e.target.value)} value={filterText} />
        <button onClick={handleClear} className="px-4 -y-4 bg-primary-400">x</button>
      </div>
    )
  }, [filterText])

  return (
    <div>
      <button className="btn btn--primary my-4" onClick={handleRowsClear}>
        Clear Selected Rows
      </button>
      <DataTable
      
			  title="Transactions"
        columns={columns}
        data={data}
        contextActions={contextActions}
        selectableRows
        pagination
        subHeader
        selectableRowsHighlight={true}
        subHeaderComponent={subHeaderComponentMemo}
        onRowClicked={handleRowClicked}
        onSelectedRowsChange={handleRowsSelect}
        clearSelectedRows={toggleCleared}
      />
    </div>

  )
}

export default TransactionsDataTable;
