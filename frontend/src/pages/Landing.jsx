import { Link } from "react-router-dom";
import "../styles/landing.css";

function Landing() {

    return (

        <div className="landing">

            {/* Hero */}

            <section className="hero">

                <div className="hero-left">

                    <h1>

                        Manage Your Money

                        <span> Smarter with AI</span>

                    </h1>

                    <p>

                        FinPilot AI helps you track income,
                        manage expenses, visualize spending,
                        and receive personalized financial
                        insights powered by AI.

                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/register"
                            className="primary-btn"
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/login"
                            className="secondary-btn"
                        >
                            Login
                        </Link>

                    </div>

                </div>

                <div className="hero-right">

                    <div className="dashboard-preview">

                        📊

                    </div>

                </div>

            </section>

            {/* Features */}

            <section className="features">

                <h2>Why Choose FinPilot AI?</h2>

                <div className="feature-grid">

                    <div className="feature-card">

                        📊

                        <h3>Dashboard</h3>

                        <p>

                            Beautiful analytics of your
                            finances.

                        </p>

                    </div>

                    <div className="feature-card">

                        🤖

                        <h3>AI Insights</h3>

                        <p>

                            Personalized recommendations
                            powered by Groq AI.

                        </p>

                    </div>

                    <div className="feature-card">

                        💸

                        <h3>Expense Tracking</h3>

                        <p>

                            Organize every income and
                            expense easily.

                        </p>

                    </div>

                    <div className="feature-card">

                        📈

                        <h3>Charts</h3>

                        <p>

                            Visualize spending with beautiful
                            graphs.

                        </p>

                    </div>

                </div>

            </section>

            {/* How it works */}

            <section className="steps">

                <h2>How It Works</h2>

                <div className="step-container">

                    <div className="step">

                        <span>1</span>

                        <h3>Add Transactions</h3>

                    </div>

                    <div className="step">

                        <span>2</span>

                        <h3>Track Spending</h3>

                    </div>

                    <div className="step">

                        <span>3</span>

                        <h3>Receive AI Insights</h3>

                    </div>

                </div>

            </section>

            {/* CTA */}

            <section className="cta">

                <h2>

                    Ready to take control of your finances?

                </h2>

                <Link
                    to="/register"
                    className="primary-btn"
                >
                    Start For Free
                </Link>

            </section>

            <footer>

                © 2026 FinPilot AI • Built with React,
                Node.js & MongoDB

            </footer>

        </div>

    );

}

export default Landing;