import React, { useState } from 'react';
import {
  Typography,
  Box,
  ButtonBase,
  Switch,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import { useThemeToggle } from '../contexts/ThemeContextProvider';

function HeaderLayout() {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeToggle();
  const location = useLocation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { label: "HOME", to: "/" },
    { label: "EXCHANGE RATES(LIVE)", to: "/exchange_rates_live" },
    { label: "ABOUT", to: "/about" },
    { label: "ERROR PAGE", to: "/error_page" },
  ];

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  return (
    <Box
      component="header"
      sx={{
        bgcolor: theme.palette.background.headerBackgroundColor,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        py: 1,
        boxShadow: 2,
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {isSmallScreen && (
          <IconButton onClick={toggleDrawer(true)} sx={{ color: '#fff' }}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" fontWeight="bold" color="#fff">
          Loan Calculator
        </Typography>
      </Box>


      {!isSmallScreen && (
        <Box display="flex" alignItems="center" gap={2}>
          {navItems.map(({ label, to }, index) => {
            const isActive = location.pathname === to;
            return (
              <ButtonBase
                key={index}
                component={Link}
                to={to}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  bgcolor: isActive
                    ? theme.palette.background.buttonColor
                    : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(30, 136, 229, 0.2)',
                  },
                  color: '#fff',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </ButtonBase>
            );
          })}
        </Box>
      )}

      
      <Box>
        <Switch
          checked={mode === 'dark'}
          onChange={toggleTheme}
          color="default"
        />
      </Box>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          width={250}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          p={2}
          sx={{ bgcolor: theme.palette.background.paper, height: '100%' }}
        >
          <List>
            {navItems.map(({ label, to }, index) => {
              const isActive = location.pathname === to;
              return (
                <ListItem
                  key={index}
                  component={Link}
                  to={to}
                  sx={{
                    borderRadius: 1,
                    bgcolor: isActive
                      ? theme.palette.background.buttonColor
                      : 'transparent',
                    '&:hover': {
                      bgcolor: 'rgba(30, 136, 229, 0.2)',
                    },
                    color: isActive ? '#fff' : theme.palette.primary,
                    mb: 1,
                    textDecoration: 'none',
                  }}
                >
                  <ListItemText primary={label} />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default HeaderLayout;
