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
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
            L'humour en direct, c'est autre chose !
          </Typography>

          <Typography variant="h5" sx={{ mb: 4, fontStyle: 'italic' }}>
            Les blagues sur Youtube, c'est sympa... mais en direct, dans un théâtre, c'est un tout autre niveau !
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, fontSize: '1.2rem', lineHeight: 1.6 }}>
            Viens participer à la création de mon nouveau spectacle avec des vannes inédites chaque semaine. 
            Quoi de mieux que l'ambiance d'un petit théâtre intimiste pour passer une excellente soirée ?
          </Typography>

          <Typography variant="body1" sx={{ mb: 6, fontSize: '1.2rem', lineHeight: 1.6 }}>
            Et ce n'est pas tout : à la fin de chaque représentation, on enregistre ensemble ma chronique sur l'actu. 
            Tu ris, tu applaudis, tu participes au podcast. Bref, tu fais partie de l'aventure !
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/')}
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

          <Typography variant="body2" sx={{ mt: 4, fontStyle: 'italic' }}>
            Alors, si après TOUT ça, tu n'es pas convaincu de prendre au moins 15 places, je ne sais plus quoi faire !
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Accueil;
