import api from "./api";

export const getTransactions = async (filters = {}) => {

    const params = new URLSearchParams();

    if (filters.search) {
        params.append("search", filters.search);
    }

    if (filters.type) {
        params.append("type", filters.type);
    }

    if (filters.minAmount) {
        params.append("minAmount", filters.minAmount);
    }

    if (filters.maxAmount) {
        params.append("maxAmount", filters.maxAmount);
    }

    if (filters.fromDate) {
        params.append("fromDate", filters.fromDate);
    }

    if (filters.toDate) {
        params.append("toDate", filters.toDate);
    }

    const response = await api.get(
        `/transactions?${params.toString()}`
    );

    return response.data;
};

export const createTransaction = async (transactionData) => {

    const response = await api.post(
        "/transactions",
        transactionData
    );

    return response.data;
};

export const updateTransaction = async (id, transactionData) => {

    const response = await api.put(
        `/transactions/${id}`,
        transactionData
    );

    return response.data;
};

export const deleteTransaction = async (id) => {

    const response = await api.delete(`/transactions/${id}`);

    return response.data;
};