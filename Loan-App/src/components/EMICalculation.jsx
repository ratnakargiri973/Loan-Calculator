import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Select, MenuItem, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, CircularProgress } from '@mui/material';
import useFetchData from '../hooks/fetchCurrencyandRate';
import { useEmiCalculator } from '../hooks/useEmiCalculator';

function EMICalculation({ loanAmount, interestRate, termYears, setShowResult }) {
  const [currency, setCurrency] = useState('INR');
  const theme = useTheme();
  const { emiData, schedule } = useEmiCalculator(loanAmount, interestRate, termYears);

  const { data: exchangeData, loading: loadingRates, error: ratesError } = useFetchData(
    'https://v6.exchangerate-api.com/v6/441c82b757bbc3337fc01d6f/latest/INR'
  );

  const rates = exchangeData?.conversion_rates || {};

  const convert = (amount) => {
    if (currency === 'INR') return amount;
    const rate = rates[currency];
    return rate ? (amount * rate).toFixed(2) : '...';
  };

  if (!emiData || loadingRates) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
        <Typography mt={2}>Calculating EMI and fetching rates...</Typography>
      </Box>
    );
  }

  if (ratesError) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">Error fetching exchange rates</Typography>
      </Box>
    );
  }

  const tableHeaderStyle = {
    backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    fontWeight: 'bold',
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        EMI Calculation Summary
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Monthly EMI:</strong> {currency} {convert(emiData.monthlyEmi)}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Currency</InputLabel>
          <Select
            value={currency}
            label="Currency"
            onChange={(e) => setCurrency(e.target.value)}
          >
            {Object.keys(rates).map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="outlined" color="secondary" onClick={() => setShowResult(false)}>
          RESET TABLE
        </Button>
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Amortization Schedule ({currency})
      </Typography>

      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeaderStyle}>Month</TableCell>
              <TableCell sx={tableHeaderStyle}>Principal ({currency})</TableCell>
              <TableCell sx={tableHeaderStyle}>Interest ({currency})</TableCell>
              <TableCell sx={tableHeaderStyle}>Remaining Balance ({currency})</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((item) => (
              <TableRow key={item.month}>
                <TableCell>{item.month}</TableCell>
                <TableCell>{convert(item.principal)}</TableCell>
                <TableCell>{convert(item.interest)}</TableCell>
                <TableCell>{convert(item.remaining)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default EMICalculation;
