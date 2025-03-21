import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Home Page</h1>
      <p>Bem-vindo à aplicação!</p>
      <Link to="/login">Fazer Login</Link>
    </div>
  );
};

export default HomePage;
