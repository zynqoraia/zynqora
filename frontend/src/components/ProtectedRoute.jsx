import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCurrentSession } from "../services/auth.service";

import "./ProtectedRoute.css";

function ProtectedRoute({ children }) {
    const location = useLocation();

    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);

    useEffect(() => {
        let mounted = true;

        const checkSession = async () => {
            try {
                const currentSession =
                    await getCurrentSession();

                if (mounted) {
                    setSession(currentSession);
                }
            } catch (error) {
                console.error(
                    "Error verificando la sesión:",
                    error
                );

                if (mounted) {
                    setSession(null);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        checkSession();

        return () => {
            mounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="protected-route-loading">
                <div>
                    <span className="protected-route-loading__logo">
                        Z
                    </span>

                    <p>
                        Verificando sesión...
                    </p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location.pathname
                }}
            />
        );
    }

    return children;
}

export default ProtectedRoute;