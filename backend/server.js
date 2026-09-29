import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(
    express.json({
        limit: "10mb"
    })
);

app.get("/", (req, res) => {
    res.json({
        success: true,
        application: "Zynqora",
        message: "Backend funcionando correctamente"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        application: "Zynqora",
        message: "Zynqora backend funcionando",
        environment: process.env.NODE_ENV || "development"
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Ruta no encontrada"
    });
});

app.listen(PORT, () => {
    console.log("");
    console.log("================================");
    console.log("          ZYNQORA");
    console.log("================================");
    console.log(`Servidor: http://localhost:${PORT}`);
    console.log(`Health:   http://localhost:${PORT}/api/health`);
    console.log("================================");
    console.log("");
});