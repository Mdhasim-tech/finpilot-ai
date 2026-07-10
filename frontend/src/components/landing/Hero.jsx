import { Link } from "react-router-dom";
import "../../styles/hero.css";

function Hero() {
    return (
        <section className="hero">

            <div className="hero-left">

                <h1>
                    Smarter Finance
                    <br />
                    Powered by AI
                </h1>

                <p>
                    Track expenses, monitor income, visualize spending,
                    and receive intelligent financial insights with
                    FinPilot AI.
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

                <div className="hero-image">

                    📊

                </div>

            </div>

        </section>
    );
}

export default Hero;