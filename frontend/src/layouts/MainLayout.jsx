import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./MainLayout.css";

function MainLayout({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme =
            localStorage.getItem("zynqora-theme");

        return savedTheme === "dark";
    });

    useEffect(() => {
        const theme = darkMode
            ? "dark"
            : "light";

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "zynqora-theme",
            theme
        );
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode((current) => !current);
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