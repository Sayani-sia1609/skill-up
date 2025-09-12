import { useState } from "react";
import StudentInfoForm from "./StudentInfoForm";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Upload, Search, FileText, Settings, LogOut, Sun, Moon } from "lucide-react";
import { Pencil, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface StudentDashboardProps {
  onNavigateToSwipe: () => void;
  onLogout: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const StudentDashboard = ({ onNavigateToSwipe, onLogout, darkMode, setDarkMode }: StudentDashboardProps) => {
  const navigate = typeof useNavigate === 'function' ? useNavigate() : null;
  // Student info state
  const [studentInfo, setStudentInfo] = useState(null);
  const [avatar, setAvatar] = useState("https://ui-avatars.com/api/?name=Alex+Johnson&background=06B6D4&color=fff");
  // Helper to check if avatar is default
  const isDefaultAvatar = avatar === "https://ui-avatars.com/api/?name=Alex+Johnson&background=06B6D4&color=fff";
  // Handler for back button
  const handleBack = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    } else if (navigate) {
      navigate(-1);
    } else {
      window.history.back();
    }
  };
  const [profileComplete, setProfileComplete] = useState(75);
  const [hasResume, setHasResume] = useState(false);
  // My skills (shorter list)
  const mySkills = [
    "Python",
    "React",
    "UI/UX Design",
    "SQL"
  ];
  // In-demand market skills
  const inDemandSkills = [
    "TypeScript",
    "JavaScript",
    "Data Analysis",
    "Cloud Computing",
    "Machine Learning",
    "Cybersecurity"
  ];
  const [domains, setDomains] = useState(["Frontend Development", "UI/UX Design", "Machine Learning"]);
  const [newDomain, setNewDomain] = useState("");

  // Removed skill add/remove handlers

  // Example user details
  const user = {
    name: studentInfo?.name || "Student",
    email: studentInfo?.email || "",
    avatar: avatar,
    university: studentInfo?.institute || "",
    major: "",
    year: "",
    applications: 12,
    interviews: 3,
    offers: 1,
  };

  // Experience state
  const [experiences, setExperiences] = useState([
    { role: "Frontend Intern", company: "TechCorp", year: "2024" },
    { role: "UI Designer", company: "DesignStudio", year: "2023" }
  ]);
  const [newExp, setNewExp] = useState({ role: "", company: "", year: "" });

  // Handler for avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler for resume upload
  // Handler for resume upload
  // Handler for resume upload
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setHasResume(true);
      setProfileComplete(100); // Always set to 100% after resume upload
    }
  };

  // Trigger file input click when button is pressed
  const triggerResumeInput = () => {
    const input = document.getElementById("resume-upload") as HTMLInputElement;
    if (input) input.click();
  };

  // Removed skill add handler

  // Domain handlers
  const handleAddDomain = () => {
    const domain = newDomain.trim();
    if (domain && !domains.includes(domain)) {
      setDomains([...domains, domain]);
      setNewDomain("");
    }
  };
  const handleRemoveDomain = (domain: string) => {
    setDomains(domains.filter(d => d !== domain));
  };

  // Experience handlers
  const handleAddExperience = () => {
    if (newExp.role && newExp.company && newExp.year) {
      setExperiences([...experiences, newExp]);
      setNewExp({ role: "", company: "", year: "" });
    }
  };
  const handleRemoveExperience = (idx: number) => {
    setExperiences(experiences.filter((_, i) => i !== idx));
  };

  // Show info form if not filled
  if (!studentInfo) {
    return <StudentInfoForm onSubmit={setStudentInfo} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex gap-8 relative">
      {/* Back Button - top left corner, icon only */}
      <div style={{ position: 'fixed', top: 24, left: 24, zIndex: 50 }}>
        <Button variant="ghost" size="icon" onClick={handleBack} aria-label="Back">
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>
      {/* Theme Toggle Button - top right corner, same as Landing page */}
      <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 50 }}>
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
      {/* Mini Profile Sidebar */}
      <aside className="w-72 shrink-0 hidden md:block">
        <Card className="p-6 flex flex-col items-center text-center">
          <label htmlFor="avatar-upload" className="cursor-pointer relative">
            <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full mb-3 border-2 border-card object-cover" />
            {isDefaultAvatar && (
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-20 h-20">
                <Pencil className="w-6 h-6 text-muted-foreground bg-background/80 rounded-full p-1" />
              </span>
            )}
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
            <span className="block text-xs text-muted-foreground mb-2">Change Picture</span>
          </label>
          <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
          <p className="text-caption text-muted-foreground mb-2">{user.email}</p>
          <div className="mb-2">
            <span className="text-caption font-medium">{studentInfo.institute}</span>
            <span className="block text-small text-muted-foreground">{studentInfo.educationLevel}, Grade: {studentInfo.grade}</span>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <div className="text-center">
              <span className="font-bold text-lg text-foreground">{user.applications}</span>
              <div className="text-small text-muted-foreground">Applications</div>
            </div>
            <div className="text-center">
              <span className="font-bold text-lg text-foreground">{user.interviews}</span>
              <div className="text-small text-muted-foreground">Interviews</div>
            </div>
            <div className="text-center">
              <span className="font-bold text-lg text-foreground">{user.offers}</span>
              <div className="text-small text-muted-foreground">Offers</div>
            </div>
          </div>
          {/* Experience section removed from sidebar. Only in main profile card. */}
        </Card>
      </aside>
      <div className="flex-1 space-y-6">
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
            <Button className="w-full bg-accent text-accent-foreground">
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
            <input
              id="resume-upload"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleResumeUpload}
            />
            <Button 
              variant="outline" 
              className="w-full focus-ring"
              onClick={triggerResumeInput}
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
                  <div className="flex items-center space-x-2">
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

        {/* Profile Summary & Editable Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h3 className="font-medium mb-4">Your Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-caption font-medium mb-2">My Skills</h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {mySkills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-caption font-medium mb-2">In-Demand Skills</h4>
                <div className="mb-2 text-muted-foreground">
                  <ul className="list-disc pl-4">
                    {inDemandSkills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-caption font-medium mb-2">Avatar</h4>
              <div className="flex gap-4 items-center">
                {studentInfo.avatar && (
                  <img src={studentInfo.avatar} alt="Avatar" className="w-16 h-16 rounded-full border" />
                )}
                {studentInfo.customAvatar && (
                  <img src={URL.createObjectURL(studentInfo.customAvatar)} alt="Custom Avatar" className="w-16 h-16 rounded-full border" />
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;