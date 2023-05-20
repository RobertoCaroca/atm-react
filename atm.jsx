const ATMDeposit = ({ onChange, onDeposit, onCashBack, isDeposit }) => {
  const handleAmountChange = (event) => {
    const amount = Number(event.target.value);
    onChange(amount);
  };

  const handleDeposit = (event) => {
    event.preventDefault();
    onDeposit();
  };

  const handleCashBack = (event) => {
    event.preventDefault();
    onCashBack();
  };

  return (
    <div>
      <h3>{isDeposit ? "Deposit" : "Cash Back"}</h3>
      <input type="number" onChange={handleAmountChange} />
      {isDeposit ? (
        <button onClick={handleDeposit}>Submit</button>
      ) : (
        <button onClick={handleCashBack}>Submit</button>
      )}
    </div>
  );
};

const Account = () => {
  const [balance, setBalance] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);

  const handleChange = (amount) => {
    setAmount(amount);
  };

  const handleDeposit = () => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    setAmount(0);
  };

  const handleCashBack = () => {
    if (amount > balance) {
      alert("You don't have enough balance for cash back");
      return;
    }

    const newBalance = balance - amount;
    setBalance(newBalance);
    setAmount(0);
  };

  return (
    <div>
      <h2>Account Balance: ${balance}</h2>
      {balance === 0 ? (
        <ATMDeposit
          onChange={handleChange}
          onDeposit={handleDeposit}
          onCashBack={handleCashBack}
          isDeposit={isDeposit}
        />
      ) : (
        <>
          <label>Select an action:</label>
          <select
            onChange={(event) => setIsDeposit(event.target.value === "Deposit")}
            defaultValue="Deposit"
          >
            <option value="Deposit">Deposit</option>
            <option value="CashBack">Cash Back</option>
          </select>
          <ATMDeposit
            onChange={handleChange}
            onDeposit={handleDeposit}
            onCashBack={handleCashBack}
            isDeposit={isDeposit}
          />
        </>
      )}
    </div>
  );
};

ReactDOM.render(<Account />, document.getElementById("root"));
