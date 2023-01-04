function TransactionsTableHeaders () {
  return (
    <thead className="bg-secondary text-primary-400">
      <tr>
        <th className="text-left py-4 pr-16 pl-8">Description</th>
        <th className="text-left py-4 pr-16 pl-8">Date</th>
        <th className="text-left py-4 pr-16 pl-8">Credit</th>
        <th className="text-left py-4 pr-16 pl-8">Debit</th>
        <th className="text-left py-4 pr-16 pl-8">Running</th>
        <th className="text-left py-4 pr-16 pl-8">&nbsp; </th>
      </tr> 
    </thead>
  )
}

export default TransactionsTableHeaders;
