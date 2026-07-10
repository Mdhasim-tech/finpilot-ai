import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


import "../styles/login.css";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const { login } = useAuth();

    const navigate = useNavigate();



    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);


        try {

            await login({
                email,
                password
            });


            navigate("/dashboard");


        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);

        }

    };



    return (

        <div className="auth-container">


            <form
                className="auth-card"
                onSubmit={handleSubmit}
            >

                <h1>
                    Welcome Back
                </h1>


                <p>
                    Login to continue to FinPilot AI
                </p>



                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}



                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />



                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />



                <button
                    disabled={loading}
                >

                    {
                        loading
                            ?
                            "Logging in..."
                            :
                            "Login"
                    }

                </button>
                <p className="auth-link">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>


            </form>


        </div>

    );

}


export default Login;