import express from "express";
import cors from "cors";
import "dotenv/config";

import apiRoutes from "./src/routes/index.js";

const app = express();

const PORT = process.env.PORT || 3001;

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/

app.use(
    cors({
        origin: true,
        credentials: true
    })
);

app.use(
    express.json({
        limit: "10mb"
    })
);

app.use(
    express.urlencoded({
        extended: true
    })
);

/*
|--------------------------------------------------------------------------
| Ruta principal
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
    res.json({
        success: true,
        application: "Zynqora",
        message: "Backend de Zynqora funcionando correctamente"
    });
});

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

app.use("/api", apiRoutes);

/*
|--------------------------------------------------------------------------
| Ruta 404
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Ruta no encontrada",
        path: req.originalUrl
    });
});

/*
|--------------------------------------------------------------------------
| Iniciar servidor
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
    console.log("");
    console.log("========================================");
    console.log("              ZYNQORA");
    console.log("========================================");
    console.log(`Servidor: http://localhost:${PORT}`);
    console.log(`Health:   http://localhost:${PORT}/api/health`);
    console.log("========================================");
    console.log("");
});