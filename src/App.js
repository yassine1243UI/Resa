import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, AppBar, Toolbar, Typography, CssBaseline, Box, Tabs, Tab } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventList from './components/EventList';
import SuccessPage from './components/SuccessPage';
import Waitlist from './components/WaitlistForm'; // ✅ Import du composant
import CGVPage from './components/CGVPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Billetterie
              </Typography>
            </Toolbar>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Réservations" />
            </Tabs>
          </AppBar>
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<EventList />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/cgv" element={<CGVPage />} />
            </Routes>
          </Container>

          <Waitlist /> {/* ✅ Composant barre en bas de page */}
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
