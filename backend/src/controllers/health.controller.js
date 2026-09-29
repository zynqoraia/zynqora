import {
    getHealthData
} from "../services/health.service.js";

export const healthCheck = (req, res) => {
    const healthData = getHealthData();

    res.json({
        success: true,
        application: healthData.application,
        message: "Zynqora backend funcionando correctamente",
        timestamp: healthData.timestamp
    });
};