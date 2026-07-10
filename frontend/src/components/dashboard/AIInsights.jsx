import "../../styles/aiInsights.css";

function AIInsights({
    insights,
    loading,
    onGenerate,
}) {

    return (

        <div className="ai-card">

            <h2>🤖 AI Financial Advisor</h2>

            {!insights && !loading && (

                <div className="ai-placeholder">

                    <p>

                        Get personalized financial insights based on your
                        latest income and expense history.

                    </p>

                    <button
                        className="ai-btn"
                        onClick={onGenerate}
                    >
                        Get AI Insights
                    </button>

                </div>

            )}

            {loading && (

                <div className="ai-loading">

                    <p>Generating AI insights...</p>

                </div>

            )}

            {insights && !loading && (

                <>

                    <div className="section">

                        <h3>💡 Insights</h3>

                        <ul>

                            {insights.insights.map((item, index) => (

                                <li key={index}>{item}</li>

                            ))}

                        </ul>

                    </div>

                    <div className="section">

                        <h3>✅ Recommendations</h3>

                        <ul>

                            {insights.recommendations.map((item, index) => (

                                <li key={index}>{item}</li>

                            ))}

                        </ul>

                    </div>

                    <div className="warning">

                        <strong>⚠ Warning</strong>

                        <p>{insights.warning}</p>

                    </div>

                    <button
                        className="ai-btn"
                        onClick={onGenerate}
                    >
                        Refresh AI Insights
                    </button>

                </>

            )}

        </div>

    );

}

export default AIInsights;