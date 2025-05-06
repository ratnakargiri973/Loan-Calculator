import React from 'react';
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Paper
} from '@mui/material';

function About() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 5 },
        maxWidth: '1000px',
        mx: 'auto',
      }}
    >
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom textAlign="center" color="primary">
          About This App
        </Typography>
        <Typography variant="body1" mb={3}>
          This loan calculator app is a modern, single-page web application built using React.js and Material UI. It allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule, and see real-time currency conversions using live exchange rates.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom color="secondary">
              Features
            </Typography>
            <List dense>
              {[
                'Loan EMI calculation using standard financial formulas',
                'Dynamic amortization schedule table with monthly breakdown',
                'Real-time currency conversion of EMI using a live exchange rate API',
                'Paginated exchange rate table for 160+ currencies',
                'Dark/Light mode toggle for a customizable experience',
                'Collapse header navigation on mobile screens',
                'Fully responsive UI built with Material UI',
              ].map((feature, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom color="secondary">
              Technologies Used
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="React (Hooks, Routing, Context API)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Material UI for styling and responsive components" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Axios for API calls" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Exchange Rate API for real-time currency conversion" />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom color="secondary">
              EMI Formula
            </Typography>
            <Typography variant="body1" mb={1}>
              The EMI (Equated Monthly Installment) is calculated using the formula:
            </Typography>
            <Typography fontWeight="bold" fontStyle="italic" mb={1}>
              EMI = [P × R × (1 + R)^N] / [(1 + R)^N – 1]
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="P = Principal loan amount" />
              </ListItem>
              <ListItem>
                <ListItemText primary="R = Monthly interest rate (annual rate / 12 / 100)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="N = Loan duration in months" />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom color="secondary">
              Currency Conversion API
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', p: 1, borderRadius: 1 }}>
              https://v6.exchangerate-api.com/v6/441c82b757bbc3337fc01d6f/latest/INR
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default About;
