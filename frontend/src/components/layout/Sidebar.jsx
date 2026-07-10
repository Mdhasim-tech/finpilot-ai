import { NavLink} from "react-router-dom";


import "../../styles/sidebar.css";

function Sidebar() {







    return (

        <aside className="sidebar">

            <h2 className="logo">
                FinPilot AI
            </h2>

            <nav>

                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/transactions">
                    Transactions
                </NavLink>

                <NavLink to="/profile">
                    Profile
                </NavLink>

            </nav>


        </aside>

    );

}

export default Sidebar;