import { useState } from "react";
import { motion } from "framer-motion";
import { User, Upload, Search, FileText, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface StudentDashboardProps {
  onNavigateToSwipe: () => void;
  onLogout: () => void;
}

const StudentDashboard = ({ onNavigateToSwipe, onLogout }: StudentDashboardProps) => {
  const [profileComplete, setProfileComplete] = useState(75);
  const [hasResume, setHasResume] = useState(false);

  const handleResumeUpload = () => {
    // Simulate resume upload
    setHasResume(true);
    setProfileComplete(90);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-accent" />
            </div>
            <h1 className="font-medium">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h2 className="text-hero">Welcome back, Alex!</h2>
          <p className="text-body text-muted-foreground">
            Ready to find your next opportunity?
          </p>
        </motion.div>

        {/* Profile Completion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Profile Completion</h3>
              <span className="text-caption text-muted-foreground">{profileComplete}%</span>
            </div>
            <Progress value={profileComplete} className="mb-4" />
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Basic Info ✓</Badge>
              <Badge variant="secondary">Skills ✓</Badge>
              <Badge variant="secondary">Education ✓</Badge>
              {hasResume ? (
                <Badge variant="secondary">Resume ✓</Badge>
              ) : (
                <Badge variant="outline">Resume Missing</Badge>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Swipe Jobs */}
          <Card className="p-6 interactive-card cursor-pointer" onClick={onNavigateToSwipe}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Search className="h-6 w-6 text-accent" />
              </div>
              <Badge className="match-badge">3 New</Badge>
            </div>
            <h3 className="font-medium mb-2">Swipe Jobs</h3>
            <p className="text-caption text-muted-foreground mb-4">
              Discover new internship opportunities matched to your profile
            </p>
            <Button className="w-full btn-accent">
              Start Swiping
            </Button>
          </Card>

          {/* Resume Upload */}
          <Card className="p-6 interactive-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              {hasResume && <Badge variant="secondary">✓ Uploaded</Badge>}
            </div>
            <h3 className="font-medium mb-2">Resume</h3>
            <p className="text-caption text-muted-foreground mb-4">
              {hasResume 
                ? "Update your resume to improve matches"
                : "Upload your resume to get better matches"
              }
            </p>
            <Button 
              variant="outline" 
              className="w-full focus-ring"
              onClick={handleResumeUpload}
            >
              <Upload className="h-4 w-4 mr-2" />
              {hasResume ? "Update Resume" : "Upload Resume"}
            </Button>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                    <span className="text-small text-green-600">92%</span>
                  </div>
                  <div>
                    <p className="text-caption font-medium">Frontend Developer Intern</p>
                    <p className="text-small text-muted-foreground">TechCorp • Liked</p>
                  </div>
                </div>
                <span className="text-small text-muted-foreground">2h ago</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-small text-muted-foreground">77%</span>
                  </div>
                  <div>
                    <p className="text-caption font-medium">Data Science Intern</p>
                    <p className="text-small text-muted-foreground">DataFlow • Passed</p>
                  </div>
                </div>
                <span className="text-small text-muted-foreground">1d ago</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                    <span className="text-small text-green-600">85%</span>
                  </div>
                  <div>
                    <p className="text-caption font-medium">UX Design Intern</p>
                    <p className="text-small text-muted-foreground">DesignStudio • Liked</p>
                  </div>
                </div>
                <span className="text-small text-muted-foreground">2d ago</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h3 className="font-medium mb-4">Your Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-caption font-medium mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">CSS</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                </div>
              </div>
              <div>
                <h4 className="text-caption font-medium mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Frontend Development</Badge>
                  <Badge variant="outline">UI/UX Design</Badge>
                  <Badge variant="outline">Machine Learning</Badge>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;