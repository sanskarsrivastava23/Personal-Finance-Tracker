import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "./App.css";
import Dashboard from "./pages/Dashboard.js";
import SignUp from "./pages/Signup.js";

  import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <><ToastContainer/>
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router> 
    </>
  );
}

export default App;