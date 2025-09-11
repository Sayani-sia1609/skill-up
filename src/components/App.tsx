import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Landing from "./Landing";
import Auth from "./Auth";
import StudentDashboard from "./StudentDashboard";
import SwipeView from "./SwipeView";

type AppState = "landing" | "auth" | "student-dashboard" | "swipe";

const App = () => {
  const [currentView, setCurrentView] = useState<AppState>("landing");

  const handleGetStarted = () => {
    setCurrentView("auth");
  };

  const handleAuthComplete = () => {
    // In real app, this would depend on user role
    setCurrentView("student-dashboard");
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
  };

  const handleNavigateToSwipe = () => {
    setCurrentView("swipe");
  };

  const handleBackToDashboard = () => {
    setCurrentView("student-dashboard");
  };

  const handleLogout = () => {
    setCurrentView("landing");
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {currentView === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Landing onGetStarted={handleGetStarted} />
          </motion.div>
        )}

        {currentView === "auth" && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Auth onBack={handleBackToLanding} onAuthComplete={handleAuthComplete} />
          </motion.div>
        )}

        {currentView === "student-dashboard" && (
          <motion.div
            key="student-dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StudentDashboard 
              onNavigateToSwipe={handleNavigateToSwipe}
              onLogout={handleLogout}
            />
          </motion.div>
        )}

        {currentView === "swipe" && (
          <motion.div
            key="swipe"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <SwipeView onBack={handleBackToDashboard} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;