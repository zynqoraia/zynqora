
import { supabase } from "../config/supabase";

/**
 * Obtiene el usuario que tiene una sesión activa.
 * Si no hay una sesión iniciada, devuelve null.
 */
export async function getCurrentUser() {
    const {
        data: { user },
        error
    } = await supabase.auth.getUser();

    if (error) {
        if (error.name === "AuthSessionMissingError") {
            return null;
        }

        throw error;
    }

    return user;
}

/**
 * Obtiene la sesión local actual, si existe.
 */
export async function getCurrentSession() {
    const {
        data: { session },
        error
    } = await supabase.auth.getSession();

    if (error) {
        throw error;
    }

    return session;
}

/**
 * Escucha los cambios de autenticación:
 * inicio de sesión, cierre de sesión y renovación de sesión.
 */
export function onAuthStateChange(callback) {
    const {
        data: { subscription }
    } = supabase.auth.onAuthStateChange(
        (event, session) => {
            callback({
                event,
                session,
                user: session?.user ?? null
            });
        }
    );

    return () => {
        subscription.unsubscribe();
    };
}