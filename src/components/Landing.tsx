import { motion } from "framer-motion";
import { ArrowRight, Users, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingProps {
  onGetStarted: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const Landing = ({ onGetStarted, darkMode, setDarkMode }: LandingProps) => {
  // Mock internship count
  const openInternships = 12;

  return (
    <div
      className={
        `min-h-screen flex flex-col transition-colors duration-500 bg-background text-foreground`
      }
    >
      {/* Header */}
      <header className={
        `w-full border-b backdrop-blur-lg sticky top-0 z-20 bg-card border-border shadow-sm`
      }>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/placeholder.svg" alt="Logo" className="h-8 w-8" />
            <span className="font-bold text-xl text-foreground">SkillUp</span>
          </div>
          {/* Buttons */}
          <div className="flex items-center gap-3">
            {/* Login Button */}
            <Button variant="outline" className="border-border text-foreground" onClick={onGetStarted}>Login</Button>
            {/* Signup Button */}
            <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white" onClick={onGetStarted}>Sign Up</Button>
            {/* Dark/Light Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setDarkMode(!darkMode)}
              className="text-foreground"
            >
              {darkMode ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><path d="M12 1v2m0 18v2m9-9h-2M5 12H3m15.36 6.36l-1.42-1.42M6.36 6.36L4.94 4.94m12.02 0l-1.42 1.42M6.36 17.64l-1.42 1.42" /></svg>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Banner Section */}
  <section className="w-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          {/* Left: Text and Buttons */}
          <div className="flex-1 flex flex-col items-start justify-center gap-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
              SkillUp <span className="text-yellow-400">- the smart bridge that connects talent with the right opportunities.</span>
            </h2>
            <p className="text-xl text-blue-100 mb-4">
              For fresher jobs, internships, and courses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-2">
              <Button className="bg-white text-blue-700 font-semibold px-6 py-4 flex items-center gap-2 shadow-md hover:bg-gray-100">
                Guidelines
              </Button>
              <Button variant="outline" className="bg-blue-600/20 text-white font-semibold px-6 py-4 flex items-center gap-2 border border-blue-300 hover:bg-blue-600/40">
                Support
              </Button>
            </div>
            <p className="text-sm text-blue-100 mt-2">
              By continuing, you agree to our <a href="#" className="underline text-white">T&C.</a>
            </p>
          </div>
          {/* Right: Banner Image Placeholder */}
          <div className="flex-1 flex items-center justify-end mt-8 md:mt-0">
            <div className="h-56 w-72 bg-blue-400/30 rounded-2xl flex items-center justify-center">
              {/* Replace with actual image if needed */}
              <span className="text-white text-lg font-semibold">Banner Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Partnered Companies Marquee */}
      <section className="w-full bg-white dark:bg-blue-950 py-4 border-b border-blue-100 dark:border-blue-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="font-semibold text-blue-700 dark:text-blue-200 mb-2">Our Partnered Companies</div>
          <div
            className="relative h-16 flex items-center overflow-x-auto no-scrollbar group"
            style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
          >
            <style>{`
              .no-scrollbar::-webkit-scrollbar { display: none; }
              .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            <div className="flex whitespace-nowrap gap-10 min-w-max">
              {/* ...company names or logos... */}
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-80 transition-opacity duration-300">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs shadow-lg animate-bounce">Scroll →</span>
            </div>
          </div>
        </div>
      </section>
      <motion.main
        className="flex-1 flex items-center justify-center px-4 py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
          <div className={
            `max-w-2xl mx-auto text-center space-y-10 rounded-2xl shadow-xl p-10 border mt-8 bg-card border-border`
          }>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1
              className={
                `text-4xl md:text-5xl font-extrabold tracking-tight mb-6 ` +
                (darkMode
                  ? 'text-blue-200'
                  : 'text-blue-900 drop-shadow-lg')
              }
            >
              AI-powered internship matching that actually works
            </h1>
            <p
              className={
                `text-lg md:text-xl max-w-lg mx-auto mb-2 font-semibold ` +
                (darkMode
                  ? 'text-blue-300'
                  : 'text-blue-700')
              }
            >
              Skill up. Discover, match, and grow with internships tailored to your strengths.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Button
              className="group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 text-lg font-semibold flex items-center justify-center dark:hover:bg-indigo-700"
              onClick={onGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
            </Button>
            <Button
              variant="outline"
              className="border-2 px-8 py-3 rounded-xl font-semibold transition-colors duration-200 border-border text-foreground hover:bg-muted"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16"
          >
            <div className="p-6 text-center rounded-2xl shadow-lg border transition-shadow duration-200 bg-card border-border hover:shadow-xl">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-accent/10 dark:bg-accent/20">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-medium mb-2 text-foreground">Smart Matching</h3>
              <p className="text-caption text-muted-foreground">
                AI analyzes skills and preferences for perfect matches
              </p>
            </div>
            <div className="p-6 text-center rounded-2xl shadow-lg border transition-shadow duration-200 bg-card border-border hover:shadow-xl">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-purple-100 dark:bg-purple-900/40">
                <Zap className="h-6 w-6 text-purple-500 dark:text-purple-300" />
              </div>
              <h3 className="font-medium mb-2 text-foreground">Fast & Simple</h3>
              <p className="text-caption text-muted-foreground">
                Swipe through opportunities in seconds
              </p>
            </div>
            <div className="p-6 text-center rounded-2xl shadow-lg border transition-shadow duration-200 bg-card border-border hover:shadow-xl">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-pink-100 dark:bg-pink-900/40">
                <Users className="h-6 w-6 text-pink-500 dark:text-pink-300" />
              </div>
              <h3 className="font-medium mb-2 text-foreground">Quality Connections</h3>
              <p className="text-caption text-muted-foreground">
                Connect with top companies and bright students
              </p>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default Landing;