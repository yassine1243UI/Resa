import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import image from '../img/Affiche.jpg';

const Accueil = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#212121', // fond noir si l'image ne remplit pas tout
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 4,
        py: 8,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // responsive
          alignItems: 'center',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        {/* Image à gauche */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            mb: { xs: 4, md: 0 },
          }}
        >
          <img
            src={image}
            alt="Affiche"
            style={{
              maxWidth: '100%',
              maxHeight: '600px',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }}
          />
        </Box>

        {/* Texte à droite */}
        <Box
          sx={{
            flex: 1,
            color: 'white',
            px: { xs: 2, md: 4 },
            textAlign: 'left',
          }}
        >
<Typography
  variant="h3"
  component="h1"
  gutterBottom
  sx={{ fontWeight: 'bold', mb: 4 }}
>
  T’as aimé ses vidéos ? <br />
  En spectacle, il allume encore plus !
</Typography>

<Typography
  variant="body1"
  sx={{ mb: 6, fontSize: '1.2rem', lineHeight: 1.6 }}
>
  Viens profiter du franc-parler et de l’humour piquant d’Abou Foley dans un spectacle de stand-up à Paris, 
  avec des nouveautés chaque semaine. Le genre d’expérience qu’on n’explique pas mais qu’on vit !
</Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/billeterie')}
            sx={{
              fontSize: '1.2rem',
              py: 2,
              px: 4,
              backgroundColor: '#f50057',
              '&:hover': {
                backgroundColor: '#c51162'
              }
            }}
          >
            Réserver mes places
          </Button>

        </Box>
      </Box>
    </Box>
  );
};

export default Accueil;
