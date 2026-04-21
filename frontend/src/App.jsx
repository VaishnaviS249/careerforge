import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from './pages/Home';
import Jobs from './pages/Jobs'; // <-- Import the new Jobs page
import Companies from "./pages/Companies";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import JobDetails from "./pages/JobDetails";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/Login" || location.pathname === "/Signup";

  return (
    // In App.jsx, change the main wrapper div to this:
    <div className="App flex flex-col min-h-screen bg-[#dc6b43]"> 
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} /> {/* <-- Add this route */}
          <Route path="/companies" element={<Companies />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/job/:id" element={<JobDetails />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;