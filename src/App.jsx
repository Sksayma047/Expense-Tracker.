import React, { useState, useEffect } from "react";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      const parsedTransactions = JSON.parse(savedTransactions);
      setTransactions(parsedTransactions);
      calculateIncomeExpenses(parsedTransactions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    calculateIncomeExpenses(transactions);
  }, [transactions]);

  const addTransaction = () => {
    if (description && amount) {
      const newTransaction = { description, amount: parseFloat(amount), type };
      const updatedTransactions = [...transactions, newTransaction];
      setTransactions(updatedTransactions);
      setDescription("");
      setAmount("");
    } else {
      alert("Please fill in all fields before adding a transaction.");
    }
  };

  const calculateIncomeExpenses = (transactionsList) => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactionsList.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });
    setIncome(Math.floor(incomeTotal));
    setExpenses(Math.floor(expensesTotal));
    
  };

  const balance = Math.floor(income - expenses);
  

  return (
    <div className="h-screen w-full  flex flex-col items-center justify-center    bg-[#182132] p-5 rounded-lg shadow-md border border-gray-300">
      

      
      <div className="max-w-md w-full p-3 rounded-lg  bg-white  items-center   shadow-md border border-white mb-5">
      <h1 className="text-xl font-bold text-center text-red-500 mb-5">EXPENSE TRACKER</h1>
        <div className="grid grid-cols-1 border border-gray-900 rounded-lg divide-y divide-gray-900">
          <div className="p-4 ">
            <h2 className="text-xl font-semibold text-gray-900">Balance: {balance}</h2>
          </div>
          <div className="grid grid-cols-2">
            <div className="p-4  border-r border-gray-900">
              <h2 className="text-xl font-semibold text-gray-900">Income: {income}</h2>
            </div>
            <div className="p-4 ">
              <h2 className="text-xl font-semibold text-gray-900">Expenses: {expenses}</h2>
            </div>
          </div>
        </div>
      

       
      <div className="mt-4 ">
        <input
          type="text"
          
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-3 text-xl  placeholder-gray-400 text-gray-700"
          placeholder="Description"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mb-3  text-xl placeholder-gray-400 text-gray-700"
          placeholder="Amount"
        />
        
        <button
          onClick={addTransaction}
          className="w-full bg-red-500 text-xl text-white p-2 rounded font-semibold hover:bg-red-700"
        >
          Add Transaction
        </button>
        <div className="max-w-md w-full mt-4 bg-white p-3 rounded-lg shadow-md border border-white">
        <h2 className="text-xl font-bold text-center text-gray-900 mb-3">Transaction History</h2>
        <ul className="divide-y divide-gray-300">
          {transactions.map((transaction, index) => (
            <li key={index} className="p-2 flex justify-between items-center">
              <span className={`font-semibold ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}>
                {transaction.description}
              </span>
              <span className="text-gray-700">{transaction.type === "income" ? "+" : "-"}{transaction.amount}</span>
            </li>
          ))}
        </ul>
      </div>
         </div>
       </div>
    </div>
  );
};

export default App;






