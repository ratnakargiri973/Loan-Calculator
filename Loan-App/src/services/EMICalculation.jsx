import React, { useState } from 'react';
import { useThemeToggle } from '../contexts/ThemeContextProvider';
import { useEmiCalculator } from '../hooks/useEmiCalculator';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
} from '@mui/material';

function EMICalculation({ loanAmount, interestRate, termYears, setShowResult }) {
  const [currency, setCurrency] = useState('INR');
  const { mode } = useThemeToggle();
  const { emiData, schedule } = useEmiCalculator(loanAmount, interestRate, termYears);

  if (!emiData) return null;

  const tableHeaderStyle = {
    backgroundColor: mode === 'dark' ? '#333' : '#f5f5f5',
    color: mode === 'dark' ? '#fff' : '#000',
    fontWeight: 'bold',
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        EMI Calculation Summary
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Monthly EMI:</strong> {currency} {emiData.monthlyEmi}
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
            <MenuItem value="INR">INR</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
            <MenuItem value="JPY">JPY</MenuItem>
            <MenuItem value="AUD">AUD</MenuItem>
            <MenuItem value="CAD">CAD</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setShowResult(false)}
        >
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
                <TableCell>{item.principal}</TableCell>
                <TableCell>{item.interest}</TableCell>
                <TableCell>{item.remaining}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default EMICalculation;
