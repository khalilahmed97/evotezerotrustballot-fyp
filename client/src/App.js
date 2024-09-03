import React from "react";
import "./App.css";
import MainDash from "./components/MainDash/MainDash.jsx";
import Voters from "./pages/Admin/Voters.jsx";
import ShowCandidates from "./pages/Voter/Candidates.jsx";
import Results from "./pages/Admin/Results.jsx";
import Analytics from "./pages/Admin/Analytics.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Authentication from "./pages/Authentication/Authentication.jsx";
import Header from "./components/Header.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Candidates from "./pages/Admin/Candidates.jsx";
import CastVote from "./pages/Voter/CastVote.jsx";
import VoterDashboard from "./pages/Voter/VoterDashboard/VoterDashboard.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import CandidateTopBar from "./pages/Admin/CandidateTopBar.jsx";
import VoterTopBar from "./pages/Admin/VoterTopBar.jsx";
import SignupForm from "./components/Authentication/SignupForm.jsx";
import SigninForm from "./components/Authentication/SigninForm.jsx";
import CandidateRegistration from "./components/Authentication/CandidateRegisrarion.jsx"; // Correct import
import RegistrationTopBar from "./pages/Admin/RegistrationTopBar.jsx";
import CandidateRequest from "./pages/Admin/CandidateRequest.jsx";
function App() {
  const { role, message } = useSelector((state) => state.user);
  return (
    <div className="App" style={{ width: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" exact element={<SigninForm />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/candidate-registration" element={<CandidateRegistration />} />

          <Route element={<Header />}>
            <Route path="/castVote" element={<CastVote />} />
            <Route path="/showCandidates" element={<ShowCandidates />} />
            <Route path="/dashboard" element={role === "voter" ? <VoterDashboard /> : <MainDash />} />
            <Route path="/voters" element={<VoterTopBar />} />
            <Route path="/candidates" element={<CandidateTopBar />} />
            <Route path="/result" element={<Results />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/request" element={<RegistrationTopBar />} />
            <Route path="/request/:cnic" element={<CandidateRequest />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
