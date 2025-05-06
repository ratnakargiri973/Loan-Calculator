import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function LoanCalculatorDashboard() {
    const [loanAmount, setLoanAmount] = useState(100000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [year, setYear] = useState(5);
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Loan Calculator Dashboard</h1>

      <Box
        component="form"
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
          id="loan-amount"
          label="Loan Amount"
          variant="outlined"
          fullWidth
          value={loanAmount}
          onChange={(e)=>setLoanAmount(e.target.value)}
        />
        <TextField
          id="interest-rate"
          label="Interest Rate (%)"
          variant="outlined"
          fullWidth
          value={interestRate}
          onChange={(e)=>setInterestRate(e.target.value)}
        />
        <TextField
          id="term-years"
          label="Term (Years)"
          variant="outlined"
          fullWidth
          value={year}
          onChange={(e)=>setYear(e.target.value)}
        />
      </Box>

      <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow transition">
        CALCULATE
      </button>
    </div>
  );
}

export default LoanCalculatorDashboard;
