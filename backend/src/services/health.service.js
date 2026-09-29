export const getHealthData = () => {
    return {
        application: "Zynqora",
        status: "online",
        timestamp: new Date().toISOString()
    };
};