import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import "../../styles/layout.css";

function Layout({ children }) {
    return (
        <div className="app-layout">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <main className="page-content">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default Layout;