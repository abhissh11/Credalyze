import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import ReportPage from "./pages/ReportPage";
import UploadPage from "./pages/uploadPage";
import HomePage from "./pages/HomePage";
import { Toaster } from 'sonner';

export default function App() {
  return (

    <Router>
      <div className="min-h-screen bg-gradient-to-tr from-purple-950 via-black to-black text-gray-100">
        {/* Header */}
        <header className="bg-black shadow-sm border-b border-gray-900 sticky top-0 z-10">
          <nav className="container mx-auto flex justify-between items-center px-6 py-4">
            <Link to="/" className="text-xl font-bold text-purple-600">Credalyze</Link>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-purple-600 transition">Home</Link>
              <Link to="/upload" className="hover:text-purple-600 transition">Upload</Link>
              <Link to="/reports" className="hover:text-purple-600 transition">Reports</Link>
            </div>
          </nav>
        </header>

        {/* Main content */}
        <main className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage/>} />
            <Route path="/reports" element={<ReportPage />} />
          </Routes>
        <Toaster richColors position="top-center" />
        </main>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 py-6 border-t mt-8">
          © {new Date().getFullYear()} CreditSea — Built with ❤️ by <Link to="https://abhish.tech/" target="_blank" className="underline">Abhishek</Link> using MERN.
        </footer>
      </div>
    </Router>
  );
}
