import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Switch } from "./ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import Landing from "./Landing";
import Auth from "./Auth";
import StudentDashboard from "./StudentDashboard";
import SwipeView from "./SwipeView";
import EmployerDashboard from "./EmployerDashboard";

type AppState = "landing" | "auth" | "student-dashboard" | "employer-dashboard" | "swipe";
type UserRole = "student" | "employer" | null;

const App = () => {
  const [currentView, setCurrentView] = useState<AppState>("landing");
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  // Sync darkMode with localStorage and html class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleGetStarted = () => {
    setCurrentView("auth");
  };

  const handleAuthComplete = (role: "student" | "employer") => {
    setUserRole(role);
    if (role === "student") {
      setCurrentView("student-dashboard");
    } else {
      setCurrentView("employer-dashboard");
    }
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
  };

  const handleNavigateToSwipe = () => {
    setCurrentView("swipe");
  };

  const handleBackToDashboard = () => {
    if (userRole === "student") {
      setCurrentView("student-dashboard");
    } else {
      setCurrentView("employer-dashboard");
    }
  };

  const handleLogout = () => {
    setCurrentView("landing");
    setUserRole(null);
  };

  return (
    <div className={`min-h-screen bg-background${darkMode ? ' dark' : ''}`}> 
      <div>
        <AnimatePresence mode="wait">
          {currentView === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Landing onGetStarted={handleGetStarted} darkMode={darkMode} setDarkMode={setDarkMode} />
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
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </motion.div>
          )}

          {currentView === "employer-dashboard" && (
            <motion.div
              key="employer-dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EmployerDashboard onLogout={handleLogout} darkMode={darkMode} setDarkMode={setDarkMode} />
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
    </div>
  );
};

export default App;