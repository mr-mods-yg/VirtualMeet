import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./pages/Logout";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import CreateEvent from "./pages/CreateEvent";
import { Toaster } from "react-hot-toast";
import Meeting from "./pages/Meeting";
import AuthHandler from "./pages/AuthHandler";
import MyEvents from "./pages/MyEvents";
import MyEventPage from "./pages/MyEventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import EditDetailsPage from "./pages/EditDetailsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<AuthHandler />} />
        <Route path="/dashboard" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/event/create" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
        <Route path="/event/:id" element={<ProtectedRoute><EventDetailsPage /></ProtectedRoute>} />
        <Route path="/event/me" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
        <Route path="/event/me/:id" element={<ProtectedRoute><MyEventPage /></ProtectedRoute>} />
        <Route path="/event/edit/:id" element={<ProtectedRoute><EditDetailsPage /></ProtectedRoute>} />
        <Route path="/meeting" element={<ProtectedRoute><Meeting /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
