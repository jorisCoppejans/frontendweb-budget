import { useState, useMemo, useCallback } from 'react';
import Transaction from './Transaction';
import TransactionForm from './TransactionForm';
import { TRANSACTION_DATA } from '../../api/mock_data';
import { ThemeContext, useThemeColors } from '../../context/Theme.context';
import { useContext } from 'react';

function TransactionTable({ transactions }) {
  const {theme} = useThemeColors
  if (transactions.length === 0) {
    return (
      <div className='alert alert-info'>There are no transactions yet.</div>
    );
  }

  return (
    <div>
      <table className={`table table-hover table-responsive tabel-${theme}`}>
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Place</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <Transaction key={index} {...transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState(TRANSACTION_DATA);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((t) => {
        return t.place.toLowerCase().includes(search.toLowerCase());
      }),
    [search, transactions]
  );

  const createTransaction = useCallback(
    (user, place, amount, date) => {
      const newTransactions = [
        {
          user,
          place,
          amount,
          date: new Date(date),
        },
        ...transactions,
      ]; // newest first
      setTransactions(newTransactions);
    },
    [transactions]
  );

  return (
    <>
      <h1>Transactions</h1>
      <TransactionForm onSaveTransaction={createTransaction} />
      <div className='input-group mb-3 w-50'>
        <input
          type='search'
          id='search'
          className='form-control rounded'
          placeholder='Search'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type='button'
          className='btn btn-outline-primary'
          onClick={() => setSearch(text)}
        >
          Search
        </button>
      </div>
      <div className='mt-4'>
        <TransactionTable transactions={filteredTransactions} />
      </div>
    </>
  );
}
