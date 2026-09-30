import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../config/supabase";

import "./LogoutButton.css";

function LogoutButton() {
    const navigate = useNavigate();

    const [loading, setLoading] =
        useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);

            const { error } =
                await supabase.auth.signOut();

            if (error) {
                throw error;
            }

            navigate("/login", {
                replace: true
            });

        } catch (error) {
            console.error(
                "Error cerrando sesión:",
                error
            );

            alert(
                "No se pudo cerrar la sesión. Intenta nuevamente."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
            disabled={loading}
        >
            {loading
                ? "CERRANDO..."
                : "CERRAR SESIÓN"}
        </button>
    );
}

export default LogoutButton;