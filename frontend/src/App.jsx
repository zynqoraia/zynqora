import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* =========================================
                PÁGINAS PÚBLICAS
            ========================================= */}

      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />

      <Route
        path="/registro"
        element={
          <MainLayout>
            <Register />
          </MainLayout>
        }
      />

      <Route
        path="/recuperar"
        element={
          <MainLayout>
            <ForgotPassword />
          </MainLayout>
        }
      />


      {/* =========================================
                DASHBOARD
                SIN MAINLAYOUT
            ========================================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;