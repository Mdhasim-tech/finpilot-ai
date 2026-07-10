import "../../styles/transactionTable.css";

function TransactionTable({
    transactions,
    onEdit,
    onDelete,
}) {

    return (

        <table className="transaction-table">

            <thead>

                <tr>

                    <th>Description</th>

                    <th>Category</th>

                    <th>Type</th>

                    <th>Amount</th>

                    <th>Date</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {transactions.map((transaction) => (

                    <tr key={transaction._id}>

                        <td>{transaction.description}</td>

                        <td>{transaction.category}</td>

                        <td>

                            <span
                                className={
                                    transaction.type === "income"
                                        ? "income-badge"
                                        : "expense-badge"
                                }
                            >
                                {transaction.type}
                            </span>

                        </td>

                        <td
                            className={
                                transaction.type === "income"
                                    ? "income-text"
                                    : "expense-text"
                            }
                        >
                            {transaction.type === "income" ? "+" : "-"}₹
                            {transaction.amount}
                        </td>

                        <td>
                            {new Date(transaction.date).toLocaleDateString()}
                        </td>

                        <td className="action-buttons">

                            <button
                                className="edit-btn"
                                onClick={() => onEdit(transaction)}
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => onDelete(transaction)}
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}

export default TransactionTable;