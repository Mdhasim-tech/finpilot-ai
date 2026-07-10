import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { registerUser } from "../services/authService";

import "../styles/login.css";


function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const { setUser } = useAuth();

    const navigate = useNavigate();



    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);


        try {

            const data = await registerUser({
                name,
                email,
                password,
            });


            setUser(data.user);


            navigate("/dashboard");


        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration failed"
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
                    Create Account
                </h1>


                <p>
                    Start managing your finances with FinPilot AI
                </p>


                {
                    error && (
                        <div className="error">
                            {error}
                        </div>
                    )
                }


                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />



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


                <button disabled={loading}>

                    {
                        loading
                            ?
                            "Creating..."
                            :
                            "Register"
                    }

                </button>

                <p className="auth-link">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>


            </form>

        </div>

    );
}


export default Register;