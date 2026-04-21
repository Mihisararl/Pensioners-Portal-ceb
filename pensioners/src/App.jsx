import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import UserIDLogin from "./pages/UserIDLogin";
import OTPLogin from "./pages/OTPLogin";
import PensionsHome from "./pages/PensionsHome";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Default redirect to login page */}
          <Route path="/" element={<Navigate to="/pentionId" />} />

          {/* Login page */}
          <Route path="/pentionId" element={<UserIDLogin />} />

          {/* OTP page - accessible only if userData exists */}
          <Route
            path="/otp"
            element={
              <ProtectedRoute>
                <OTPLogin />
              </ProtectedRoute>
            }
          />

          {/* Pension Home Page - fully protected */}
          <Route
            path="/pension-home"
            element={
              <ProtectedRoute>
                <PensionsHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
