import {
    useEffect,
    useState
} from "react";

import {
    NavLink,
    useNavigate
} from "react-router-dom";

import {
    supabase
} from "../config/supabase";

import LogoutButton from "../components/LogoutButton";

import "./Dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const [user, setUser] =
        useState(null);

    const [profile, setProfile] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        let mounted = true;

        const loadUser = async () => {

            try {

                const {
                    data: {
                        user
                    }
                } =
                    await supabase.auth.getUser();

                if (!user) {

                    if (mounted) {
                        setLoading(false);
                    }

                    return;
                }

                if (mounted) {
                    setUser(user);
                }

                const {
                    data: profileData,
                    error
                } =
                    await supabase
                        .from("profiles")
                        .select(
                            "full_name, avatar_url, timezone, language"
                        )
                        .eq(
                            "id",
                            user.id
                        )
                        .single();

                if (error) {

                    console.error(
                        "Error obteniendo el perfil:",
                        error
                    );

                } else if (mounted) {

                    setProfile(
                        profileData
                    );
                }

            } catch (error) {

                console.error(
                    "Error cargando Dashboard:",
                    error
                );

            } finally {

                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadUser();

        return () => {
            mounted = false;
        };

    }, []);

    const userName =
        profile?.full_name ||
        user?.user_metadata?.full_name ||
        user?.email?.split("@")[0] ||
        "usuario";

    const firstName =
        userName
            .trim()
            .split(" ")[0] ||
        "usuario";

    if (loading) {

        return (
            <section className="dashboard-page">

                <div className="dashboard-loading">

                    <div className="dashboard-loading__logo">
                        Z
                    </div>

                    <p>
                        Cargando tu espacio...
                    </p>

                </div>

            </section>
        );
    }

    return (

        <section className="dashboard-page">

            {/* ==========================================
                BARRA LATERAL FLOTANTE
            ========================================== */}

            <aside className="dashboard-sidebar">

                <div className="dashboard-sidebar__brand">

                    <div className="dashboard-sidebar__logo">
                        Z
                    </div>

                    <div>
                        <strong>
                            Zynqora
                        </strong>

                        <span>
                            Personal AI
                        </span>
                    </div>

                </div>


                <div className="dashboard-sidebar__section">

                    <span className="dashboard-sidebar__label">
                        PRINCIPAL
                    </span>


                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "dashboard-sidebar__link active"
                                : "dashboard-sidebar__link"
                        }
                    >

                        <span>
                            ◈
                        </span>

                        Inicio

                    </NavLink>


                    <NavLink
                        to="/capturar"
                        className={({ isActive }) =>
                            isActive
                                ? "dashboard-sidebar__link active"
                                : "dashboard-sidebar__link"
                        }
                    >

                        <span>
                            ＋
                        </span>

                        Capturar

                    </NavLink>


                    <NavLink
                        to="/buscar"
                        className={({ isActive }) =>
                            isActive
                                ? "dashboard-sidebar__link active"
                                : "dashboard-sidebar__link"
                        }
                    >

                        <span>
                            ⌕
                        </span>

                        Buscar

                    </NavLink>


                    <NavLink
                        to="/preguntar"
                        className={({ isActive }) =>
                            isActive
                                ? "dashboard-sidebar__link active"
                                : "dashboard-sidebar__link"
                        }
                    >

                        <span>
                            ✦
                        </span>

                        Preguntar

                    </NavLink>

                </div>


                <div className="dashboard-sidebar__section">

                    <span className="dashboard-sidebar__label">
                        INFORMACIÓN
                    </span>


                    <button
                        type="button"
                        className="dashboard-sidebar__link"
                    >
                        <span>
                            ▣
                        </span>

                        Documentos
                    </button>


                    <button
                        type="button"
                        className="dashboard-sidebar__link"
                    >
                        <span>
                            ▤
                        </span>

                        Notas
                    </button>


                    <button
                        type="button"
                        className="dashboard-sidebar__link"
                    >
                        <span>
                            ✓
                        </span>

                        Tareas
                    </button>


                    <button
                        type="button"
                        className="dashboard-sidebar__link"
                    >
                        <span>
                            ◷
                        </span>

                        Eventos
                    </button>


                    <button
                        type="button"
                        className="dashboard-sidebar__link"
                    >
                        <span>
                            ◌
                        </span>

                        Recordatorios
                    </button>


                    <button
                        type="button"
                        className="dashboard-sidebar__link"
                    >
                        <span>
                            $
                        </span>

                        Finanzas
                    </button>

                </div>


                <div className="dashboard-sidebar__bottom">

                    <button
                        type="button"
                        className="dashboard-sidebar__link"
                        onClick={() =>
                            navigate("/perfil")
                        }
                    >

                        <span>
                            ◉
                        </span>

                        Perfil

                    </button>


                    <button
                        type="button"
                        className="dashboard-sidebar__link"
                    >

                        <span>
                            ⚙
                        </span>

                        Configuración

                    </button>


                    <LogoutButton />

                </div>

            </aside>


            {/* ==========================================
                CONTENIDO PRINCIPAL
            ========================================== */}

            <div className="dashboard-main">


                {/* ======================================
                    HEADER
                ====================================== */}

                <header className="dashboard-header">

                    <div className="dashboard-search">

                        <span>
                            ⌕
                        </span>

                        <input
                            type="text"
                            placeholder="Buscar en tu información..."
                            aria-label="Buscar en tu información"
                        />

                        <kbd>
                            /
                        </kbd>

                    </div>


                    <div className="dashboard-header__actions">

                        <button
                            type="button"
                            className="dashboard-icon-button"
                            aria-label="Notificaciones"
                        >
                            ♢

                            <span className="dashboard-notification-dot" />
                        </button>


                        <div className="dashboard-user">

                            <div className="dashboard-user__avatar">

                                {
                                    profile?.avatar_url ? (

                                        <img
                                            src={
                                                profile.avatar_url
                                            }
                                            alt={
                                                userName
                                            }
                                        />

                                    ) : (

                                        userName
                                            .charAt(0)
                                            .toUpperCase()

                                    )}

                            </div>


                            <div className="dashboard-user__info">

                                <strong>
                                    {userName}
                                </strong>

                                <span>
                                    Mi cuenta
                                </span>

                            </div>

                        </div>

                    </div>

                </header>


                {/* ======================================
                    BIENVENIDA
                ====================================== */}

                <div className="dashboard-content">

                    <div className="dashboard-welcome">

                        <div>

                            <span className="dashboard-eyebrow">
                                TU ESPACIO PERSONAL
                            </span>

                            <h1>
                                Buenos días,{" "}
                                <span>
                                    {firstName}
                                </span>
                                {" "}👋
                            </h1>

                            <p>
                                Aquí tienes todo lo que
                                necesitas para organizar y
                                consultar tu información.
                            </p>

                        </div>


                        <button
                            type="button"
                            className="dashboard-capture-button"
                            onClick={() =>
                                navigate("/capturar")
                            }
                        >

                            <span>
                                ＋
                            </span>

                            Nueva captura

                        </button>

                    </div>


                    {/* ==================================
                        ESTADÍSTICAS
                    ================================== */}

                    <div className="dashboard-stats">

                        <div className="dashboard-stat-card">

                            <div className="dashboard-stat-card__top">

                                <span className="dashboard-stat-card__icon">
                                    ▣
                                </span>

                                <span className="dashboard-stat-card__arrow">
                                    →
                                </span>

                            </div>

                            <strong>
                                0
                            </strong>

                            <span>
                                Documentos
                            </span>

                            <small>
                                Información guardada
                            </small>

                        </div>


                        <div className="dashboard-stat-card">

                            <div className="dashboard-stat-card__top">

                                <span className="dashboard-stat-card__icon">
                                    ▤
                                </span>

                                <span className="dashboard-stat-card__arrow">
                                    →
                                </span>

                            </div>

                            <strong>
                                0
                            </strong>

                            <span>
                                Notas
                            </span>

                            <small>
                                Ideas y apuntes
                            </small>

                        </div>


                        <div className="dashboard-stat-card">

                            <div className="dashboard-stat-card__top">

                                <span className="dashboard-stat-card__icon">
                                    ✓
                                </span>

                                <span className="dashboard-stat-card__arrow">
                                    →
                                </span>

                            </div>

                            <strong>
                                0
                            </strong>

                            <span>
                                Tareas
                            </span>

                            <small>
                                Pendientes
                            </small>

                        </div>


                        <div className="dashboard-stat-card">

                            <div className="dashboard-stat-card__top">

                                <span className="dashboard-stat-card__icon">
                                    ◷
                                </span>

                                <span className="dashboard-stat-card__arrow">
                                    →
                                </span>

                            </div>

                            <strong>
                                0
                            </strong>

                            <span>
                                Eventos
                            </span>

                            <small>
                                Próximos eventos
                            </small>

                        </div>

                    </div>


                    {/* ==================================
                        BLOQUE PRINCIPAL
                    ================================== */}

                    <div className="dashboard-grid">


                        {/* ACTIVIDAD */}

                        <div className="dashboard-panel dashboard-activity">

                            <div className="dashboard-panel__header">

                                <div>

                                    <strong>
                                        Actividad reciente
                                    </strong>

                                    <span>
                                        Lo último que has
                                        guardado.
                                    </span>

                                </div>


                                <button
                                    type="button"
                                    className="dashboard-text-button"
                                >
                                    Ver todo →
                                </button>

                            </div>


                            <div className="dashboard-empty">

                                <div className="dashboard-empty__icon">
                                    ✦
                                </div>

                                <strong>
                                    Tu actividad aparecerá aquí
                                </strong>

                                <p>
                                    Cuando guardes documentos,
                                    notas, tareas o cualquier
                                    otra información, podrás
                                    verla desde este espacio.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/capturar")
                                    }
                                >
                                    Crear primera captura
                                </button>

                            </div>

                        </div>


                        {/* ACCIONES RÁPIDAS */}

                        <div className="dashboard-panel dashboard-quick">

                            <div className="dashboard-panel__header">

                                <div>

                                    <strong>
                                        Acciones rápidas
                                    </strong>

                                    <span>
                                        ¿Qué quieres hacer?
                                    </span>

                                </div>

                            </div>


                            <div className="dashboard-quick-list">


                                <button
                                    type="button"
                                    className="dashboard-quick-action"
                                    onClick={() =>
                                        navigate("/capturar")
                                    }
                                >

                                    <span className="dashboard-quick-action__icon">
                                        ＋
                                    </span>

                                    <div>

                                        <strong>
                                            Capturar información
                                        </strong>

                                        <small>
                                            Foto, PDF, texto o voz
                                        </small>

                                    </div>

                                    <span>
                                        →
                                    </span>

                                </button>


                                <button
                                    type="button"
                                    className="dashboard-quick-action"
                                    onClick={() =>
                                        navigate("/buscar")
                                    }
                                >

                                    <span className="dashboard-quick-action__icon">
                                        ⌕
                                    </span>

                                    <div>

                                        <strong>
                                            Buscar
                                        </strong>

                                        <small>
                                            Encuentra cualquier cosa
                                        </small>

                                    </div>

                                    <span>
                                        →
                                    </span>

                                </button>


                                <button
                                    type="button"
                                    className="dashboard-quick-action"
                                    onClick={() =>
                                        navigate("/preguntar")
                                    }
                                >

                                    <span className="dashboard-quick-action__icon">
                                        ✦
                                    </span>

                                    <div>

                                        <strong>
                                            Preguntar a Zynqora
                                        </strong>

                                        <small>
                                            Consulta tu información
                                        </small>

                                    </div>

                                    <span>
                                        →
                                    </span>

                                </button>

                            </div>

                        </div>

                    </div>


                    {/* ==================================
                        ZYNQORA AI
                    ================================== */}

                    <div className="dashboard-ai-banner">

                        <div className="dashboard-ai-banner__icon">
                            ✦
                        </div>

                        <div className="dashboard-ai-banner__content">

                            <span>
                                ZYNQORA AI
                            </span>

                            <strong>
                                Tu información, entendida por IA.
                            </strong>

                            <p>
                                Guarda cualquier cosa y deja que
                                Zynqora la organice para ti.
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                navigate("/preguntar")
                            }
                        >
                            Preguntar a Zynqora
                            <span>
                                →
                            </span>
                        </button>

                    </div>


                    {/* ==================================
                        MÓDULOS
                    ================================== */}

                    <div className="dashboard-modules-section">

                        <div className="dashboard-panel__header">

                            <div>

                                <strong>
                                    Tus módulos
                                </strong>

                                <span>
                                    Accede rápidamente a tu
                                    información.
                                </span>

                            </div>

                        </div>


                        <div className="dashboard-module-grid">


                            <button
                                type="button"
                                className="dashboard-module-card"
                            >

                                <span>
                                    ▣
                                </span>

                                <strong>
                                    Documentos
                                </strong>

                                <small>
                                    0 elementos
                                </small>

                            </button>


                            <button
                                type="button"
                                className="dashboard-module-card"
                            >

                                <span>
                                    ▤
                                </span>

                                <strong>
                                    Notas
                                </strong>

                                <small>
                                    0 elementos
                                </small>

                            </button>


                            <button
                                type="button"
                                className="dashboard-module-card"
                            >

                                <span>
                                    ✓
                                </span>

                                <strong>
                                    Tareas
                                </strong>

                                <small>
                                    0 pendientes
                                </small>

                            </button>


                            <button
                                type="button"
                                className="dashboard-module-card"
                            >

                                <span>
                                    ◷
                                </span>

                                <strong>
                                    Eventos
                                </strong>

                                <small>
                                    0 próximos
                                </small>

                            </button>


                            <button
                                type="button"
                                className="dashboard-module-card"
                            >

                                <span>
                                    ◌
                                </span>

                                <strong>
                                    Recordatorios
                                </strong>

                                <small>
                                    0 activos
                                </small>

                            </button>


                            <button
                                type="button"
                                className="dashboard-module-card"
                            >

                                <span>
                                    $
                                </span>

                                <strong>
                                    Finanzas
                                </strong>

                                <small>
                                    Próximamente
                                </small>

                            </button>

                        </div>

                    </div>

                </div>

                <footer className="dashboard-footer">
                    <span>
                        © {new Date().getFullYear()} Zynqora. Todos los derechos reservados.
                    </span>

                    <span>
                        Tu información. Tu control.
                    </span>
                </footer>

            </div>

        </section>
    );
}

export default Dashboard;