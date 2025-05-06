import React, { useState } from 'react';
import { Box, Container, Grid, TextField, Typography, Button } from '@mui/material';
import EMICalculation from './EMICalculation';

function LoanCalculatorDashboard() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [termYears, setTermYears] = useState(5);
  const [showResult, setShowResult] = useState(false);

  function handleCalculate() {
    setShowResult(true);
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" align="center" mb={4}>
        Loan Calculator Dashboard
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Loan Amount"
            type="number"
            fullWidth
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Interest Rate (%)"
            type="number"
            fullWidth
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Term (Years)"
            type="number"
            fullWidth
            value={termYears}
            onChange={(e) => setTermYears(e.target.value)}
          />
        </Grid>
      </Grid>

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleCalculate}
        >
          CALCULATE
        </Button>
      </Box>

      {showResult && (
        <Box mt={6}>
          <EMICalculation
            loanAmount={loanAmount}
            interestRate={interestRate}
            termYears={termYears}
            setShowResult={setShowResult}
          />
        </Box>
      )}
    </Container>
  );
}

export default LoanCalculatorDashboard;
