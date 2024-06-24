import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Transaction.css';
import Sidebar from '../Sidebar/Sidebar';

const AddTransactionModal = ({ show, handleClose, addTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({ description, amount: parseFloat(amount), currency, date: new Date(date) });
    handleClose();
  };

   return (
    show ? (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Add Transaction</h2>
          <form onSubmit={handleSubmit}>
            <select
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            >
              <option value="Buy">Buy</option>
              <option value="Sold">Sold</option>
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <button type="submit">Add</button>
            <button type="button" onClick={handleClose}>Cancel</button>
          </form>
        </div>
      </div>
    ) : null
  );
};

const RecentTransactions = ({ transactions, searchTerm }) => {
  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="recent-transactions recent-transactions-area">
      <div className="transaction-headers">
        <div>Date</div>
        <div>Buy/Sold</div>
        <div>Currency</div>
        <div>Amount</div>
      </div>
      <ul>
        {filteredTransactions.map((transaction, index) => (
          <li key={index} className="transaction-item">
            <div>{transaction.date.toLocaleDateString()}</div>
            <div>{transaction.description}</div>
            <div>{transaction.currency}</div>
            <div>${transaction.amount.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Portfolio = ({ transactions }) => {
  const currencyBalances = {};

  transactions.forEach(transaction => {
    const { currency, amount, description } = transaction;
    if(description==="Buy")
        currencyBalances[currency] = (currencyBalances[currency] || 0) + amount;
    else
        currencyBalances[currency] = (currencyBalances[currency] || 0) + amount;
  });

  const totalBalance = Object.values(currencyBalances).reduce((total, balance) => total + balance, 0);

  return (
    <div className="portfolio">
      <h2>Your Portfolio</h2>
      <div className="total-balance">Total Balance: ${totalBalance.toFixed(2)}</div>
      <div className="currency-balances">
        <h3>Currency Balances</h3>
        <ul>
          {Object.entries(currencyBalances).map(([currency, balance]) => (
            <li key={currency}>{currency}: ${balance.toFixed(2)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
  
    const addTransaction = (transaction) => {
      setTransactions([transaction, ...transactions]);
    };
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const filterTransactionsByDate = () => {
      const filteredTransactions = transactions.filter(transaction => {
        if (selectedDate) {
          const transactionDate = new Date(transaction.date);
          return transactionDate.toDateString() === selectedDate.toDateString();
        }
        return true;
      });
      return filteredTransactions;
    };
  
    return (
      <div className="transaction-page">
        <Sidebar />
        <div className="main-content">
          <div className="add-expense">
            <h2>Transactions</h2>
            <button className="add-transaction-button" onClick={() => setShowModal(true)}>Add Transaction</button>
            <AddTransactionModal show={showModal} handleClose={() => setShowModal(false)} addTransaction={addTransaction} />
          </div>
          <div className="calendar">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
            />
          </div>
          <Portfolio transactions={transactions} />
          <div className="recent-transactions">
            <h2 className="transaction-heading">Recent Transactions</h2>
            <div className="search-bar-container">
              <input
                type="text"
                className="search-bar"
                placeholder="Search Transactions"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <RecentTransactions transactions={filterTransactionsByDate()} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    );
  };
  
  export default Transaction;
