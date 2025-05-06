import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import useFetchData from '../hooks/fetchCurrencyandRate';
import { useTheme } from '@mui/material/styles';

function ExchangeRates() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();

  const { data, loading, error } = useFetchData(
    'https://v6.exchangerate-api.com/v6/441c82b757bbc3337fc01d6f/latest/USD'
  );

  const rates = data?.conversion_rates || {};
  const rateEntries = Object.entries(rates);
  const paginatedRates = rateEntries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress color="primary" />
        <Typography mt={2} variant="h6">Loading exchange rates...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error" variant="h6">Error fetching exchange rates</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2, boxShadow: 4 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
          fontWeight: 'bold',
          color: 'primary.main',
        }}
      >
        Live Exchange Rates (Base: USD)
      </Typography>

      <TableContainer sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table sx={{ minWidth: 320 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  ...headerCellStyle,
                  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#1976d2',
                }}
              >
                Currency
              </TableCell>
              <TableCell
                sx={{
                  ...headerCellStyle,
                  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#1976d2',
                }}
              >
                Rate
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRates.map(([code, rate]) => (
              <TableRow
                key={code}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    cursor: 'pointer',
                  },
                }}
              >
                <TableCell sx={cellStyle}>{code}</TableCell>
                <TableCell sx={cellStyle}>{rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={rateEntries.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[10, 25, 50]}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          pt: 2,
          pb: { xs: 1, sm: 2 },
          fontSize: '0.875rem',
        }}
      />
    </Paper>
  );
}

const headerCellStyle = {
  fontWeight: 'bold',
  fontSize: '1rem',
  textAlign: 'center',
};

const cellStyle = {
  padding: '12px',
  textAlign: 'center',
  fontSize: '0.95rem',
  borderBottom: '1px solid #ddd',
  '&:first-of-type': {
    fontWeight: 'bold',
  },
};

export default ExchangeRates;
