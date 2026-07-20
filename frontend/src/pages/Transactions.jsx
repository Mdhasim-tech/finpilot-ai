import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from "../services/transactionService";

import TransactionTable from "../components/transaction/TransactionTable";
import AddTransactionModal from "../components/transaction/AddTransactionModal";
import DeleteModal from "../components/transaction/DeleteModal";

import "../styles/transactions.css";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [deleteTransactionData, setDeleteTransactionData] = useState(null);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");


    // Filters
    const [search, setSearch] = useState("");

    const [typeFilter, setTypeFilter] = useState("");

    const [minAmount, setMinAmount] = useState("");
    const [maxAmount, setMaxAmount] = useState("");

    const fetchTransactions = async (initial = false) => {

        try {

            if (initial)
                setLoading(true);
            else
                setFetching(true);


            const data = await getTransactions({

                search,

                type: typeFilter,

                minAmount,

                maxAmount,

                fromDate,

                toDate,

            });

            setTransactions(data.transactions);

        } catch (error) {

            console.log(error);

            setError("Unable to load transactions.");

        } finally {

            if (initial)
                setLoading(false);
            else
                setFetching(false);

        }

    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {

        fetchTransactions(true);

    }, []);



    const handleSaveTransaction = async (transactionData) => {

        try {

            if (editingTransaction) {

                await updateTransaction(
                    editingTransaction._id,
                    transactionData
                );

            } else {

                await createTransaction(transactionData);

            }

            setShowModal(false);
            setEditingTransaction(null);

            fetchTransactions();

        } catch (error) {

            console.log(error);

            alert("Unable to save transaction.");

        }

    };

    const handleDeleteTransaction = async () => {

        try {

            await deleteTransaction(deleteTransactionData._id);

            setDeleteTransactionData(null);

            fetchTransactions();

        } catch (error) {

            console.log(error);

            alert("Unable to delete transaction.");

        }

    };
    const handleClearFilters = async () => {

        setSearch("");
        setTypeFilter("");
        setMinAmount("");
        setMaxAmount("");
        setFromDate("");
        setToDate("");
        // Wait until state updates before fetching
        setTimeout(() => {
            fetchTransactions();
        }, 0);

    };

    if (loading) {

        return (

            <Layout>

                <h2>Loading...</h2>

            </Layout>

        );

    }

    if (error) {

        return (

            <Layout>

                <h2>{error}</h2>

            </Layout>

        );

    }

    return (

        <Layout>

            <h1>Transactions</h1>

            <div className="transactions-header">

                <div>

                    <p>
                        Manage all your income and expenses.
                    </p>

                </div>

                <button
                    className="add-btn"
                    onClick={() => setShowModal(true)}
                >
                    + Add Transaction
                </button>

            </div>

            <div className="filter-bar">

                <input
                    type="text"
                    placeholder="Search description or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                >
                    <option value="">
                        All Types
                    </option>

                    <option value="income">
                        Income
                    </option>

                    <option value="expense">
                        Expense
                    </option>
                </select>

                <input
                    type="number"
                    placeholder="Min Amount"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Max Amount"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                />
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />

                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />
                <button
                    className="apply-btn"
                    onClick={() => fetchTransactions()}
                >
                    Apply Filters
                </button>
                {fetching && (
                    <p className="fetching-text">
                        Applying filters...
                    </p>
                )}

                <button
                    onClick={handleClearFilters}
                >
                    Clear Filters
                </button>

            </div>

            <TransactionTable
                transactions={transactions}
                onEdit={(transaction) => {

                    setEditingTransaction(transaction);

                    setShowModal(true);

                }}
                onDelete={(transaction) => {

                    setDeleteTransactionData(transaction);

                }}
            />

            <AddTransactionModal
                isOpen={showModal}
                onClose={() => {

                    setShowModal(false);

                    setEditingTransaction(null);

                }}
                onSubmit={handleSaveTransaction}
                initialData={editingTransaction}
            />

            <DeleteModal
                isOpen={deleteTransactionData !== null}
                onClose={() => setDeleteTransactionData(null)}
                onConfirm={handleDeleteTransaction}
            />

        </Layout>

    );

}

export default Transactions;