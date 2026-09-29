import { useEffect, useState } from "react";

import api from "../config/api";

import Button from "../components/Button";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";

function Home() {
    const [backendStatus, setBackendStatus] =
        useState("Conectando...");

    const [backendData, setBackendData] =
        useState(null);

    useEffect(() => {
        const checkBackend = async () => {
            try {
                const response =
                    await api.get("/health");

                setBackendData(response.data);
                setBackendStatus("Conectado");
            } catch (error) {
                console.error(
                    "Error conectando con el backend:",
                    error
                );

                setBackendStatus("Desconectado");
            }
        };

        checkBackend();
    }, []);

    return (
        <section className="home-page">

            <div className="welcome-section">

                <span className="welcome-label">
                    TU INFORMACIÓN, ORGANIZADA
                </span>

                <h1>
                    Bienvenido a{" "}
                    <span>Zynqora</span>
                </h1>

                <p>
                    Tu espacio inteligente para guardar,
                    organizar y encontrar tu información.
                </p>

            </div>


            <div className="quick-actions">

                <button className="action-card">
                    <span className="action-icon">
                        📷
                    </span>

                    <span>
                        <strong>Capturar</strong>

                        <small>
                            Guarda algo nuevo
                        </small>
                    </span>
                </button>


                <button className="action-card">
                    <span className="action-icon">
                        🔎
                    </span>

                    <span>
                        <strong>Buscar</strong>

                        <small>
                            Encuentra tu información
                        </small>
                    </span>
                </button>


                <button className="action-card">
                    <span className="action-icon">
                        ✨
                    </span>

                    <span>
                        <strong>Preguntar</strong>

                        <small>
                            Habla con Zynqora
                        </small>
                    </span>
                </button>

            </div>


            <div className="component-demo">

                <Card>

                    <div className="component-demo__header">

                        <div>
                            <strong>
                                Componentes del sistema
                            </strong>

                            <small>
                                Componentes reutilizables de Zynqora
                            </small>
                        </div>

                        <StatusBadge status="success">
                            {backendStatus}
                        </StatusBadge>

                    </div>


                    <div className="component-demo__actions">

                        <Button>
                            Acción principal
                        </Button>

                        <Button variant="secondary">
                            Secundaria
                        </Button>

                        <Button variant="ghost">
                            Cancelar
                        </Button>

                    </div>

                </Card>

            </div>


            {backendData && (
                <div className="system-status">

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

                </div>
            )}

        </section>
    );
}

export default Home;