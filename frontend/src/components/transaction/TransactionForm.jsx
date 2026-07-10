import { useState } from "react";

import "../../styles/transactionForm.css";

function TransactionForm({ onSubmit, initialData }) {

    initialData = initialData || {};

    const [formData, setFormData] = useState({

        type: initialData.type || "expense",

        amount: initialData.amount || "",

        category: initialData.category || "",

        description: initialData.description || "",

        date: initialData.date
            ? initialData.date.substring(0, 10)
            : new Date().toISOString().substring(0, 10),

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(formData);

    };

    return (

        <form
            className="transaction-form"
            onSubmit={handleSubmit}
        >

            <label>Type</label>

            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
            >

                <option value="income">
                    Income
                </option>

                <option value="expense">
                    Expense
                </option>

            </select>

            <label>Amount</label>

            <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                required
            />

            <label>Category</label>

            <input
                type="text"
                name="category"
                placeholder="Food, Salary..."
                value={formData.category}
                onChange={handleChange}
                required
            />

            <label>Description</label>

            <input
                type="text"
                name="description"
                placeholder="Dinner with friends"
                value={formData.description}
                onChange={handleChange}
            />

            <label>Date</label>

            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
            />

            <button type="submit">

                {initialData
                    ? "Update Transaction"
                    : "Save Transaction"}

            </button>

        </form>

    );

}

export default TransactionForm;