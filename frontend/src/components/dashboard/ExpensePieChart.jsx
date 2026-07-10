import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import "../../styles/pieChart.css";

const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
];

function ExpensePieChart({ data }) {

    return (

        <div className="chart-card">

            <h2>Expense Breakdown</h2>

            <ResponsiveContainer width="100%" height={350}>

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="category"
                        outerRadius={120}
                        label={({ category, percent }) =>
                            `${category} ${(percent * 100).toFixed(0)}%`
                        }
                    >

                        {
                            data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />

                            ))
                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ExpensePieChart;