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
        style={{ fontFamily: 'Nunito', marginBottom: '1rem' }}
      />
      <input
        type="submit"
        value="Submit"
        id="submit-input"
        onClick={handleSubmit}
        style={{ fontFamily: 'Nunito', width: '100%' }}
      />
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

    // Validate input and set validTransaction accordingly
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
    setDeposit(0); // Reset deposit field after submit
  };

  const handleModeSelect = (event) => {
    const mode = event.target.value;

    setIsDeposit(mode === 'Deposit');
    setValidTransaction(false);
    setDeposit(0); // Reset deposit field when mode changes
  };

  return (
    <form>
      <>
        <h2 id="total" style={{ fontFamily: 'Nunito' }}>
          Account Balance $ {totalState}
        </h2>
        {totalState === 0 ? (
          <div>
            <p style={{ fontFamily: 'Nunito' }}>
              You don't have money in your account, make a deposit to save your money and make cash back in the future.
            </p>
            <input
              type="number"
              onChange={handleChange}
              placeholder="Enter an amount to deposit"
              style={{ fontFamily: 'Nunito', marginBottom: '1rem' }}
            />
            <input
              type="submit"
              value="Submit"
              onClick={handleSubmit}
              style={{ fontFamily: 'Nunito', width: '100%' }}
            />
          </div>
        ) : (
          <div>
            <label htmlFor="mode-select" style={{ fontFamily: 'Nunito', marginBottom: '1rem' }}>
              Select an action below to continue
            </label>
            <select onChange={handleModeSelect} name="mode" id="mode-select" style={{ fontFamily: 'Nunito', marginBottom: '1rem' }}>
              <option value="">--Choose Option--</option>
              <option value="Deposit">Deposit</option>
              <option value="Cash Back">Cash Back</option>
            </select>
            {isDeposit !== null && (
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
