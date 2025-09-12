import { motion } from "framer-motion";
import { ArrowRight, Users, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingProps {
  onGetStarted: () => void;
}

// If you have a theme context, import and use it. Otherwise, pass darkMode/setDarkMode as props or remove.
const darkMode = false;
const setDarkMode = () => {};
const Landing = ({ onGetStarted }: LandingProps) => {
  // Mock internship count
  const openInternships = 12;

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-background text-foreground">
      {/* Header */}
      <header className="w-full border-b backdrop-blur-lg sticky top-0 z-20 bg-card border-border shadow-sm">
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
              onClick={setDarkMode}
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
              {/* Partnered Companies List */}
              {[
                "RELIANCE INDUSTRIES LIMITED",
                "TATA CONSULTANCY SERVICES LIMITED",
                "HDFC BANK LIMITED",
                "OIL AND NATURAL GAS CORPORATION LIMITED",
                "INFOSYS LIMITED",
                "NTPC LIMITED",
                "TATA STEEL LIMITED",
                "ITC LIMITED",
                "INDIAN OIL CORPORATION LIMITED",
                "ICICI BANK LIMITED",
                "POWER GRID CORPORATION OF INDIA LIMITED",
                "TATA SONS PRIVATE LIMITED",
                "WIPRO LIMITED",
                "HCL TECHNOLOGIES LIMITED",
                "HINDUSTAN ZINC LIMITED",
                "RELIANCE JIO INFOCOMM LIMITED",
                "MAHANADI COALFIELDS LIMITED",
                "NMDC LIMITED",
                "HINDUSTAN UNILEVER LIMITED",
                "REC LIMITED",
                "JSW STEEL LIMITED",
                "GAIL (INDIA) LIMITED",
                "COGNIZANT TECHNOLOGY SOLUTIONS INDIA PRIVATE LIMITED",
                "LARSEN AND TOUBRO LIMITED",
                "AXIS BANK LIMITED",
                "NORTHERN COALFIELDS LIMITED",
                "OIL INDIA LIMITED",
                "HINDUSTAN PETROLEUM CORPORATION LIMITED",
                "JINDAL STEEL & POWER LIMITED",
                "RELIANCE RETAIL LIMITED",
                "NUCLEAR POWER CORPORATION OF INDIA LIMITED",
                "TECH MAHINDRA LIMITED",
                "POWER FINANCE CORPORATION LIMITED",
                "ULTRATECH CEMENT LIMITED",
                "INDUSIND BANK LTD.",
                "NHPC LIMITED",
                "STEEL AUTHORITY OF INDIA LIMITED",
                "MARUTI SUZUKI INDIA LIMITED",
                "VEDANTA LIMITED",
                "BHARAT PETROLEUM CORPORATION LIMITED",
                "SERUM INSTITUTE OF INDIA PRIVATE LIMITED",
                "BAJAJ FINANCE LIMITED",
                "MAHINDRA AND MAHINDRA LIMITED",
                "HINDUSTAN AERONAUTICS LIMITED",
                "SAMSUNG INDIA ELECTRONICS PRIVATE LIMITED",
                "BAJAJ AUTO LIMITED.",
                "KOTAK MAHINDRA BANK LIMITED",
                "ACCENTURE SOLUTIONS PRIVATE LIMITED",
                "SHRIRAM FINANCE LIMITED",
                "MUTHOOT FINANCE LIMITED",
                "RUNGTA SONS PVT LTD",
                "HERO MOTOCORP LIMITED",
                "COAL INDIA LTD GOVT OF INDIA UNDERTAKING",
                "MEGHA ENGINEERING & INFRASTRUCTURES LIMITED",
                "AMBUJA CEMENTS LIMITED",
                "INDUS TOWERS LIMITED",
                "CAPGEMINI TECHNOLOGY SERVICES INDIA LIMITED",
                "SOUTH EASTERN COALFIELDS LIMITED",
                "ASIAN PAINTS LIMITED",
                "IBM INDIA PRIVATE LIMITED"
              ].map((company, idx) => (
                <span
                  key={company + idx}
                  className="px-6 py-2 bg-blue-50 dark:bg-blue-900 rounded-lg shadow text-blue-700 dark:text-blue-200 font-medium text-sm border border-blue-200 dark:border-blue-800"
                >
                  {company}
                </span>
              ))}
            </div>
            {/* Removed scroll indicator */}
          </div>
        </div>
      </section>
      <motion.main
        className="flex-1 flex items-center justify-center px-4 py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <div className="max-w-2xl mx-auto text-center space-y-10 rounded-2xl shadow-xl p-10 border mt-8 bg-card border-border">
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
      {/* Benefits Section */}
      {/* Eligibility Section */}
  <section className="w-full py-16 bg-gradient-to-br from-gray-50 via-blue-100 to-gray-200 dark:from-blue-950 dark:via-gray-900 dark:to-blue-900">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 mb-12 text-center tracking-tight drop-shadow-lg animate-fade-in">Eligibility Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Age */}
            <div className="rounded-2xl p-8 flex flex-col items-center text-center shadow-lg border border-gray-200 dark:border-blue-900 bg-white/80 dark:bg-blue-950/80 backdrop-blur-md transition-transform duration-300 hover:scale-102 hover:shadow-xl animate-fade-in-up">
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-xl p-2 shadow">
                  <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" fill="#fde047" />
                    <text x="22" y="40" fontSize="20" fill="#f43f5e" fontWeight="bold">21</text>
                    <circle cx="48" cy="16" r="8" fill="#f43f5e" />
                    <text x="45" y="21" fontSize="12" fill="#fff" fontWeight="bold">+</text>
                  </svg>
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-blue-100 mb-2 tracking-tight">Age</h3>
              <p className="text-base text-gray-600 dark:text-gray-300">21-24 Years</p>
            </div>
            {/* Job Status */}
            <div className="rounded-2xl p-8 flex flex-col items-center text-center shadow-lg border border-gray-200 dark:border-blue-900 bg-white/80 dark:bg-blue-950/80 backdrop-blur-md transition-transform duration-300 hover:scale-102 hover:shadow-xl animate-fade-in-up">
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-br from-gray-300 to-gray-500 rounded-xl p-2 shadow">
                  <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
                    <rect x="16" y="20" width="32" height="24" rx="6" fill="#fbbf24" />
                    <rect x="16" y="20" width="32" height="12" rx="6" fill="#1e293b" />
                    <rect x="24" y="32" width="16" height="8" rx="2" fill="#fff" />
                  </svg>
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-blue-100 mb-2 tracking-tight">Job Status</h3>
              <p className="text-base text-gray-600 dark:text-gray-300">Not Employed Full Time</p>
            </div>
            {/* Education */}
            <div className="rounded-2xl p-8 flex flex-col items-center text-center shadow-lg border border-gray-200 dark:border-blue-900 bg-white/80 dark:bg-blue-950/80 backdrop-blur-md transition-transform duration-300 hover:scale-102 hover:shadow-xl animate-fade-in-up">
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-br from-blue-300 to-blue-500 rounded-xl p-2 shadow">
                  <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
                    <rect x="16" y="40" width="32" height="8" rx="2" fill="#fbbf24" />
                    <rect x="24" y="32" width="16" height="8" rx="2" fill="#2563eb" />
                    <polygon points="32,16 24,32 40,32" fill="#2563eb" />
                    <rect x="40" y="32" width="4" height="12" rx="2" fill="#fbbf24" />
                  </svg>
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-blue-100 mb-2 tracking-tight">Education</h3>
              <p className="text-base text-gray-600 dark:text-gray-300">Not Enrolled Full Time</p>
            </div>
            {/* Family */}
            <div className="rounded-2xl p-8 flex flex-col items-center text-center shadow-lg border border-gray-200 dark:border-blue-900 bg-white/80 dark:bg-blue-950/80 backdrop-blur-md transition-transform duration-300 hover:scale-102 hover:shadow-xl animate-fade-in-up">
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-br from-gray-300 to-yellow-400 rounded-xl p-2 shadow">
                  <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
                    <circle cx="22" cy="32" r="12" fill="#22d3ee" />
                    <circle cx="42" cy="32" r="12" fill="#fbbf24" />
                    <rect x="16" y="44" width="32" height="8" rx="4" fill="#e5e7eb" />
                  </svg>
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-blue-100 mb-2 tracking-tight">Family (Self/ Spouse / Parents)</h3>
              <ul className="text-base text-gray-600 dark:text-gray-300 list-disc list-inside mt-2 text-left">
                <li>No one is Earning more than ₹8 Lakhs PA</li>
                <li>No Member has a Govt. Job</li>
              </ul>
            </div>
        <style>{`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both;
          }
        `}</style>
          </div>
        </div>
      </section>
      <section className="w-full py-16" style={{background: 'linear-gradient(120deg, #e0e7ff 0%, #f0f4ff 50%, #c7d2fe 100%)'}}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 mb-12 text-center tracking-tight drop-shadow-lg animate-fade-in">Benefits of the Scheme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Benefit 1 */}
            <div className="relative rounded-3xl p-10 flex flex-col items-center text-center shadow-xl border border-blue-200 dark:border-blue-900 bg-gradient-to-br from-white via-blue-100 to-blue-200 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{background: 'linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 100%)'}}></div>
              <svg width="64" height="64" fill="none" viewBox="0 0 64 64" className="mb-6 drop-shadow-lg"><rect x="10" y="16" width="44" height="32" rx="6" fill="#2563eb"/><circle cx="48" cy="48" r="10" fill="#fff"/><path d="M48 44v4h4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
              <p className="text-lg text-blue-900 dark:text-blue-100 font-semibold">12 months real-life experience in India’s top companies</p>
            </div>
            {/* Benefit 2 */}
            <div className="relative rounded-3xl p-10 flex flex-col items-center text-center shadow-xl border border-blue-200 dark:border-blue-900 bg-gradient-to-br from-white via-yellow-100 to-yellow-200 dark:from-blue-950 dark:via-yellow-900 dark:to-yellow-800 transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{background: 'linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 100%)'}}></div>
              <svg width="64" height="64" fill="none" viewBox="0 0 64 64" className="mb-6 drop-shadow-lg"><rect x="16" y="20" width="32" height="24" rx="4" fill="#fbbf24"/><circle cx="44" cy="44" r="8" fill="#fff"/><text x="40" y="48" fontSize="16" fill="#fbbf24">₹</text></svg>
              <p className="text-lg text-blue-900 dark:text-blue-100 font-semibold">Monthly assistance of ₹4500 by Government of India and ₹500 by Industry</p>
            </div>
            {/* Benefit 3 */}
            <div className="relative rounded-3xl p-10 flex flex-col items-center text-center shadow-xl border border-blue-200 dark:border-blue-900 bg-gradient-to-br from-white via-yellow-100 to-yellow-200 dark:from-blue-950 dark:via-yellow-900 dark:to-yellow-800 transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{background: 'linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 100%)'}}></div>
              <svg width="64" height="64" fill="none" viewBox="0 0 64 64" className="mb-6 drop-shadow-lg"><circle cx="32" cy="32" r="24" fill="#fbbf24"/><text x="24" y="40" fontSize="24" fill="#fff">₹</text></svg>
              <p className="text-lg text-blue-900 dark:text-blue-100 font-semibold">One-time Grant of ₹6000 for incidentals</p>
            </div>
            {/* Benefit 4 */}
            <div className="relative rounded-3xl p-10 flex flex-col items-center text-center shadow-xl border border-blue-200 dark:border-blue-900 bg-gradient-to-br from-white via-pink-100 to-pink-200 dark:from-blue-950 dark:via-pink-900 dark:to-pink-800 transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{background: 'linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 100%)'}}></div>
              <svg width="64" height="64" fill="none" viewBox="0 0 64 64" className="mb-6 drop-shadow-lg"><circle cx="32" cy="32" r="20" fill="#fbbf24"/><circle cx="32" cy="32" r="8" fill="#fff"/><g stroke="#fbbf24" strokeWidth="2"><line x1="32" y1="12" x2="32" y2="4"/><line x1="32" y1="52" x2="32" y2="60"/><line x1="52" y1="32" x2="60" y2="32"/><line x1="12" y1="32" x2="4" y2="32"/><line x1="45.56" y1="18.44" x2="51.21" y2="12.79"/><line x1="18.44" y1="45.56" x2="12.79" y2="51.21"/><line x1="45.56" y1="45.56" x2="51.21" y2="51.21"/><line x1="18.44" y1="18.44" x2="12.79" y2="12.79"/></g></svg>
              <p className="text-lg text-blue-900 dark:text-blue-100 font-semibold">Select from Various Sectors and from top Companies of India</p>
            </div>
          </div>
        </div>
        {/* Animations CSS */}
        <style>{`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both;
          }
        `}</style>
      </section>
      {/* Testimonials Section */}
      <section className="w-full bg-white dark:bg-blue-950 py-12 border-t border-blue-100 dark:border-blue-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-200 mb-8 text-center tracking-tight">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="rounded-2xl border border-blue-100 dark:border-blue-900 shadow-lg p-4 flex flex-col items-center text-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-blue-50 via-white to-blue-200 dark:from-blue-900 dark:via-blue-950 dark:to-blue-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{background: 'linear-gradient(120deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)'}}></div>
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Professional 1" className="w-12 h-12 rounded-full mb-3 shadow-lg border-2 border-white dark:border-blue-900" />
              <p className="text-base italic text-blue-900 dark:text-blue-100 mb-2 font-medium leading-relaxed drop-shadow">“SkillUp helped us discover talented interns who fit our company culture perfectly. The matching process is seamless and efficient!”</p>
              <span className="font-semibold text-blue-700 dark:text-blue-200 mt-2">Rahul Mehra</span>
              <span className="text-xs text-blue-500 dark:text-blue-300">HR Manager, Infosys</span>
            </div>
            {/* Testimonial 2 */}
            <div className="rounded-2xl border border-blue-100 dark:border-blue-900 shadow-lg p-4 flex flex-col items-center text-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-blue-50 via-white to-blue-200 dark:from-blue-900 dark:via-blue-950 dark:to-blue-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{background: 'linear-gradient(120deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)'}}></div>
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Professional 2" className="w-12 h-12 rounded-full mb-3 shadow-lg border-2 border-white dark:border-blue-900" />
              <p className="text-base italic text-blue-900 dark:text-blue-100 mb-2 font-medium leading-relaxed drop-shadow">“The platform’s AI-driven recommendations saved us hours in screening candidates. Highly recommended for campus hiring!”</p>
              <span className="font-semibold text-blue-700 dark:text-blue-200 mt-2">Priya Sharma</span>
              <span className="text-xs text-blue-500 dark:text-blue-300">Talent Acquisition Lead, TCS</span>
            </div>
            {/* Testimonial 3 */}
            <div className="rounded-2xl border border-blue-100 dark:border-blue-900 shadow-lg p-4 flex flex-col items-center text-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-blue-50 via-white to-blue-200 dark:from-blue-900 dark:via-blue-950 dark:to-blue-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{background: 'linear-gradient(120deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)'}}></div>
              <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Professional 3" className="w-12 h-12 rounded-full mb-3 shadow-lg border-2 border-white dark:border-blue-900" />
              <p className="text-base italic text-blue-900 dark:text-blue-100 mb-2 font-medium leading-relaxed drop-shadow">“SkillUp connects us with bright students who are eager to learn and contribute. It’s a game changer for our internship program.”</p>
              <span className="font-semibold text-blue-700 dark:text-blue-200 mt-2">Amit Patel</span>
              <span className="text-xs text-blue-500 dark:text-blue-300">Internship Coordinator, Reliance</span>
            </div>
          </div>
        </div>
      </section>
  {/* Newsletter Subscription Section */}
  <section className="w-full py-16 bg-gradient-to-br from-blue-700 via-purple-700 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900">
      <div className="max-w-xl mx-auto px-4 text-center flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 mb-4 tracking-tight animate-fade-in">
            Subscribe to our Newsletter
          </h2>
          <p className="text-lg md:text-xl text-blue-700 dark:text-blue-200 mb-8 font-medium animate-fade-in-up">
            Get the latest updates, opportunities, and tips delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl border-none bg-white/60 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all duration-200 shadow-xl text-lg font-medium backdrop-blur-lg placeholder:text-purple-400"
              required
              style={{boxShadow: '0 4px 24px 0 rgba(99,102,241,0.15), 0 1.5px 6px 0 rgba(236,72,153,0.10)'}}
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold shadow-xl hover:scale-110 transition-transform duration-200 text-lg flex items-center gap-2 neon-glow"
              style={{boxShadow: '0 0 16px 2px #a78bfa, 0 2px 8px 0 #ec4899'}}
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-purple-500 dark:text-pink-300 mt-6 font-medium animate-fade-in">We respect your privacy. Unsubscribe anytime.</p>
        </div>
        <style>{`
          .neon-glow {
            box-shadow: 0 0 16px 2px #a78bfa, 0 2px 8px 0 #ec4899, 0 0 8px 2px #38bdf8;
            transition: box-shadow 0.2s;
          }
          .neon-glow:hover {
            box-shadow: 0 0 32px 4px #a78bfa, 0 4px 16px 0 #ec4899, 0 0 16px 4px #38bdf8;
          }
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both;
          }
        `}</style>
        <style>{`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 1.2s cubic-bezier(.4,0,.2,1) both;
          }
        `}</style>
</section>
    </div>
     
  );
};

export default Landing;