import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { supabase } from "../config/supabase";

import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        const cleanEmail = email.trim();

        if (!cleanEmail) {
            setError(
                "Ingresa tu correo electrónico."
            );
            return;
        }

        if (!password) {
            setError(
                "Ingresa tu contraseña."
            );
            return;
        }

        try {
            setLoading(true);

            const {
                data,
                error: loginError
            } = await supabase.auth.signInWithPassword({
                email: cleanEmail,
                password
            });

            if (loginError) {
                throw loginError;
            }

            if (!data?.session) {
                throw new Error(
                    "No se pudo iniciar la sesión."
                );
            }

            const destination =
                location.state?.from || "/dashboard";

            navigate(destination, {
                replace: true
            });

        } catch (error) {
            console.error(
                "Error iniciando sesión:",
                error
            );

            let message =
                "No se pudo iniciar sesión.";

            if (
                error?.message
                    ?.toLowerCase()
                    .includes("invalid login credentials")
            ) {
                message =
                    "Correo o contraseña incorrectos.";
            }

            setError(message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    Z
                </div>

                <div className="auth-header">

                    <span className="auth-label">
                        ZYNQORA
                    </span>

                    <h1>
                        Bienvenido de nuevo
                    </h1>

                    <p>
                        Inicia sesión para acceder
                        a tu información.
                    </p>

                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label htmlFor="loginEmail">
                            Correo electrónico
                        </label>

                        <input
                            id="loginEmail"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            placeholder="tu@email.com"
                            autoComplete="email"
                            disabled={loading}
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="loginPassword">
                            Contraseña
                        </label>

                        <div className="password-field">

                            <input
                                id="loginPassword"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                placeholder="Tu contraseña"
                                autoComplete="current-password"
                                disabled={loading}
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        (value) => !value
                                    )
                                }
                                disabled={loading}
                            >
                                {showPassword
                                    ? "Ocultar"
                                    : "Mostrar"}
                            </button>

                        </div>

                    </div>

                    <div className="auth-options">

                        <Link to="/recuperar">
                            ¿Olvidaste tu contraseña?
                        </Link>

                    </div>

                    {error && (
                        <div className="auth-message auth-message--error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading
                            ? "INICIANDO..."
                            : "LOGIN"}
                    </button>

                </form>

                <div className="auth-footer">

                    <span>
                        ¿No tienes una cuenta?
                    </span>

                    <Link to="/registro">
                        Crear cuenta
                    </Link>

                </div>

            </div>

        </section>
    );
}

export default Login;