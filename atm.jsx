const ATMDeposit = ({ isDeposit, onChange, isValid, onSubmit }) => {
  const choice = ['Deposit', 'Cash Back'];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      onSubmit();
    } else {
      alert("Invalid transaction");
    }
  };

  return (
    <div>
      <h3>{choice[Number(!isDeposit)]}</h3>
      <input
        id="number-input"
        type="number"
        onChange={onChange}
      />
      {isValid && (
        <input
          type="submit"
          value="Submit"
          id="submit-input"
          onClick={handleSubmit}
        />
      )}
    </div>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(false);
  const [validTransaction, setValidTransaction] = React.useState(false);

  const handleChange = (event) => {
    const value = Number(event.target.value);
    setDeposit(value);

    if (value <= 0) {
      setValidTransaction(false);
    } else if (!isDeposit && value > totalState) {
      setValidTransaction(false);
    } else if (value % 1 !== 0) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
  };

  const handleSubmit = () => {
    if (!validTransaction) {
      alert("Invalid transaction");
      return;
    }

    if (!isDeposit && deposit > totalState) {
      alert("You don't have enough money in your balance");
      return;
    }

    const newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    setDeposit(0);
  };

  const handleModeSelect = (event) => {
    const mode = event.target.value;

    setIsDeposit(mode === 'Deposit');
    setValidTransaction(false);
    setDeposit(0);
  };

  return (
    <form>
      <>
        <h2 id="total">Account Balance $ {totalState} </h2>
        {totalState === 0 ? (
          <div>
            <p>
              You don't have money in your account, make a deposit to save your money and make cash back in the future.
            </p>
            <input
              type="number"
              onChange={handleChange}
              placeholder="Enter an amount to deposit"
            />
            {deposit > 0 && (
              <ATMDeposit
                isDeposit={true}
                onChange={handleChange}
                isValid={true}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        ) : (
          <div>
            <label htmlFor="mode-select">Select an action below to continue</label>
            <select onChange={handleModeSelect} name="mode" id="mode-select">
              <option value="">--Choose Option--</option>
              <option value="Deposit">Deposit</option>
              <option value="Cash Back">Cash Back</option>
            </select>
            {(isDeposit !== null) && (
              <ATMDeposit
                isDeposit={isDeposit}
                onChange={handleChange}
                isValid={validTransaction}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        )}
      </>
    </form>
  );
};

ReactDOM.render(<Account />, document.getElementById('root'));
