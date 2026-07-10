import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const generateFinancialInsights = async (summary) => {

    const prompt = `
You are an expert personal finance advisor.

Analyze this financial data.

Income: ₹${summary.totalIncome}

Expense: ₹${summary.totalExpense}

Balance: ₹${summary.balance}

Expense Categories:
${summary.categoryBreakdown
            .map(c => `${c.category}: ₹${c.amount}`)
            .join("\n")}

Monthly Trend:
${summary.monthlyTrend
            .map(
                m =>
                    `${m.month} ${m.year}
Income: ₹${m.income}
Expense: ₹${m.expense}`
            )
            .join("\n\n")}

Recent Transactions:
${summary.recentTransactions
            .map(
                t =>
                    `${t.date.toDateString()} | ${t.type} | ₹${t.amount} | ${t.category} | ${t.description}`
            )
            .join("\n")}

Return ONLY valid JSON.

Format:

{
    "insights":[
        "...",
        "...",
        "..."
    ],
    "recommendations":[
        "...",
        "..."
    ],
    "warning":"..."
}

Do not include markdown.

Do not wrap in \`\`\`.

Return only JSON.
`;

    try {

        const response =
            await groq.chat.completions.create({

                model: "llama-3.3-70b-versatile",

                messages: [
                    {
                        role: "system",
                        content:
                            "You are a professional financial advisor.",
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],

                temperature: 0.5,

            });

        const content =
            response.choices[0].message.content.trim();

        try {

            return JSON.parse(content);

        } catch {

            return {

                insights: [
                    "Unable to generate AI insights."
                ],

                recommendations: [],

                warning: "AI service is currently busy. Please try again in a few seconds.",

            };

        }

    } catch (error) {

    console.error("Groq Error:", error);

    return {

        insights: [
            "Unable to generate AI insights."
        ],

        recommendations: [],

        warning:
            "AI service is currently busy. Please try again in a few seconds.",

    };

}

};