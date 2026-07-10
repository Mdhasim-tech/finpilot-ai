import "../../styles/features.css";

const features = [
    {
        title: "Expense Tracking",
        text: "Track all your expenses and income in one place.",
        icon: "💸",
    },
    {
        title: "Analytics",
        text: "Interactive charts to understand your finances.",
        icon: "📈",
    },
    {
        title: "AI Insights",
        text: "Receive personalized financial advice using Groq AI.",
        icon: "🤖",
    },
];

function Features() {

    return (

        <section className="features">

            <h2>Why FinPilot AI?</h2>

            <div className="feature-grid">

                {
                    features.map((feature) => (

                        <div
                            key={feature.title}
                            className="feature-card"
                        >

                            <div className="feature-icon">

                                {feature.icon}

                            </div>

                            <h3>{feature.title}</h3>

                            <p>{feature.text}</p>

                        </div>

                    ))
                }

            </div>

        </section>

    );

}

export default Features;