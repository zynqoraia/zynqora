import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({
        success: true,
        application: "Zynqora",
        message: "Zynqora backend funcionando correctamente",
        timestamp: new Date().toISOString()
    });
});

export default router;