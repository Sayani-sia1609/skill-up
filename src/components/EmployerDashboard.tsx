import { useState } from "react";
import { motion } from "framer-motion";
import type { UserProfile } from "../types/user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { 
  PlusCircle, 
  Filter, 
  Bell, 
  MessageSquare, 
  User, 
  Briefcase, 
  GraduationCap, 
  Star,
  Send,
  Bot,
  LogOut,
  Search,
  Sun,
  Moon,
  Building,
  Phone,
  Mail
} from "lucide-react";

interface EmployerDashboardProps {
  initialEmployerInfo?: UserProfile | null;
  onLogout: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

interface Candidate {
  id: number;
  name: string;
  jobPosition: string;
  skills: string[];
  gpa: number;
  projects: number;
  experience: number;
  matchPercent: number;
  cvScore: number;
  strengths: string[];
  weaknesses: string[];
  skillGap: number;
  status?: 'pending' | 'shortlisted' | 'waitlisted' | 'rejected';
}

// Mock data
const mockCandidates = [
  {
    id: 1,
    name: "Alice Chen",
    jobPosition: "Frontend Developer",
    skills: ["React", "TypeScript", "Node.js"],
    gpa: 8,
    projects: 12,
    experience: 2,
    matchPercent: 92,
    cvScore: 85,
    strengths: ["Strong technical skills", "Leadership experience", "Open source contributions"],
    weaknesses: ["Limited enterprise experience"],
    skillGap: 15
  },
  {
    id: 2,
    name: "Marcus Johnson",
    jobPosition: "Data Scientist",
    skills: ["Python", "Machine Learning", "AWS"],
    gpa: 7.9,
    projects: 8,
    experience: 1,
    matchPercent: 88,
    cvScore: 78,
    strengths: ["AI/ML expertise", "Research background", "Problem-solving skills"],
    weaknesses: ["New to industry practices"],
    skillGap: 22
  },
  {
    id: 3,
    name: "Sarah Kim",
    jobPosition: "Backend Engineer",
    skills: ["Java", "Spring", "Docker"],
    gpa: 3.9,
    projects: 15,
    experience: 3,
    matchPercent: 85,
    cvScore: 90,
    strengths: ["Backend expertise", "System design", "Mentoring experience"],
    weaknesses: ["Frontend skills could improve"],
    skillGap: 10
  },
  {
    id: 4,
    name: "Priya Singh",
    jobPosition: "UI/UX Designer",
    skills: ["Figma", "Sketch", "Adobe XD"],
    gpa: 8.5,
    projects: 10,
    experience: 2,
    matchPercent: 90,
    cvScore: 88,
    strengths: ["Creative design", "User research", "Prototyping"],
    weaknesses: ["Limited coding experience"],
    skillGap: 12
  },
  {
    id: 5,
    name: "David Lee",
    jobPosition: "DevOps Engineer",
    skills: ["AWS", "Docker", "Kubernetes"],
    gpa: 7.8,
    projects: 14,
    experience: 4,
    matchPercent: 87,
    cvScore: 82,
    strengths: ["Cloud infrastructure", "Automation", "CI/CD pipelines"],
    weaknesses: ["Needs more security training"],
    skillGap: 18
  }
];

const mockShortlisted = [
  mockCandidates[0],
  mockCandidates[3],
  mockCandidates[2],
  mockCandidates[4],
  mockCandidates[1]
];

const EmployerDashboard = ({ initialEmployerInfo = null, onLogout, darkMode, setDarkMode }: EmployerDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [employerInfo, setEmployerInfo] = useState<UserProfile | null>(initialEmployerInfo);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidateStatuses, setCandidateStatuses] = useState<Record<number, 'pending' | 'shortlisted' | 'waitlisted' | 'rejected'>>({});
  const [gpaRange, setGpaRange] = useState([3.0]);
  const [skillFilter, setSkillFilter] = useState("");
  const [messageInput, setMessageInput] = useState("");

