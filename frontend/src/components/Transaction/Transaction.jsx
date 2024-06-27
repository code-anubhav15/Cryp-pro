import React, { useState, useEffect } from 'react';
import './Transaction.css';
import Sidebar from '../Sidebar/Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ExpenseForm = ({ addExpense }) => {
  const [action, setAction] = useState('buy');
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [cryptoList, setCryptoList] = useState([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then(response => response.json())
      .then(data => {
        setCryptoList(data.map(coin => coin.id));
      })
      .catch(error => console.error('Error fetching crypto data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseFloat(amount) <= 0) {
      alert("Amount must be a positive number.");
      return;
    }
    const expense = {
      action,
      currency,
      amount: parseFloat(amount),
      date,
    };
    addExpense(expense);
    setAction('buy');
    setCurrency('');
    setAmount('');
    setDate(new Date());
    setShowCalendar(false);
  };

  const handleDateClick = () => {
    setShowCalendar(true);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowCalendar(false);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <select value={action} onChange={(e) => setAction(e.target.value)} required className="select-action">
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <select value={currency} onChange={(e) => setCurrency(e.target.value)} required className="select-currency">
        <option value="" disabled>Select Cryptocurrency</option>
        {cryptoList.map((crypto) => (
          <option key={crypto} value={crypto}>{crypto}</option>
        ))}
      </select>
      <div className="amount-input-container">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="input-amount"
          min="0.01"
          step="0.01"
        />
      </div>
      <input
        type="text"
        placeholder="Date"
        value={date.toLocaleDateString()}
        onClick={handleDateClick}
        readOnly
        required
        className="input-date"
      />
      {showCalendar && (
        <div className="calendar-container">
          <Calendar
            value={date}
            onChange={handleDateChange}
          />
        </div>
      )}
      <button type="submit" className={`submit-button ${action === 'buy' ? 'buy-button' : 'sell-button'}`}>
        Add Transaction
      </button>
    </form>
  );
};

const RecentTransactions = ({ expenses }) => {
  return (
    <div className="recent-transactions">
      <h2>Recent Transactions</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index} className={`transaction-item ${expense.action}`}>
            <div>{expense.date.toLocaleDateString()}</div>
            <div className={`action-box ${expense.action}`}>{expense.action}</div>
            <div>{expense.currency.toUpperCase()}</div>
            <div className="transaction-amount">
              {expense.action === 'buy'? '+':'-'}${expense.amount.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Portfolio = ({ expenses }) => {
  const totalBuy = expenses
    .filter((expense) => expense.action === 'buy')
    .reduce((total, expense) => total + expense.amount, 0);
  const totalSell = expenses
    .filter((expense) => expense.action === 'sell')
    .reduce((total, expense) => total + expense.amount, 0);
  const totalBalance = totalBuy - totalSell;

  return (
    <div className="portfolio">
      <h2 style={{ color: 'red' }}>${totalSell.toFixed(2)}</h2>
      <h2>Total Invested: 
        <span style={{ color: totalBalance >= 0 ? 'green' : 'red' }}>
          ${totalBalance.toFixed(2)}
        </span>
      </h2>
      <h2 style={{ color: 'green' }}>${totalBuy.toFixed(2)}</h2>
    </div>
  );
};

const Transaction = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  return (
    <div className="transaction-page">
      <Sidebar />
      <div className="main-content">
        <h2>Transactions</h2>
        <Portfolio expenses={expenses} />
        <div className="transactions">
          <ExpenseForm addExpense={addExpense} />
          <RecentTransactions expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default Transaction;