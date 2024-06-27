import React, { useState } from 'react';
import './Transaction.css';
import Sidebar from '../Sidebar/Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ExpenseForm = ({ addExpense }) => {
  const [title, setTitle] = useState('');
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      title,
      currency,
      amount: parseFloat(amount),
      date,
    };
    addExpense(expense);
    setTitle('');
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
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Date"
        value={date.toLocaleDateString()}
        onClick={handleDateClick}
        readOnly
        required
      />
      {showCalendar && (
        <div className="calendar-container">
          <Calendar
            value={date}
            onChange={handleDateChange}
          />
        </div>
      )}
      <button type="submit">Add Expense</button>
    </form>
  );
};

const RecentTransactions = ({ expenses }) => {
  return (
    <div className="recent-transactions">
      <h2>Recent Transactions</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index} className="transaction-item">
            <div>{expense.date.toLocaleDateString()}</div>
            <div>{expense.title}</div>
            <div>{expense.currency}</div>
            <div>${expense.amount.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Portfolio = () => {
  return (
    <div className="portfolio">
      <h2 style={{ color: 'red' }}>$0</h2>
      <h2>Total Balance: $0</h2>
      <h2 style={{ color: 'green' }}>$0</h2>
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
        <Portfolio/>
        <div className="transactions">
          <ExpenseForm addExpense={addExpense} />
          <RecentTransactions expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default Transaction;