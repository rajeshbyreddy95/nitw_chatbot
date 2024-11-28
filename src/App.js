import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Chatbot from "./components/Chatbot/Chatbot";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
    <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRouteChange = async (navigateTo) => {
    setIsLoading(true); // Start loading
    setTimeout(() => {
      setIsLoading(false); // Stop loading after navigation delay
      navigateTo();
    }, 1000); // Simulated delay
  };

  return (
    <Router>
      {isLoading && <LoadingSpinner />}
      <Routes>
        <Route
          path="/"
          element={<Header navigateWithLoading={handleRouteChange} />}
        />
        <Route
          path="/faq"
          element={<Chatbot navigateWithLoading={handleRouteChange} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
