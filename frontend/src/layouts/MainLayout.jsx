// FILE: src/layouts/MainLayout.jsx
//
// WHY THIS FILE EXISTS:
// A "layout" is a wrapper that every page shares.
// React Router renders this once; <Outlet /> is replaced with the
// actual page (Login, Register, Notes) depending on the current URL.
//
// BUG FIXED: The original had hardcoded JSX inside <main>:
//   <h1>Welcome to our Notes App</h1>
//   <p>Please Login to use our product</p>
//   <button><Link to="/login">Login</Link></button>
//
// This text and buttons appeared on EVERY page including Login and Notes.
// On the Login page you'd see two sets of login links. On Notes you'd
// see "Please Login" even when the user is already logged in.
//
// The layout should only contain SHARED chrome (Navbar, Footer etc.)
// NOT page-specific content.

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Navbar rendered on every page */}
      <Navbar />

      {/* Outlet = the current page's content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
