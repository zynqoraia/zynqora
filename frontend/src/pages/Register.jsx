import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../config/supabase";

import "./Register.css";

function Register() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        const cleanName = fullName.trim();
        const cleanEmail = email.trim();

        if (!cleanName) {
            setError("Ingresa tu nombre completo.");
            return;
        }

        if (!cleanEmail) {
            setError("Ingresa tu correo electrónico.");
            return;
        }

        if (password.length < 6) {
            setError(
                "La contraseña debe tener al menos 6 caracteres."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError(
                "Las contraseñas no coinciden."
            );
            return;
        }

        try {
            setLoading(true);

            const {
                data,
                error: signUpError
            } = await supabase.auth.signUp({
                email: cleanEmail,
                password,
                options: {
                    data: {
                        full_name: cleanName,
                        timezone: "America/Bogota",
                        language: "es-CO"
                    }
                }
            });

            if (signUpError) {
                throw signUpError;
            }

            if (!data.user) {
                throw new Error(
                    "No se pudo crear el usuario."
                );
            }

            setSuccess(
                "Cuenta creada correctamente."
            );

            setFullName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            console.error(
                "Error registrando usuario:",
                error
            );

            let message =
                "No se pudo crear la cuenta.";

            if (
                error?.message?.toLowerCase().includes(
                    "already registered"
                )
            ) {
                message =
                    "Este correo ya está registrado.";
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
                        Crear cuenta
                    </h1>

                    <p>
                        Comienza a organizar tu información
                        inteligentemente.
                    </p>

                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label htmlFor="fullName">
                            Nombre completo
                        </label>

                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(event) =>
                                setFullName(
                                    event.target.value
                                )
                            }
                            placeholder="Tu nombre"
                            autoComplete="name"
                            disabled={loading}
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="registerEmail">
                            Correo electrónico
                        </label>

                        <input
                            id="registerEmail"
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

                        <label htmlFor="registerPassword">
                            Contraseña
                        </label>

                        <div className="password-field">

                            <input
                                id="registerPassword"
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
                                placeholder="Mínimo 6 caracteres"
                                autoComplete="new-password"
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

                    <div className="form-group">

                        <label htmlFor="confirmPassword">
                            Confirmar contraseña
                        </label>

                        <div className="password-field">

                            <input
                                id="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                value={
                                    confirmPassword
                                }
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target.value
                                    )
                                }
                                placeholder="Repite tu contraseña"
                                autoComplete="new-password"
                                disabled={loading}
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (value) => !value
                                    )
                                }
                                disabled={loading}
                            >
                                {showConfirmPassword
                                    ? "Ocultar"
                                    : "Mostrar"}
                            </button>

                        </div>

                    </div>

                    {error && (
                        <div className="auth-message auth-message--error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="auth-message auth-message--success">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading
                            ? "CREANDO..."
                            : "REGISTRAR"}
                    </button>

                </form>

                <div className="auth-footer">

                    <span>
                        ¿Ya tienes una cuenta?
                    </span>

                    <Link to="/login">
                        Iniciar sesión
                    </Link>

                </div>

            </div>

        </section>
    );
}

export default Register;