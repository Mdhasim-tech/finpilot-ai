import api from "./api";

export const getDashboardData = async () => {

    const response = await api.get("/dashboard");

    return response.data;

};
export const getAIInsights = async () => {

    const response = await api.get("/dashboard/insights");

    return response.data;

};