  type NotificationType = 'application' | 'message' | 'system';
  interface Notification {
    id: number;
    title: string;
    time: string;
    type: NotificationType;
    read: boolean;
  }
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "Alice Chen applied to Frontend Developer", time: "2m ago", type: "application", read: false },
    { id: 2, title: "Priya Singh sent you a message", time: "25m ago", type: "message", read: false },
    { id: 3, title: "Your job post ‘Data Scientist’ is trending", time: "1h ago", type: "system", read: false },
    { id: 4, title: "Marcus Johnson updated resume", time: "3h ago", type: "application", read: true },
    { id: 5, title: "Interview with Sarah Kim tomorrow 10:00", time: "6h ago", type: "message", read: true },
  ]);
  const unreadCount = notifications.filter(n => !n.read).length;
  const markAsRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const clearNotifications = () => setNotifications([]);

  // Mock employer data if no initial info provided
  const employer = {
    name: employerInfo?.name || "John Doe",
    email: employerInfo?.email || "john.doe@company.com",
    company: employerInfo?.company || "TechCorp Industries",
    contactNumber: employerInfo?.contactNumber || "+1 (555) 123-4567",
    position: employerInfo?.position || "HR Manager",
  };

  // Handle candidate status changes
  const handleCandidateAction = (candidateId: number, status: 'shortlisted' | 'waitlisted' | 'rejected') => {
    setCandidateStatuses(prev => ({
      ...prev,
      [candidateId]: status
    }));
  };

  const CandidateCard = ({ candidate, isShortlisted = false }: { candidate: Candidate, isShortlisted?: boolean }) => {
    const status = candidateStatuses[candidate.id] || 'pending';
    
    // Determine card background color based on status
    const getCardClassName = () => {
      const baseClass = "transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md border rounded-xl p-0 overflow-hidden";
      switch (status) {
        case 'shortlisted':
          return `${baseClass} bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-300 dark:from-emerald-950/30 dark:to-green-950/30 dark:border-emerald-700/50`;
        case 'waitlisted':
          return `${baseClass} bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300 dark:from-amber-950/30 dark:to-yellow-950/30 dark:border-amber-700/50`;
        case 'rejected':
          return `${baseClass} bg-gradient-to-br from-rose-50 to-red-50 border-rose-300 dark:from-rose-950/30 dark:to-red-950/30 dark:border-rose-700/50`;
        default:
          return `${baseClass} bg-gradient-to-br from-slate-50 to-gray-50 border-slate-300 dark:from-slate-950/30 dark:to-gray-950/30 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600`;
      }
    };

    return (
    <Card className={getCardClassName()}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-xl flex items-center justify-center shadow-sm">
              <User className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg text-black dark:text-slate-100">{candidate.name}</h3>
              <div className="flex items-center gap-2 text-sm text-black dark:text-slate-400">
                <Briefcase className="h-4 w-4 text-indigo-500" />
                <span className="font-medium">Applied for: {candidate.jobPosition}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-black/80 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  <span>GPA {candidate.gpa}</span>
                </div>
                <span className="text-black/40 dark:text-slate-600">•</span>
                <span>{candidate.projects} projects</span>
                <span className="text-black/40 dark:text-slate-600">•</span>
                <span>{candidate.experience}y exp</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary" className="text-xs font-semibold px-3 py-1 bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-700">
              {candidate.matchPercent}% match
            </Badge>
            {status !== 'pending' && (
              <Badge 
                variant="outline" 
                className={`text-xs font-semibold px-3 py-1 ${
                  status === 'shortlisted' ? 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700' :
                  status === 'waitlisted' ? 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700' :
                  'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-700'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {candidate.skills.slice(0, 3).map((skill: string) => (
            <Badge key={skill} variant="outline" className="text-xs font-medium px-3 py-1 bg-white text-black border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
              {skill}
            </Badge>
          ))}
          {candidate.skills.length > 3 && (
            <Badge variant="outline" className="text-xs font-medium px-3 py-1 bg-white text-black/80 border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
              +{candidate.skills.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setSelectedCandidate(candidate)}
            className="text-black border-slate-400 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 font-medium"
          >
            View Details
          </Button>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={status === 'shortlisted' ? 'default' : 'outline'}
              className={status === 'shortlisted' 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm font-medium' 
                : 'text-emerald-600 border-emerald-300 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-600 dark:hover:bg-emerald-950/30 font-medium'
              }
              onClick={() => handleCandidateAction(candidate.id, 'shortlisted')}
            >
              Shortlist
            </Button>
            <Button 
              size="sm" 
              variant={status === 'waitlisted' ? 'default' : 'outline'}
              className={status === 'waitlisted' 
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm font-medium' 
                : 'text-amber-600 border-amber-300 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-600 dark:hover:bg-amber-950/30 font-medium'
              }
              onClick={() => handleCandidateAction(candidate.id, 'waitlisted')}
            >
              Waitlist
            </Button>
            <Button 
              size="sm" 
              variant={status === 'rejected' ? 'default' : 'outline'}
              className={status === 'rejected' 
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm font-medium' 
                : 'text-rose-600 border-rose-300 hover:bg-rose-50 dark:text-rose-400 dark:border-rose-600 dark:hover:bg-rose-950/30 font-medium'
              }
              onClick={() => handleCandidateAction(candidate.id, 'rejected')}
            >
              Reject
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
    );
  };

  return (
  <div className="min-h-screen bg-background">
      {/* Header */}
  <header className="border-b border-border bg-card text-card-foreground backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Employer Dashboard</h1>
              <p className="text-muted-foreground font-medium">Manage your talent pipeline</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="text-foreground hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all duration-200"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all duration-200 relative"
                    aria-label="Notifications"
                  >
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-1.5 py-0.5 rounded-full text-xs font-semibold shadow-sm">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-0 bg-popover text-popover-foreground border border-border shadow-xl rounded-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-border bg-popover">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Notifications</span>
                      <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20">
                        Mark all read
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-sm text-muted-foreground">You're all caught up!</div>
                    ) : (
                      notifications.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => markAsRead(n.id)}
                          className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors text-foreground ${
                            n.read
                              ? 'bg-card hover:bg-muted'
                              : 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/20 dark:hover:bg-amber-900/30'
                          } border-b border-border`}
                        >
                          <span className={`mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                            n.type === 'application' ? 'bg-emerald-500' : n.type === 'message' ? 'bg-indigo-500' : 'bg-slate-400'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{n.title}</p>
                            <span className="text-xs text-muted-foreground">{n.time}</span>
                          </div>
                          {!n.read && <span className="ml-2 mt-1 h-2 w-2 bg-rose-500 rounded-full" />}
                        </button>
                      ))
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-border bg-popover flex justify-end">
                    <Button variant="ghost" size="sm" onClick={clearNotifications} className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20">
                      Clear all
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-foreground hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

  <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-white dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 p-1.5 rounded-2xl shadow-lg shadow-slate-200/40 dark:shadow-slate-900/30">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:from-indigo-600 dark:data-[state=active]:to-purple-700 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium transition-all duration-300 rounded-xl"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="profile"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:from-indigo-600 dark:data-[state=active]:to-purple-700 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium transition-all duration-300 rounded-xl"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="post-job"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:from-indigo-600 dark:data-[state=active]:to-purple-700 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium transition-all duration-300 rounded-xl"
            >
              Post Job
            </TabsTrigger>
            <TabsTrigger 
              value="candidates"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:from-indigo-600 dark:data-[state=active]:to-purple-700 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium transition-all duration-300 rounded-xl"
            >
              Talent Pool
            </TabsTrigger>
            <TabsTrigger 
              value="messages"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:from-indigo-600 dark:data-[state=active]:to-purple-700 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium transition-all duration-300 rounded-xl"
            >
              Messages
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8 mt-8">
            {/* Notifications */}
            <Card className="bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/30 dark:shadow-slate-900/30 hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                    <Bell className="h-5 w-5 text-white" />
                  </div>
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-100 dark:from-emerald-950/40 dark:via-green-950/40 dark:to-emerald-900/40 rounded-xl border border-emerald-200/80 dark:border-emerald-700/30">
                    <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">5 new top-fit candidates today</span>
                    <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium shadow-sm">New</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-600/30">
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-300">3 candidates viewed your job post</span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium bg-slate-300/70 dark:bg-slate-700/50 px-2 py-1 rounded-lg">2h ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shortlisted Candidates */}
            <Card className="bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/30 dark:shadow-slate-900/30 hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
                  <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  Shortlisted Candidates ({mockShortlisted.length})
                </CardTitle>
                <CardDescription className="text-slate-700 dark:text-slate-400 font-medium">Your top candidate picks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700/50">
                        <th className="py-3 px-4 text-sm font-semibold text-slate-800 dark:text-slate-300">Rank</th>
                        <th className="py-3 px-4 text-sm font-semibold text-slate-800 dark:text-slate-300">Name</th>
                        <th className="py-3 px-4 text-sm font-semibold text-slate-800 dark:text-slate-300">Job Position</th>
                        <th className="py-3 px-4 text-sm font-semibold text-slate-800 dark:text-slate-300">Match %</th>
                        <th className="py-3 px-4 text-sm font-semibold text-slate-800 dark:text-slate-300">Projects</th>
                        <th className="py-3 px-4 text-sm font-semibold text-slate-800 dark:text-slate-300">Experience (yrs)</th>
                        <th className="py-3 px-4 text-sm font-semibold text-slate-800 dark:text-slate-300">CV Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockShortlisted
                        .sort((a, b) => b.matchPercent - a.matchPercent)
                        .map((candidate, idx) => (
                          <tr key={candidate.id} className="border-b border-slate-200 dark:border-slate-700/30 hover:bg-gradient-to-r hover:from-indigo-50/60 hover:to-purple-50/60 dark:hover:from-indigo-950/20 dark:hover:to-purple-950/20 transition-all duration-200">
                            <td className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400">{idx + 1}</td>
                            <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">{candidate.name}</td>
                            <td className="py-3 px-4 text-slate-800 dark:text-slate-300">{candidate.jobPosition}</td>
                            <td className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">{candidate.matchPercent}%</td>
                            <td className="py-3 px-4 text-slate-800 dark:text-slate-300">{candidate.projects}</td>
                            <td className="py-3 px-4 text-slate-800 dark:text-slate-300">{candidate.experience}</td>
                            <td className="py-3 px-4 font-semibold text-amber-600 dark:text-amber-400">{candidate.cvScore}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8 mt-8">
            <Card className="bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/30 dark:shadow-slate-900/30 hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  Employer Profile
                </CardTitle>
                <CardDescription className="text-slate-700 dark:text-slate-400 font-medium">Your company and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column - Personal Info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-100 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-indigo-950/30 rounded-2xl border border-indigo-300/60 dark:border-indigo-700/30">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <User className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">{employer.name}</h3>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{employer.position}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 border border-slate-300 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200">
                        <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
                          <Mail className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Email</p>
                          <p className="text-sm text-slate-700 dark:text-slate-400">{employer.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 border border-slate-300 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg">
                          <Phone className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Contact Number</p>
                          <p className="text-sm text-slate-700 dark:text-slate-400">{employer.contactNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Company Info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 dark:from-amber-950/30 dark:via-orange-950/30 dark:to-amber-950/30 rounded-2xl border border-amber-300/60 dark:border-amber-700/30">
                      <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Building className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">{employer.company}</h3>
                        <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">Company</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-6 border border-slate-300 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-800/50">
                        <p className="text-sm font-semibold mb-4 text-slate-900 dark:text-slate-100">Quick Stats</p>
                        <div className="grid grid-cols-2 gap-6 text-center">
                          <div>
                            <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">15</p>
                            <p className="text-xs text-slate-700 dark:text-slate-400 font-medium mt-1">Active Jobs</p>
                          </div>
                          <div>
                            <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">48</p>
                            <p className="text-xs text-slate-700 dark:text-slate-400 font-medium mt-1">Total Hires</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 border border-slate-300 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-800/50">
                        <p className="text-sm font-semibold mb-4 text-slate-900 dark:text-slate-100">Recent Activity</p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"></div>
                            <div className="text-xs text-slate-700 dark:text-slate-400">5 new applications today</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
                            <div className="text-xs text-slate-700 dark:text-slate-400">3 interviews scheduled</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"></div>
                            <div className="text-xs text-slate-700 dark:text-slate-400">2 job postings active</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-8 bg-gradient-to-r from-transparent via-slate-400 dark:via-slate-600 to-transparent h-px" />
                
                <div className="flex justify-end">
                  <Button variant="outline" className="border-indigo-400 dark:border-indigo-600 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 font-medium transition-all duration-200">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Post Job Tab */}
          <TabsContent value="post-job" className="space-y-8 mt-8">
            <Card className="bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/30 dark:shadow-slate-900/30 hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl">
                    <PlusCircle className="h-5 w-5 text-white" />
                  </div>
                  Post New Job
                </CardTitle>
                <CardDescription className="text-slate-700 dark:text-slate-400 font-medium">Create a new job posting to attract top talent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">Job Title</label>
                    <Input placeholder="e.g. Frontend Developer" className="border-slate-400 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">Location</label>
                    <Input placeholder="e.g. Remote, San Francisco" className="border-slate-400 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">Job Description</label>
                  <Textarea 
                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                    className="min-h-[120px] border-slate-400 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20"
                  />
                  <Button variant="outline" size="sm" className="mt-3 border-purple-400 dark:border-purple-600 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30">
                    <Bot className="h-4 w-4 mr-2" />
                    Enhance with AI
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">Required Skills</label>
                  <Input placeholder="e.g. React, TypeScript, Node.js (comma separated)" className="border-slate-400 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20" />
                </div>

                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Post Job
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Candidates Tab */}
          <TabsContent value="candidates" className="space-y-8 mt-8">
            {/* Filters */}
            <Card className="bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/30 dark:shadow-slate-900/30 hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                    <Filter className="h-5 w-5 text-white" />
                  </div>
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">Skills</label>
                    <Select value={skillFilter} onValueChange={setSkillFilter}>
                      <SelectTrigger className="border-slate-400 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400">
                        <SelectValue placeholder="Filter by skill" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-slate-100" htmlFor="gpa-input">Minimum GPA</label>
                    <Input
                      id="gpa-input"
                      type="number"
                      min={0}
                      max={4}
                      step={0.01}
                      value={gpaRange[0]}
                      onChange={e => setGpaRange([parseFloat(e.target.value)])}
                      className="w-40 border-slate-400 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">Experience Level</label>
                    <Select>
                      <SelectTrigger className="border-slate-400 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400">
                        <SelectValue placeholder="Any experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                        <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Candidate Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCandidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-8 mt-8">
            <Card className="bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/30 dark:shadow-slate-900/30 hover:shadow-2xl transition-all duration-300 rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
                  <div className="p-2 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  Messages
                </CardTitle>
                <CardDescription className="text-slate-700 dark:text-slate-400 font-medium">Communicate with candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Message Thread */}
                  <div className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-800/50 rounded-2xl p-6 space-y-4 border border-slate-300 dark:border-slate-700/50">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-md">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-300 dark:border-slate-700/50">
                          <p className="text-sm text-slate-800 dark:text-slate-300">Hi! I'm very interested in the Frontend Developer position. Could you tell me more about the tech stack?</p>
                        </div>
                        <span className="text-xs text-slate-600 dark:text-slate-400 mt-2 block font-medium">Alice Chen • 2h ago</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Suggested Responses */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">AI-Suggested Quick Responses</label>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" className="border-purple-400 dark:border-purple-600 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30">
                        <Bot className="h-3 w-3 mr-2" />
                        "We use React, TypeScript, and Next.js..."
                      </Button>
                      <Button variant="outline" size="sm" className="border-indigo-400 dark:border-indigo-600 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30">
                        <Bot className="h-3 w-3 mr-2" />
                        "Would you like to schedule a call?"
                      </Button>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex gap-3">
                    <Input 
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-1 border-slate-400 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20"
                    />
                    <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Candidate Details Modal */}
      {selectedCandidate && (
        <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
          <DialogContent className="max-w-2xl bg-white dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">{selectedCandidate.name}</span>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                    {selectedCandidate.matchPercent}% match for your role
                  </p>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-8">
              {/* CV Score Breakdown */}
              <div>
                <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">CV Score Breakdown</h3>
                <div className="bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Overall Score</span>
                    <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">{selectedCandidate.cvScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-1000 shadow-sm" 
                      style={{ width: `${selectedCandidate.cvScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4 text-emerald-600 dark:text-emerald-400">Strengths</h3>
                  <ul className="space-y-3">
                    {selectedCandidate.strengths.map((strength: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-amber-600 dark:text-amber-400">Areas to Develop</h3>
                  <ul className="space-y-3">
                    {selectedCandidate.weaknesses.map((weakness: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Skill Gap */}
              <div>
                <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Skill Gap Analysis</h3>
                <div className="bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Missing Skills</span>
                    <span className="text-sm font-bold text-rose-600 dark:text-rose-400">{selectedCandidate.skillGap}% gap</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Candidate matches <span className="font-semibold text-emerald-600 dark:text-emerald-400">{100 - selectedCandidate.skillGap}%</span> of required skills for this role.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setSelectedCandidate(null)} className="border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                  Close
                </Button>
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EmployerDashboard
