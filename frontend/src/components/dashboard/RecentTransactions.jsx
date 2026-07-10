import "../../styles/recentTransactions.css";

function RecentTransactions({ transactions }) {

    return (

        <div className="recent-box">

            <h2>Recent Transactions</h2>

            <table>

                <thead>

                    <tr>

                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        transactions.map((transaction) => (

                            <tr key={transaction._id}>

                                <td>{transaction.description}</td>

                                <td>{transaction.category}</td>

                                <td
                                    style={{
                                        color:
                                            transaction.type === "income"
                                                ? "#10b981"
                                                : "#ef4444",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {
                                        transaction.type === "income"
                                            ? "+"
                                            : "-"
                                    }

                                    ₹ {transaction.amount.toLocaleString()}

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

export default RecentTransactions;