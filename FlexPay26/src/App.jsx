import "./App.css";
import { HomePage } from "./HomePage/Homepage";
import { Routes, Route } from "react-router-dom";
import { SiteFooter } from "./SiteFooter/SiteFooter";
import { Login } from "./Logins/Login";
import { SignUp } from "./Logins/SignUp";
import ProtectedRoute from "./utils/ProtectedRoute";
import { UserDashBoard } from "./UserDashBoard/UserDashBoard";
import { PaymentSuccess } from "./PaymentSuccess/PaymentSuccess";
import { ManagerDashboard } from "./ManagerDashboard/ManagerDashboard";
//import { TestSucess } from "./PaymentSuccess/testSuccess";

function App() {
  return (
    <>
      {/* <Login></Login> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login></Login>} />
        <Route path="signup" element={<SignUp />} />
        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute>
              <UserDashBoard />
            </ProtectedRoute>
          }
        />
        <Route path="/payment/success" element={<PaymentSuccess/>} />
        <Route path="managerDashboard" element={<ManagerDashboard/>}/>
      </Routes>
    </>
  );
}

export default App;
