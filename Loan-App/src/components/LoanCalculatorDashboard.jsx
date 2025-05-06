import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import EMICalculation from '../services/EMICalculation';

function LoanCalculatorDashboard() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [termYears, setTermYears] = useState(5);
  const [showResult, setShowResult] = useState(false);

  function handleCalculate() {
    setShowResult(true);
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Loan Calculator Dashboard</h1>

      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '300px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Loan Amount"
          type="number"
          variant="outlined"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <TextField
          label="Interest Rate (%)"
          type="number"
          variant="outlined"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <TextField
          label="Term (Years)"
          type="number"
          variant="outlined"
          value={termYears}
          onChange={(e) => setTermYears(e.target.value)}
        />
      </Box>

      <button
        onClick={handleCalculate}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow transition"
      >
        CALCULATE
      </button>

      {showResult && (
        <EMICalculation
          loanAmount={loanAmount}
          interestRate={interestRate}
          termYears={termYears}
          setShowResult={setShowResult}
        />
      )}
    </div>
  );
}

export default LoanCalculatorDashboard;
