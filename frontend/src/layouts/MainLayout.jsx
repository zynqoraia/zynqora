import {
    NavLink,
    useNavigate
} from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

import {
    supabase
} from "../config/supabase";

import LogoutButton from "../components/LogoutButton";

import "./MainLayout.css";

function MainLayout({ children }) {
    const navigate = useNavigate();

    const [darkMode, setDarkMode] =
        useState(() => {
            return (
                localStorage.getItem(
                    "zynqora-theme"
                ) === "dark"
            );
        });

    const [session, setSession] =
        useState(null);

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            darkMode
        );

        localStorage.setItem(
            "zynqora-theme",
            darkMode
                ? "dark"
                : "light"
        );
    }, [darkMode]);

    useEffect(() => {
        let mounted = true;

        const loadSession = async () => {
            const {
                data,
                error
            } = await supabase.auth.getSession();

            if (error) {
                console.error(
                    "Error obteniendo sesión:",
                    error
                );

                return;
            }

            if (mounted) {
                setSession(data.session);
            }
        };

        loadSession();

        const {
            data: {
                subscription
            }
        } = supabase.auth.onAuthStateChange(
            (_event, currentSession) => {
                if (mounted) {
                    setSession(
                        currentSession
                    );
                }
            }
        );

        return () => {
            mounted = false;

            subscription.unsubscribe();
        };
    }, []);

    const toggleTheme = () => {
        setDarkMode(
            (current) => !current
        );
    };

    return (
        <div className="main-layout">
            <header className="main-header">

                <NavLink
                    to="/"
                    className="main-header__logo"
                >
                    Zynqora
                </NavLink>

                <nav className="main-navigation">

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "main-navigation__link active"
                                : "main-navigation__link"
                        }
                    >
                        Inicio
                    </NavLink>

                    <NavLink
                        to="/capturar"
                        className={({ isActive }) =>
                            isActive
                                ? "main-navigation__link active"
                                : "main-navigation__link"
                        }
                    >
                        Capturar
                    </NavLink>

                    <NavLink
                        to="/buscar"
                        className={({ isActive }) =>
                            isActive
                                ? "main-navigation__link active"
                                : "main-navigation__link"
                        }
                    >
                        Buscar
                    </NavLink>

                    <NavLink
                        to="/preguntar"
                        className={({ isActive }) =>
                            isActive
                                ? "main-navigation__link active"
                                : "main-navigation__link"
                        }
                    >
                        Preguntar
                    </NavLink>

                </nav>

                <div className="main-header__actions">

                    <button
                        type="button"
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={
                            darkMode
                                ? "Activar tema claro"
                                : "Activar tema oscuro"
                        }
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>

                    <div className="main-header__status">
                        <span className="main-header__status-dot" />

                        Sistema activo
                    </div>

                    {session ? (
                        <LogoutButton />
                    ) : (
                        <NavLink
                            to="/login"
                            className="main-header__login"
                        >
                            LOGIN
                        </NavLink>
                    )}

                </div>

            </header>

            <main className="main-content">
                {children}
            </main>

            <footer className="main-footer">

                <span>
                    © {new Date().getFullYear()} Zynqora
                </span>

                <span>
                    Tu información. Tu control.
                </span>

            </footer>
        </div>
    );
}

export default MainLayout;