import { useState } from "react";
import { motion } from "framer-motion";
import { User, Upload, Search, FileText, Settings, LogOut, Sun, Moon } from "lucide-react";
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
  const [profileComplete, setProfileComplete] = useState(75);
  const [hasResume, setHasResume] = useState(false);
  const [skills, setSkills] = useState(["React", "TypeScript", "Python", "CSS", "JavaScript"]);
  const [newSkill, setNewSkill] = useState("");
  const [domains, setDomains] = useState(["Frontend Development", "UI/UX Design", "Machine Learning"]);
  const [newDomain, setNewDomain] = useState("");

  const handleAddDomain = () => {
    if (newDomain.trim() && !domains.includes(newDomain.trim())) {
      setDomains([...domains, newDomain.trim()]);
      setNewDomain("");
    }
  };

  const handleRemoveDomain = (domain: string) => {
    setDomains(domains.filter(d => d !== domain));
  };

  const handleResumeUpload = () => {
    // Simulate resume upload
    setHasResume(true);
    setProfileComplete(90);
  };

  // Example user details
  const [avatar, setAvatar] = useState("https://ui-avatars.com/api/?name=Alex+Johnson&background=06B6D4&color=fff");
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar,
    university: "IIT Bombay",
    major: "Computer Science",
    year: "3rd Year",
    applications: 12,
    interviews: 3,
    offers: 1
  };

  // Experience state
  const [experiences, setExperiences] = useState([
    { role: "Frontend Intern", company: "TechCorp", year: "2024" },
    { role: "UI Designer", company: "DesignStudio", year: "2023" }
  ]);
  const [newExp, setNewExp] = useState({ role: "", company: "", year: "" });

  const handleAddExperience = () => {
    if (newExp.role && newExp.company && newExp.year) {
      setExperiences([...experiences, newExp]);
      setNewExp({ role: "", company: "", year: "" });
    }
  };

  const handleRemoveExperience = (idx: number) => {
    setExperiences(experiences.filter((_, i) => i !== idx));
  };

  // Avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="text-foreground"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 flex gap-8">
        {/* Mini Profile Sidebar */}
        <aside className="w-72 shrink-0 hidden md:block">
          <Card className="p-6 flex flex-col items-center text-center">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full mb-3 border-2 border-accent object-cover" />
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
              <span className="text-caption font-medium">{user.university}</span>
              <span className="block text-small text-muted-foreground">{user.major}, {user.year}</span>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <div className="text-center">
                <span className="font-bold text-lg">{user.applications}</span>
                <div className="text-small text-muted-foreground">Applications</div>
              </div>
              <div className="text-center">
                <span className="font-bold text-lg">{user.interviews}</span>
                <div className="text-small text-muted-foreground">Interviews</div>
              </div>
              <div className="text-center">
                <span className="font-bold text-lg">{user.offers}</span>
                <div className="text-small text-muted-foreground">Offers</div>
              </div>
            </div>
            <div className="mt-6 w-full">
              <h4 className="text-caption font-medium mb-2">Experience</h4>
              <ul className="space-y-2 mb-2">
                {experiences.map((exp, idx) => (
                  <li key={idx} className="flex justify-between items-center text-left bg-muted rounded px-2 py-1">
                    <span className="text-sm">{exp.role} <span className="text-muted-foreground">@ {exp.company} ({exp.year})</span></span>
                    <button
                      type="button"
                      className="ml-2 text-xs text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveExperience(idx)}
                      aria-label={`Remove experience ${exp.role}`}
                    >×</button>
                  </li>
                ))}
              </ul>
              <div className="flex gap-1 mt-2">
                <input
                  type="text"
                  value={newExp.role}
                  onChange={e => setNewExp({ ...newExp, role: e.target.value })}
                  placeholder="Role"
                  className="border border-border rounded px-2 py-1 text-xs focus-ring w-1/3"
                />
                <input
                  type="text"
                  value={newExp.company}
                  onChange={e => setNewExp({ ...newExp, company: e.target.value })}
                  placeholder="Company"
                  className="border border-border rounded px-2 py-1 text-xs focus-ring w-1/3"
                />
                <input
                  type="text"
                  value={newExp.year}
                  onChange={e => setNewExp({ ...newExp, year: e.target.value })}
                  placeholder="Year"
                  className="border border-border rounded px-2 py-1 text-xs focus-ring w-1/4"
                />
                <Button size="sm" variant="outline" onClick={handleAddExperience} className="text-xs">Add</Button>
              </div>
            </div>
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
                <h4 className="text-caption font-medium mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        className="ml-1 text-xs text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveSkill(skill)}
                        aria-label={`Remove ${skill}`}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    placeholder="Add a skill..."
                    className="border border-border rounded px-2 py-1 text-sm focus-ring"
                  />
                  <Button size="sm" variant="outline" onClick={handleAddSkill} className="text-xs">Add</Button>
                </div>
              </div>
              <div>
                <h4 className="text-caption font-medium mb-2">Domains</h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {domains.map(domain => (
                    <Badge key={domain} variant="outline" className="flex items-center gap-1">
                      {domain}
                      <button
                        type="button"
                        className="ml-1 text-xs text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveDomain(domain)}
                        aria-label={`Remove ${domain}`}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newDomain}
                    onChange={e => setNewDomain(e.target.value)}
                    placeholder="Add a domain..."
                    className="border border-border rounded px-2 py-1 text-sm focus-ring"
                  />
                  <Button size="sm" variant="outline" onClick={handleAddDomain} className="text-xs">Add</Button>
                </div>
              </div>
            </div>
            {/* Experience Section Below Skills & Domains */}
            <div className="mt-8">
              <h4 className="text-caption font-medium mb-2">Experience</h4>
              <ul className="space-y-2 mb-2">
                {experiences.map((exp, idx) => (
                  <li key={idx} className="flex justify-between items-center text-left bg-muted rounded px-2 py-1">
                    <span className="text-sm">{exp.role} <span className="text-muted-foreground">@ {exp.company} ({exp.year})</span></span>
                    <button
                      type="button"
                      className="ml-2 text-xs text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveExperience(idx)}
                      aria-label={`Remove experience ${exp.role}`}
                    >×</button>
                  </li>
                ))}
              </ul>
              <div className="flex gap-1 mt-2">
                <input
                  type="text"
                  value={newExp.role}
                  onChange={e => setNewExp({ ...newExp, role: e.target.value })}
                  placeholder="Role"
                  className="border border-border rounded px-2 py-1 text-xs focus-ring w-1/3"
                />
                <input
                  type="text"
                  value={newExp.company}
                  onChange={e => setNewExp({ ...newExp, company: e.target.value })}
                  placeholder="Company"
                  className="border border-border rounded px-2 py-1 text-xs focus-ring w-1/3"
                />
                <input
                  type="text"
                  value={newExp.year}
                  onChange={e => setNewExp({ ...newExp, year: e.target.value })}
                  placeholder="Year"
                  className="border border-border rounded px-2 py-1 text-xs focus-ring w-1/4"
                />
                <Button size="sm" variant="outline" onClick={handleAddExperience} className="text-xs">Add</Button>
              </div>
            </div>
          </Card>
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;