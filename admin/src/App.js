import React from 'react';
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import EventManager from './components/EventManager';
import AdminStats from './components/AdminStats';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box sx={{ my: 4 }}>
          <AdminStats />
          <EventManager />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
