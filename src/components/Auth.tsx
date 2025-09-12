import { useState } from "react";
import { motion } from "framer-motion";
import { User, Building, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

type UserRole = "student" | "employer" | null;


interface AuthProps {
  onBack: () => void;
  onAuthComplete: (role: "student" | "employer", studentInfo?: any) => void;
}

const Auth = ({ onBack, onAuthComplete }: AuthProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    company: ""
  });

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with Supabase auth
    console.log("Auth attempt:", { role: selectedRole, ...formData });
    // Simulate successful auth
    if (selectedRole) {
      onAuthComplete(selectedRole);
    }
  };

  if (!selectedRole) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 50%, #a1c4fd 100%)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">Choose Your Role</h2>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Select how you'll be using the platform
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-6">
            <motion.button
              onClick={() => handleRoleSelect("student")}
              className="p-6 text-left rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-indigo-900">
                <User className="h-6 w-6 text-black dark:text-indigo-300" />
              </div>
              <div>
                <h3 className="font-semibold text-black dark:text-white">Student</h3>
                <p className="text-sm text-gray-600 dark:text-indigo-200">Find your perfect internship</p>
              </div>
            </motion.button>

            <motion.button
              onClick={() => handleRoleSelect("employer")}
              className="p-6 text-left rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-indigo-900">
                <Building className="h-6 w-6 text-black dark:text-indigo-300" />
              </div>
              <div>
                <h3 className="font-semibold text-black dark:text-white">Employer</h3>
                <p className="text-sm text-gray-600 dark:text-indigo-200">Discover talented interns</p>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }


  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 50%, #a1c4fd 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800"
      >
        <Button
          variant="ghost"
          onClick={() => setSelectedRole(null)}
          className="mb-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-gray-100 dark:bg-indigo-900">
              {selectedRole === "student" ? (
                <User className="h-6 w-6 text-black dark:text-indigo-300" />
              ) : (
                <Building className="h-6 w-6 text-black dark:text-indigo-300" />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
              {isSignUp ? "Create Account" : "Sign In"}
            </h2>
            <p className="text-sm text-gray-600 dark:text-indigo-200">
              {selectedRole === "student" ? "Student" : "Employer"} Account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="name" className="text-white">
                  {selectedRole === "student" ? "Full Name" : "Contact Name"}
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="focus-ring"
                />
              </div>
            )}

            {isSignUp && selectedRole === "employer" && (
              <div>
                <Label htmlFor="company" className="text-white">Company Name</Label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                  className="focus-ring"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="focus-ring"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="focus-ring"
              />
            </div>

            {isSignUp && (
              <div>
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="focus-ring"
                />
              </div>
            )}

            <Button type="submit" className="w-full bg-black text-white dark:bg-indigo-700 dark:text-white rounded-lg py-2 mt-4 hover:bg-gray-900 dark:hover:bg-indigo-800 transition-colors">
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-caption text-muted-foreground hover:text-foreground transition-colors"
            >
              {isSignUp 
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;