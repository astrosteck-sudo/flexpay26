import "./App.css";
import { HomePage } from "./HomePage/Homepage";
import { Routes, Route } from "react-router-dom";
import { SiteFooter } from "./SiteFooter/SiteFooter";
import { Login } from "./Logins/Login";
import { SignUp } from "./Logins/SignUp";

function App() {
  return (
    <>
      {/* <Login></Login> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='login' element={<Login></Login>}/>
        <Route path="signup" element={<SignUp/>}/>
      </Routes>
    </>
  );
}

export default App;
