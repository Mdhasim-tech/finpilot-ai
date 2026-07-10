import "../../styles/navbar.css";
import { useAuth } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

function Navbar() {

    const { user,logout } = useAuth();


    const navigate = useNavigate();

    return (

        <header className="navbar">

            <h2>Dashboard</h2>

            <div className="navbar-right">

                <span>

                    Welcome back,

                    <strong>{user?.name}</strong> 👋

                </span>

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