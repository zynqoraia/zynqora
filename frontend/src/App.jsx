import { useEffect, useState } from "react";
import api from "./config/api";
import "./App.css";

function App() {
  const [backendStatus, setBackendStatus] = useState("Conectando...");
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await api.get("/health");

        setBackendData(response.data);
        setBackendStatus("Conectado");
      } catch (error) {
        console.error("Error conectando con el backend:", error);
        setBackendStatus("Desconectado");
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="zynqora-app">
      <header className="zynqora-header">
        <div className="zynqora-logo">
          Zynqora
        </div>

        <div className="backend-indicator">
          <span
            className={
              backendStatus === "Conectado"
                ? "status-dot connected"
                : "status-dot"
            }
          />

          {backendStatus}
        </div>
      </header>

      <main className="zynqora-main">
        <section className="welcome-section">
          <span className="welcome-label">
            TU INFORMACIÓN, ORGANIZADA
          </span>

          <h1>
            Bienvenido a <span>Zynqora</span>
          </h1>

          <p>
            Tu espacio inteligente para guardar,
            organizar y encontrar tu información.
          </p>
        </section>

        <section className="quick-actions">
          <button className="action-card">
            <span className="action-icon">📷</span>

            <span>
              <strong>Capturar</strong>
              <small>Guarda algo nuevo</small>
            </span>
          </button>

          <button className="action-card">
            <span className="action-icon">🔎</span>

            <span>
              <strong>Buscar</strong>
              <small>Encuentra tu información</small>
            </span>
          </button>

          <button className="action-card">
            <span className="action-icon">✨</span>

            <span>
              <strong>Preguntar</strong>
              <small>Habla con Zynqora</small>
            </span>
          </button>
        </section>

        {backendData && (
          <section className="system-status">
            <div>
              <span className="status-title">
                Sistema conectado
              </span>

              <span className="status-message">
                {backendData.message}
              </span>
            </div>

            <span className="status-check">
              ✓
            </span>
          </section>
        )}
      </main>

      <footer className="zynqora-footer">
        <span>© {new Date().getFullYear()} Zynqora</span>
        <span>Tu información. Tu control.</span>
      </footer>
    </div>
  );
}

export default App;