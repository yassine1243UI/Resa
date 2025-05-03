import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, AppBar, Toolbar, Typography, CssBaseline, Box, Tabs, Tab } from '@mui/material';
import EventList from './components/EventList';

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
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Billetterie
            </Typography>
          </Toolbar>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            centered
          >
            <Tab label="Réservations" />
          </Tabs>
        </AppBar>
        <Container maxWidth="lg">
          <TabPanel value={tabValue} index={0}>
            <EventList />
          </TabPanel>

        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
