import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Dashboard</h1>
      <p>
        Conteúdo protegido, acessível somente para usuários
        autenticados.
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
