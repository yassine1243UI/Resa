import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, AppBar, Toolbar, Typography, CssBaseline, Box, Tabs, Tab, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // ✅ Import Link
import EventList from './components/EventList';
import SuccessPage from './components/SuccessPage';
import Waitlist from './components/WaitlistForm'; // ✅ Import du composant
import CGVPage from './components/CGVPage';
import Accueil from './components/Acceuil';
import Logo from './img/Logo.jpg'; // ✅ Import du logo

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Noir foncé (pour un fond sombre)
    },
    secondary: {
      main: '#B0BEC5', // Gris clair (pour les éléments secondaires)
    },
    background: {
      default: '#ECEFF1', // Blanc cassé très léger (pour l'arrière-plan)
      paper: '#FFFFFF', // Blanc pur pour les cartes et les sections importantes
    },
    text: {
      primary: '#212121', // Texte sombre (presque noir)
      secondary: '#757575', // Texte secondaire (gris moyen)
    },
    error: {
      main: '#F44336', // Une couleur rouge atténuée pour les erreurs
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
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '16px' }} />
              </Box>
              <Box>
                <Button component={Link} to="/" color="inherit">Billetterie</Button>
                <Button component={Link} to="/accueil" color="inherit">Accueil</Button>
              </Box>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<EventList />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/cgv" element={<CGVPage />} />
              <Route path="/accueil" element={<Accueil />} />
            </Routes>
          </Container>

          <Waitlist />
        </Box>
      </Router>
    </ThemeProvider>
  );
}


export default App;
