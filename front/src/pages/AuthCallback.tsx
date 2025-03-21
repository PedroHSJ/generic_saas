import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      // Armazena o token no localStorage
      localStorage.setItem("token", token);
      // Redireciona para o dashboard
      navigate("/dashboard", { replace: true });
    } else {
      // Se não houver token, redireciona para a página de login
      navigate("/", { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <p>Processando autenticação...</p>
    </div>
  );
};

export default AuthCallback;
