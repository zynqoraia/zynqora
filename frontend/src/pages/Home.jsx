import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (

        <section className="home-page">

            <div className="welcome-section">

                <span className="welcome-label">
                    INTELIGENCIA PARA TU INFORMACIÓN
                </span>

                <h1>
                    Todo lo que necesitas,
                    <span> en un solo lugar.</span>
                </h1>

                <p>
                    Zynqora es tu espacio inteligente para
                    guardar, organizar, encontrar y consultar
                    tu información usando inteligencia artificial.
                </p>

                <div className="home-hero-actions">

                    <button
                        type="button"
                        className="home-primary-button"
                        onClick={() => navigate("/register")}
                    >
                        Crear cuenta
                    </button>

                    <button
                        type="button"
                        className="home-secondary-button"
                        onClick={() => navigate("/login")}
                    >
                        Iniciar sesión
                    </button>

                </div>

            </div>


            <div className="quick-actions">

                <div className="action-card">

                    <span className="action-icon">
                        📷
                    </span>

                    <span>
                        <strong>Captura</strong>

                        <small>
                            Guarda fotos, documentos,
                            texto o voz.
                        </small>
                    </span>

                </div>


                <div className="action-card">

                    <span className="action-icon">
                        ✨
                    </span>

                    <span>
                        <strong>Organiza con IA</strong>

                        <small>
                            Zynqora entiende y organiza
                            automáticamente tu información.
                        </small>
                    </span>

                </div>


                <div className="action-card">

                    <span className="action-icon">
                        🔎
                    </span>

                    <span>
                        <strong>Encuentra</strong>

                        <small>
                            Busca y consulta tu información
                            cuando la necesites.
                        </small>
                    </span>

                </div>

            </div>


            <div className="home-info-section">

                <div className="home-info-header">

                    <span className="welcome-label">
                        ¿CÓMO FUNCIONA?
                    </span>

                    <h2>
                        Zynqora trabaja por ti.
                    </h2>

                    <p>
                        No necesitas organizar manualmente
                        toda tu información. Zynqora utiliza
                        inteligencia artificial para ayudarte.
                    </p>

                </div>


                <div className="home-feature-grid">

                    <div className="home-feature">

                        <span className="home-feature__number">
                            01
                        </span>

                        <span className="home-feature__icon">
                            📥
                        </span>

                        <strong>
                            Guarda cualquier cosa
                        </strong>

                        <p>
                            Fotos, PDFs, notas, documentos,
                            ideas, mensajes o información
                            importante.
                        </p>

                    </div>


                    <div className="home-feature">

                        <span className="home-feature__number">
                            02
                        </span>

                        <span className="home-feature__icon">
                            🧠
                        </span>

                        <strong>
                            La IA la comprende
                        </strong>

                        <p>
                            Zynqora identifica qué tipo de
                            información has guardado y la
                            organiza.
                        </p>

                    </div>


                    <div className="home-feature">

                        <span className="home-feature__number">
                            03
                        </span>

                        <span className="home-feature__icon">
                            💬
                        </span>

                        <strong>
                            Pregunta cuando quieras
                        </strong>

                        <p>
                            Consulta tu propia información
                            utilizando lenguaje natural.
                        </p>

                    </div>

                </div>

            </div>


            <div className="home-ai-section">

                <div>

                    <span className="welcome-label">
                        TU INFORMACIÓN + IA
                    </span>

                    <h2>
                        Una nueva forma de
                        <span> recordar y encontrar.</span>
                    </h2>

                    <p>
                        Zynqora conecta la información que
                        guardas para que puedas encontrar
                        relaciones y respuestas sin tener que
                        recordar dónde guardaste cada cosa.
                    </p>

                </div>

                <div className="home-ai-card">

                    <span className="home-ai-card__icon">
                        ✨
                    </span>

                    <strong>
                        Pregunta a Zynqora
                    </strong>

                    <p>
                        Tu información siempre estará
                        disponible para consultar.
                    </p>

                </div>

            </div>


            <div className="home-privacy-section">

                <span className="home-privacy-icon">
                    🔐
                </span>

                <div>

                    <strong>
                        Tu información es personal.
                    </strong>

                    <p>
                        Zynqora está diseñado pensando en
                        la privacidad y seguridad de tus datos.
                    </p>

                </div>

            </div>


            <div className="home-final-cta">

                <span className="welcome-label">
                    EMPIEZA CON ZYNQORA
                </span>

                <h2>
                    Tu información merece
                    <span> estar organizada.</span>
                </h2>

                <p>
                    Crea tu cuenta y comienza a construir
                    tu espacio inteligente.
                </p>

                <button
                    type="button"
                    className="home-primary-button"
                    onClick={() => navigate("/register")}
                >
                    Crear mi cuenta
                </button>

            </div>

        </section>
    );
}

export default Home;