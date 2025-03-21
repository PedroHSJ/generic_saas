import React from "react";
import { Button, Container, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Botão personalizado para login com Google
const GoogleButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#4285F4",
  color: "#fff",
  textTransform: "none",
  padding: "10px 20px",
  borderRadius: "4px",
  fontWeight: "bold",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#357ae8",
    boxShadow: "none",
  },
}));

const SignIn: React.FC = () => {
  const handleGoogleLogin = async () => {
    // Redireciona para o endpoint do backend que inicia o fluxo OAuth com Google.
    // Certifique-se de que essa URL esteja correta conforme sua configuração.
    await fetch("http://localhost:5001/api/auth/google", {
      method: "POST",
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Login com Google
        </Typography>
        <Box sx={{ mt: 3 }}>
          <GoogleButton
            variant="contained"
            fullWidth
            onClick={handleGoogleLogin}
          >
            Login com Google
          </GoogleButton>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
