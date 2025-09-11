import { useState } from "react";
import { motion } from "framer-motion";
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
  Moon
} from "lucide-react";

interface EmployerDashboardProps {
  onLogout: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

// Mock data
const mockCandidates = [
  {
    id: 1,
    name: "Alice Chen",
    skills: ["React", "TypeScript", "Node.js"],
    gpa: 3.8,
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
    skills: ["Python", "Machine Learning", "AWS"],
    gpa: 3.6,
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
    skills: ["Java", "Spring", "Docker"],
    gpa: 3.9,
    projects: 15,
    experience: 3,
    matchPercent: 85,
    cvScore: 90,
    strengths: ["Backend expertise", "System design", "Mentoring experience"],
    weaknesses: ["Frontend skills could improve"],
    skillGap: 10
  }
];

const mockShortlisted = [
  mockCandidates[0],
  mockCandidates[2]
];

const EmployerDashboard = ({ onLogout, darkMode, setDarkMode }: EmployerDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [gpaRange, setGpaRange] = useState([3.0]);
  const [skillFilter, setSkillFilter] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const CandidateCard = ({ candidate, isShortlisted = false }: { candidate: any, isShortlisted?: boolean }) => (
    <Card className="card-surface hover:card-elevated transition-all duration-smooth cursor-pointer group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{candidate.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>GPA {candidate.gpa}</span>
                <span>•</span>
                <span>{candidate.projects} projects</span>
                <span>•</span>
                <span>{candidate.experience}y exp</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs font-medium">
            {candidate.matchPercent}% match
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {candidate.skills.slice(0, 3).map((skill: string) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {candidate.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{candidate.skills.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button 
            variant="outline" Badge
            size="sm"
            onClick={() => setSelectedCandidate(candidate)}
          >
            View Details
          </Button>
          {!isShortlisted && (
            <Button size="sm" className="btn-accent">
              Shortlist
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
  <div className="min-h-screen bg-background">
      {/* Header */}
  <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Employer Dashboard</h1>
              <p className="text-muted-foreground">Manage your talent pipeline</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="text-foreground"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground dark:text-destructive-foreground dark:bg-destructive/20 dark:hover:bg-destructive/40"
              >
                <Bell className="h-4 w-4 mr-2" />
                <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs ml-1">
                  5
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-foreground dark:text-destructive-foreground dark:bg-destructive/20 dark:hover:bg-destructive/40"
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="post-job">Post Job</TabsTrigger>
            <TabsTrigger value="candidates">Talent Pool</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Notifications */}
            <Card className="card-surface">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                    <span className="text-sm">5 new top-fit candidates today</span>
                    <Badge>New</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">3 candidates viewed your job post</span>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shortlisted Candidates */}
            <Card className="card-surface">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Shortlisted Candidates ({mockShortlisted.length})
                </CardTitle>
                <CardDescription>Your top candidate picks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockShortlisted.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} isShortlisted />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Post Job Tab */}
          <TabsContent value="post-job" className="space-y-6">
            <Card className="card-surface">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Post New Job
                </CardTitle>
                <CardDescription>Create a new job posting to attract top talent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Title</label>
                    <Input placeholder="e.g. Frontend Developer" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input placeholder="e.g. Remote, San Francisco" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Description</label>
                  <Textarea 
                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                    className="min-h-[120px]"
                  />
                  <Button variant="outline" size="sm" className="mt-2">
                    <Bot className="h-4 w-4 mr-2" />
                    Enhance with AI
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Required Skills</label>
                  <Input placeholder="e.g. React, TypeScript, Node.js (comma separated)" />
                </div>

                <Button className="w-full btn-accent">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Post Job
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Candidates Tab */}
          <TabsContent value="candidates" className="space-y-6">
            {/* Filters */}
            <Card className="card-surface">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Skills</label>
                    <Select value={skillFilter} onValueChange={setSkillFilter}>
                      <SelectTrigger>
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
                    <label className="text-sm font-medium" htmlFor="gpa-input">Minimum GPA</label>
                    <Input
                      id="gpa-input"
                      type="number"
                      min={0}
                      max={4}
                      step={0.01}
                      value={gpaRange[0]}
                      onChange={e => setGpaRange([parseFloat(e.target.value)])}
                      className="w-40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Experience Level</label>
                    <Select>
                      <SelectTrigger>
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
          <TabsContent value="messages" className="space-y-6">
            <Card className="card-surface">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Messages
                </CardTitle>
                <CardDescription>Communicate with candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Message Thread */}
                  <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-card p-3 rounded-lg">
                          <p className="text-sm">Hi! I'm very interested in the Frontend Developer position. Could you tell me more about the tech stack?</p>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1 block">Alice Chen • 2h ago</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Suggested Responses */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">AI-Suggested Quick Responses</label>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Bot className="h-3 w-3 mr-1" />
                        "We use React, TypeScript, and Next.js..."
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bot className="h-3 w-3 mr-1" />
                        "Would you like to schedule a call?"
                      </Button>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}on>
                      className="flex-1"
                    />
                    <Button size="sm" className="btn-accent">
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
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span>{selectedCandidate.name}</span>
                  <p className="text-sm text-muted-foreground font-normal">
                    {selectedCandidate.matchPercent}% match for your role
                  </p>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* CV Score Breakdown */}
              <div>
                <h3 className="font-semibold mb-3">CV Score Breakdown</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Overall Score</span>
                    <span className="font-semibold">{selectedCandidate.cvScore}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-smooth" 
                      style={{ width: `${selectedCandidate.cvScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-3 text-green-600">Strengths</h3>
                  <ul className="space-y-2">
                    {selectedCandidate.strengths.map((strength: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-amber-600">Areas to Develop</h3>
                  <ul className="space-y-2">
                    {selectedCandidate.weaknesses.map((weakness: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Skill Gap */}
              <div>
                <h3 className="font-semibold mb-3">Skill Gap Analysis</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Missing Skills</span>
                    <span className="text-sm font-semibold">{selectedCandidate.skillGap}% gap</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Candidate matches {100 - selectedCandidate.skillGap}% of required skills for this role.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedCandidate(null)}>
                  Close
                </Button>
                <Button className="btn-accent">
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
