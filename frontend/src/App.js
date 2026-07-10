import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";

import ProtectedRoute from "./components/layout/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {

  return (

    <BrowserRouter>

      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

              <Route
        path="/profile"
        element={
          <ProtectedRoute>

            <Profile />

          </ProtectedRoute>
        }
      />

      </Routes>


    </BrowserRouter>

  );

}

export default App;