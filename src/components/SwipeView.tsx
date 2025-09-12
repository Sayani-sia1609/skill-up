import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Heart, X, Info, MapPin, Calendar, DollarSign, ArrowLeft } from "lucide-react";
import { FileText, ClipboardList, Bell } from "lucide-react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  compensation: string;
  description: string;
  skills: string[];
  matchPercentage: number;
  matchReason: string;
}

interface SwipeViewProps {
  onBack: () => void;
}

// Mock job data
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "TechCorp",
    location: "San Francisco, CA",
    duration: "3 months",
    compensation: "$2,000/month",
    description: "Join our frontend team to build beautiful user interfaces using React and TypeScript. You'll work on real products used by thousands of users.",
    skills: ["React", "TypeScript", "CSS", "JavaScript"],
    matchPercentage: 92,
    matchReason: "Strong match: React, TypeScript experience. Missing: Node.js"
  },
  {
    id: "2",
    title: "Data Science Intern",
    company: "DataFlow",
    location: "Remote",
    duration: "4 months",
    compensation: "$2,500/month",
    description: "Work with machine learning models and analyze large datasets to derive business insights.",
    skills: ["Python", "Machine Learning", "SQL", "Pandas"],
    matchPercentage: 77,
    matchReason: "Good match: Python skills. Missing: SQL, Statistics background"
  },
  {
    id: "3",
    title: "UX Design Intern",
    company: "DesignStudio",
    location: "New York, NY",
    duration: "3 months",
    compensation: "$1,800/month",
    description: "Create user-centered designs and prototypes for mobile and web applications.",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    matchPercentage: 85,
    matchReason: "Strong match: Design skills, Figma. Missing: User research experience"
  },
  {
    id: "4",
    title: "Backend Developer Intern",
    company: "FinTechX",
    location: "Bangalore, India",
    duration: "6 months",
    compensation: "$2,200/month",
    description: "Work on scalable backend systems using Node.js and MongoDB. Collaborate with product teams to deliver robust APIs.",
    skills: ["Node.js", "MongoDB", "Express", "REST APIs"],
    matchPercentage: 88,
    matchReason: "Strong match: Node.js, REST APIs. Missing: Docker experience"
  },
  {
    id: "5",
    title: "Mobile App Developer Intern",
    company: "Appify",
    location: "Remote",
    duration: "4 months",
    compensation: "$2,000/month",
    description: "Help build cross-platform mobile apps using React Native. Work closely with designers and QA.",
    skills: ["React Native", "JavaScript", "Redux", "Testing"],
    matchPercentage: 80,
    matchReason: "Good match: React Native, Redux. Missing: Native iOS/Android experience"
  },
  {
    id: "6",
    title: "Cloud Engineering Intern",
    company: "Cloudify",
    location: "Hyderabad, India",
    duration: "5 months",
    compensation: "$2,400/month",
    description: "Assist in deploying and managing cloud infrastructure on AWS and Azure. Automate CI/CD pipelines.",
    skills: ["AWS", "Azure", "CI/CD", "Terraform"],
    matchPercentage: 75,
    matchReason: "Decent match: AWS, CI/CD. Missing: Azure, Terraform experience"
  },
  {
    id: "7",
    title: "Product Management Intern",
    company: "InnovateNow",
    location: "Delhi, India",
    duration: "3 months",
    compensation: "$1,900/month",
    description: "Support product managers in market research, user interviews, and feature prioritization.",
    skills: ["Market Research", "User Interviews", "Agile", "Roadmapping"],
    matchPercentage: 70,
    matchReason: "Decent match: Market Research, Agile. Missing: Roadmapping experience"
  }
];

