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
  onAuthComplete: () => void;
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
    onAuthComplete();
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 p-2 hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="text-center">
            <h2 className="text-hero mb-2">Choose Your Role</h2>
            <p className="text-body text-muted-foreground">
              Select how you'll be using the platform
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <motion.button
              onClick={() => handleRoleSelect("student")}
              className="card-surface p-6 text-left interactive-card focus-ring"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium">Student</h3>
                  <p className="text-caption text-muted-foreground">
                    Find your perfect internship
                  </p>
                </div>
              </div>
            </motion.button>

            <motion.button
              onClick={() => handleRoleSelect("employer")}
              className="card-surface p-6 text-left interactive-card focus-ring"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Building className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium">Employer</h3>
                  <p className="text-caption text-muted-foreground">
                    Discover talented interns
                  </p>
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Button
          variant="ghost"
          onClick={() => setSelectedRole(null)}
          className="mb-4 p-2 hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="p-6">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              {selectedRole === "student" ? (
                <User className="h-6 w-6 text-accent" />
              ) : (
                <Building className="h-6 w-6 text-accent" />
              )}
            </div>
            <h2 className="text-hero mb-2">
              {isSignUp ? "Create Account" : "Sign In"}
            </h2>
            <p className="text-caption text-muted-foreground">
              {selectedRole === "student" ? "Student" : "Employer"} Account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="name">
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
                <Label htmlFor="company">Company Name</Label>
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
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">Password</Label>
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
                <Label htmlFor="confirmPassword">Confirm Password</Label>
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

            <Button type="submit" className="w-full btn-hero">
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