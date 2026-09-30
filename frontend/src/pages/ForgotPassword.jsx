import { useState } from "react";
import { Link } from "react-router-dom";

import "./ForgotPassword.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        setError("");
        setSent(false);

        if (!email.trim()) {
            setError("Ingresa tu correo electrónico.");
            return;
        }

        setSent(true);
    };

    return (
        <section className="forgot-page">

            <div className="forgot-card">

                <div className="forgot-header">

                    <div className="forgot-logo">
                        Z
                    </div>

                    <h1>
                        Recuperar contraseña
                    </h1>

                    <p>
                        Ingresa tu correo y te enviaremos las
                        instrucciones para recuperar tu cuenta.
                    </p>

                </div>

                {!sent ? (
                    <form
                        className="forgot-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="forgot-field">

                            <label htmlFor="forgotEmail">
                                Correo electrónico
                            </label>

                            <input
                                id="forgotEmail"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="tu@email.com"
                                autoComplete="email"
                            />

                        </div>

                        {error && (
                            <div className="forgot-error">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="forgot-submit"
                        >
                            ENVIAR
                        </button>

                    </form>
                ) : (
                    <div className="forgot-success">

                        <div className="forgot-success__icon">
                            ✓
                        </div>

                        <h2>
                            Correo enviado
                        </h2>

                        <p>
                            Si existe una cuenta asociada a ese
                            correo, recibirás las instrucciones
                            para recuperar tu contraseña.
                        </p>

                        <button
                            type="button"
                            className="forgot-submit"
                            onClick={() => {
                                setSent(false);
                                setEmail("");
                            }}
                        >
                            ENVIAR OTRO
                        </button>

                    </div>
                )}

                <div className="forgot-login">

                    <Link to="/login">
                        ← Volver al LOGIN
                    </Link>

                </div>

                <div className="forgot-security">

                    <span>
                        🔒
                    </span>

                    <span>
                        Tu información permanece protegida.
                    </span>

                </div>

            </div>

        </section>
    );
}

export default ForgotPassword;