const SwipeView = ({ onBack }: SwipeViewProps) => {
  const [jobs, setJobs] = useState(mockJobs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showJobDetail, setShowJobDetail] = useState(false);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);

  const currentJob = jobs[currentIndex];

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const direction = info.offset.x > threshold ? "right" : info.offset.x < -threshold ? "left" : null;
    if (direction) {
      x.set(direction === "right" ? 300 : -300);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % jobs.length);
        x.set(0);
      }, 200);
    } else {
      x.set(0);
    }
  };

  const handleSwipe = (direction: "left" | "right") => {
    x.set(direction === "right" ? 300 : -300);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % jobs.length);
      x.set(0);
    }, 200);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handleSwipe("left");
    } else if (e.key === "ArrowRight") {
      handleSwipe("right");
    } else if (e.key === "Space" || e.key === " ") {
      e.preventDefault();
      setShowJobDetail(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Remove end-of-cards message, cards now loop

  // Remove blank page bug: don't return null if currentJob is undefined

  return (
    <div className="min-h-screen bg-background flex flex-row">
      {/* Dashboard Sidebar - always visible on the left */}
      <aside className="w-80 h-full bg-card border-r border-border p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" onClick={onBack} className="p-2 h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="font-semibold text-lg">Dashboard</h2>
        </div>
        {/* Resume Section */}
        <section>
          <h3 className="font-medium mb-2 flex items-center gap-2"><FileText className="h-5 w-5 text-muted-foreground" /> Resume</h3>
          <div className="bg-muted rounded p-3 mb-2">Upload or update your resume to improve job matches.</div>
          <Button variant="outline" className="w-full">Upload Resume</Button>
        </section>
        {/* Previous Applications Section */}
        <section>
          <h3 className="font-medium mb-2 flex items-center gap-2"><ClipboardList className="h-5 w-5 text-muted-foreground" /> Previous Applications</h3>
          <ul className="space-y-2">
            <li className="bg-muted rounded px-3 py-2 flex justify-between items-center">
              <span>Frontend Developer Intern</span>
              <span className="text-xs text-muted-foreground">TechCorp</span>
            </li>
            <li className="bg-muted rounded px-3 py-2 flex justify-between items-center">
              <span>Data Science Intern</span>
              <span className="text-xs text-muted-foreground">DataFlow</span>
            </li>
            <li className="bg-muted rounded px-3 py-2 flex justify-between items-center">
              <span>UX Design Intern</span>
              <span className="text-xs text-muted-foreground">DesignStudio</span>
            </li>
          </ul>
        </section>
        {/* Notifications Section */}
        <section>
          <h3 className="font-medium mb-2 flex items-center gap-2"><Bell className="h-5 w-5 text-muted-foreground" /> Notifications</h3>
          <ul className="space-y-2">
            <li className="bg-accent/10 rounded px-3 py-2 text-accent">Interview scheduled for Frontend Developer Intern</li>
            <li className="bg-accent/10 rounded px-3 py-2 text-accent">New offer from DataFlow</li>
            <li className="bg-accent/10 rounded px-3 py-2 text-accent">Profile viewed by DesignStudio</li>
          </ul>
        </section>
      </aside>

      {/* Swipe Area */}
  <div className="flex-1 flex items-center justify-center py-8 relative overflow-hidden">
        <div className="relative w-full max-w-sm">
          {/* Current Card */}
          <motion.div
            className="swipe-card w-full"
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileTap={{ scale: 0.95 }}
          >
            {/* Match Badge */}
            <div className="flex justify-between items-start mb-4">
              <div className="match-badge">
                {currentJob.matchPercentage}% match
              </div>
            </div>

            {/* Job Info */}
            <div className="space-y-4">
              <div>
                <h2 className="text-hero mb-1">{currentJob.title}</h2>
                <p className="font-medium text-muted-foreground">{currentJob.company}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-caption">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {currentJob.location}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {currentJob.duration}
                </div>
                <div className="flex items-center text-muted-foreground col-span-2">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {currentJob.compensation}
                </div>
              </div>

              <div>
                <p className="text-caption text-muted-foreground mb-3">
                  {currentJob.description}
                </p>
              </div>

              <div>
                <p className="text-small font-medium mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {currentJob.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-small">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-small text-muted-foreground">
                  <span className="font-medium">Why this matches:</span> {currentJob.matchReason}
                </p>
              </div>
            </div>

            {/* Action Buttons - now below the swipe card */}
            <div className="p-4 border-t border-border mt-6">
              <div className="flex justify-center space-x-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleSwipe("left")}
                  className="w-16 h-16 rounded-full border-destructive/30 hover:bg-destructive/10 focus-ring"
                >
                  <X className="h-6 w-6 text-destructive" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowJobDetail(true)}
                  className="w-16 h-16 rounded-full focus-ring"
                >
                  <Info className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleSwipe("right")}
                  className="w-16 h-16 rounded-full border-green-500/30 hover:bg-green-500/10 focus-ring"
                >
                  <Heart className="h-6 w-6 text-green-500" />
                </Button>
              </div>
              <p className="text-small text-muted-foreground text-center mt-4">
                Use arrow keys or swipe to navigate • Space for details
              </p>
            </div>
          </motion.div>

          {/* Next Card Preview */}
          {jobs[currentIndex + 1] && (
            <div className="absolute top-2 left-2 right-2 swipe-card opacity-50 -z-10">
              <div className="space-y-3">
                <h3 className="font-medium">{jobs[currentIndex + 1].title}</h3>
                <p className="text-caption text-muted-foreground">
                  {jobs[currentIndex + 1].company}
                </p>
              </div>
            </div>
          )}

          {/* Swipe Indicators */}
          <motion.div
            className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center border-2 border-destructive"
            style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
          >
            <X className="h-8 w-8 text-destructive" />
          </motion.div>

          <motion.div
            className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500"
            style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
          >
            <Heart className="h-8 w-8 text-green-500" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SwipeView;