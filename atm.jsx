const ATMDeposit = ({ isDeposit, onChange, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];

  return (
    <div>
      <h3>{choice[Number(!isDeposit)]}</h3>
      <input
        id="number-input"
        type="number"
        onChange={onChange}
        style={{ fontFamily: 'Nunito' }} // Apply Nunito font style
      />
      {isDeposit || isValid ? (
        <input
          type="submit"
          value="Submit"
          id="submit-input"
          style={{ fontFamily: 'Nunito' }} // Apply Nunito font style
        />
      ) : null}
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

    // Simplify condition for valid transaction
    setValidTransaction(
      value > 0 && (isDeposit || value <= totalState || totalState === 0)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validTransaction) {
      if (deposit <= 0) {
        alert('You haven\'t entered an amount!');
      } else if (deposit < 0) {
        alert('You can’t enter a negative amount');
      } else if (deposit % 1 !== 0) {
        alert('You can\'t enter an amount with decimals');
      } else if (!isDeposit && deposit > totalState) {
        alert('You don\'t have enough money in your balance');
      }
      return;
    }

    setTotalState(isDeposit ? totalState + deposit : totalState - deposit);
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
    <form onSubmit={handleSubmit}>
      <h2 id="total" style={{ fontFamily: 'Nunito' }}>Account Balance $ {totalState} </h2>
      {totalState === 0 ? (
        <div>
          <p style={{ fontFamily: 'Nunito' }}>
            You don't have money in your account, make a deposit to save your money and make cash back in the future.
          </p>
          <label htmlFor="number-input" style={{ fontFamily: 'Nunito' }}>Enter an amount to deposit:</label>
        </div>
      ) : (
        <>
          <label htmlFor="mode-select" style={{ fontFamily: 'Nunito' }}>
            Select an action below to continue
          </label>
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
            />
          )}
        </>
      )}
    </form>
  );
};

ReactDOM.render(<Account />, document.getElementById('root'));
