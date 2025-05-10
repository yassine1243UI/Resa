import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function CGVPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Conditions Générales de Vente – Billetterie Spectacle Abou Foley
        </Typography>
        <Typography variant="body1" paragraph>
          Dernière mise à jour : 09/05/2025
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>1. Objet</strong><br />
          Les présentes CGV définissent les modalités de vente des billets pour le spectacle d’Abou Foley, via la plateforme de billetterie utilisée par l’Organisateur.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>2. Prix et paiement</strong><br />
          Les prix des billets sont indiqués en euros, toutes taxes comprises (TTC). Le paiement est exigible immédiatement à la commande, par les moyens de paiement proposés sur la plateforme.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>3. Billets</strong><br />
          Une fois la commande validée et le paiement effectué, un billet électronique est envoyé à l’adresse e-mail fournie lors de la commande. Le billet est personnel, non remboursable et non échangeable, sauf en cas d’annulation du spectacle (voir article 6).
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>4. Contrôle à l’entrée</strong><br />
          L’accès au spectacle est soumis à la présentation d’un billet valide. Tout billet partiellement imprimé, illisible ou falsifié sera considéré comme non valable. Une pièce d’identité pourra être exigée pour vérifier la correspondance entre le billet et le détenteur.
        </Typography>

        {/* Ajoute les autres sections ici de la même manière */}

        <Typography variant="body1" paragraph>
          <strong>8. Droit applicable et litiges</strong><br />
          Les présentes CGV sont soumises au droit français. Tout litige sera soumis aux tribunaux compétents du lieu de domicile de l’Organisateur, sauf disposition légale contraire.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>Contact :</strong> Pour toute question relative à votre billet ou à l’événement, vous pouvez nous écrire à booking.abou@gmail.com.
        </Typography>
      </Box>
    </Container>
  );
}

export default CGVPage;
