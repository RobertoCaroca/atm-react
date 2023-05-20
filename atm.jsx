const ATMDeposit = ({ isDeposit, onChange, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];

  return (
    <div>
      <h3>{choice[Number(!isDeposit)]}</h3>
      <input 
        id="number-input" 
        type="number" 
        min="0"
        onChange={onChange}
      />
      {isDeposit && (
        <input 
          type="submit" 
          disabled={!isValid} 
          value="Submit" 
          id="submit-input"
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
  
    if (totalState === 0 && value >= 0) {
      setDeposit(value);
      setValidTransaction(true);
    } else if (totalState !== 0) {
      setDeposit(value);
      setValidTransaction(value >= 0 && (isDeposit || totalState + value >= 0));
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validTransaction) return;

    setTotalState(isDeposit ? totalState + deposit : totalState - deposit);
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
    <form onSubmit={handleSubmit}>
      <h2 id="total">Account Balance $ {totalState} </h2>
      {totalState === 0 && (
        <>
          <label htmlFor="deposit-input">Enter an amount to deposit:</label>
          <input
            id="deposit-input"
            type="number"
            min="0"
            onChange={handleChange}
          />
          <input 
            type="submit" 
            disabled={!validTransaction} 
            value="Submit" 
            id="submit-input"
          />
        </>
      )}
      {totalState !== 0 && (
        <>
          <label htmlFor="mode-select">Select an action below to continue:</label>
          <select onChange={handleModeSelect} name="mode" id="mode-select">
            <option value="">-- Choose Option --</option>
            <option value="Deposit">Deposit</option>
            <option value="Cash Back">Cash Back</option>
          </select>
          {isDeposit !== null && (
            <ATMDeposit
              isDeposit={isDeposit}
              onChange={handleChange}
              isValid={validTransaction}
            />
          )}
        </>
      )}
      {validTransaction === false && (
        <p className="error-message">Invalid transaction.</p>
      )}
    </form>
  );
};

ReactDOM.render(<Account />, document.getElementById('root'));
