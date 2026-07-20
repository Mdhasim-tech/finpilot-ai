import "../../styles/navbar.css";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function Navbar() {

    const { user, logout } = useAuth();


    const navigate = useNavigate();
    const location = useLocation();
   

    const isDashboard = location.pathname === "/dashboard";
    const titles = {
        "/dashboard": "Dashboard",
        "/transactions": "Transactions",
        "/profile": "Profile",
    };

    const title = titles[location.pathname] || "FinPilot AI";

    return (

        <header className="navbar">

            <h2>{title}</h2>

            <div className="navbar-right">

                {isDashboard && (
                    <span>
                        Welcome back, <strong>{user?.name}</strong> 👋
                    </span>
                )}

                <button
                    className="logout-btn"
                    onClick={async () => {
                        await logout();
                        navigate("/");
                    }}
                >
                    Logout
                </button>

            </div>



        </header>

    );

}

export default Navbar;