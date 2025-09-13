import { useState, useEffect, useRef, useCallback } from "react";
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
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);
  const likeOpacity = useTransform(x, [80, 180], [0, 1]);
  const nopeOpacity = useTransform(x, [-180, -80], [1, 0]);

  // Tiny emoji burst on like/nope
  const [burstKey, setBurstKey] = useState(0);
  const [burstType, setBurstType] = useState<"like" | "nope" | null>(null);
  const enableBurst = false; // make UI sleeker by default

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

  const handleSwipe = useCallback((direction: "left" | "right") => {
    // Optional emoji burst for feedback
    if (enableBurst) {
      setBurstType(direction === "right" ? "like" : "nope");
      setBurstKey((k) => k + 1);
      setTimeout(() => setBurstType(null), 500);
    }
    x.set(direction === "right" ? 300 : -300);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % jobs.length);
      x.set(0);
    }, 200);
  }, [x, setCurrentIndex, jobs.length, enableBurst]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handleSwipe("left");
      } else if (e.key === "ArrowRight") {
        handleSwipe("right");
      } else if (e.key === "Space" || e.key === " ") {
        e.preventDefault();
        setShowJobDetail(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleSwipe]);

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
            {/* Hidden file input triggered by button */}
            <input
              ref={fileInputRef}
              type="file"
              id="resume-upload"
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                  // store filename for UI feedback; in a real app upload to server here
                  setResumeName(file.name);
                  // create object URL for preview/download if needed
                  const url = URL.createObjectURL(file);
                  setResumeUrl(url);
                  // Clear the input so selecting the same file again triggers change
                  e.currentTarget.value = "";
                }
              }}
            />
            <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>Upload Resume</Button>
            {resumeName && (
              <div className="mt-2 text-sm text-muted-foreground">
                Uploaded: <span className="font-medium">{resumeName}</span>
                {resumeUrl && (
                  <a href={resumeUrl} target="_blank" rel="noreferrer" className="ml-3 underline">Preview</a>
                )}
                <button className="ml-3 text-destructive" onClick={() => { setResumeName(null); if (resumeUrl) { URL.revokeObjectURL(resumeUrl); setResumeUrl(null); } }}>
                  Remove
                </button>
              </div>
            )}
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
  <div className="flex-1 flex items-center justify-center py-12 relative overflow-hidden">
        {/* Sleek animated background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Animated gradient blobs */}
          <motion.div
            initial={{ x: -80, y: -60 }}
            animate={{ x: [-80, -60, -90, -80], y: [-60, -80, -70, -60] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-16 -left-16 w-72 h-72 bg-gradient-to-br from-indigo-400/18 to-purple-400/18 dark:from-indigo-600/14 dark:to-purple-600/14 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ x: 60, y: 40 }}
            animate={{ x: [60, 80, 50, 60], y: [40, 20, 30, 40] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 -right-10 w-80 h-80 bg-gradient-to-tr from-pink-400/14 to-rose-400/14 dark:from-pink-600/14 dark:to-rose-600/14 rounded-full blur-3xl"
          />

          {/* Subtle dot-grid overlay */}
          <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.05]"
               style={{
                 backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
                 backgroundSize: '20px 20px',
                 color: 'rgb(99 102 241)'
               }}
          />
        </div>
        <div className="relative w-full max-w-sm">
          {/* Current Card */}
          <motion.div
            className="w-full"
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileTap={{ scale: 0.95 }}
          >
            {/* Gradient border wrapper */}
            <div className="p-px rounded-3xl bg-gradient-to-r from-indigo-500/70 to-purple-600/70 shadow-lg">
              <div className="rounded-3xl bg-gradient-to-b from-white to-slate-50 dark:from-slate-900/90 dark:to-slate-900/80 text-card-foreground border border-slate-200 dark:border-slate-700/60 shadow-[0_4px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm overflow-hidden">
                {/* Swipe stamps */}
                <motion.div
                  className="absolute top-4 left-4 px-2.5 py-0.5 rounded-md border border-rose-500/70 text-rose-600 bg-white/70 dark:bg-slate-900/60 dark:text-rose-400 text-[11px] font-bold rotate-[-4deg] shadow-sm"
                  style={{ opacity: nopeOpacity }}
                >
                  NOPE
                </motion.div>
                <motion.div
                  className="absolute top-4 right-4 px-2.5 py-0.5 rounded-md border border-emerald-500/70 text-emerald-600 bg-white/70 dark:bg-slate-900/60 dark:text-emerald-400 text-[11px] font-bold rotate-[4deg] shadow-sm"
                  style={{ opacity: likeOpacity }}
                >
                  YES
                </motion.div>
            {/* Match Badge */}
                <div className="flex justify-between items-start mb-2 p-4 pt-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] font-semibold shadow-sm">
                    <span>{currentJob.matchPercentage}% match</span>
                  </div>
                </div>

            {/* Job Info */}
                <div className="px-4 pb-4 space-y-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-1 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                      {currentJob.title}
                    </h2>
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

                  <div className="rounded-xl p-4 border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900/80 shadow-sm">
                    <p className="text-sm leading-relaxed text-slate-900 dark:text-white">
                      <span className="font-semibold">Why this matches:</span> {currentJob.matchReason}
                    </p>
                  </div>
                </div>

            {/* Action Buttons - now below the swipe card */}
                <div className="p-4 border-t border-border">
                  <div className="flex justify-center space-x-6">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleSwipe("left")}
                      className="group w-14 h-14 rounded-full border-rose-300 hover:bg-rose-50 focus-ring hover:-translate-y-0.5 transition-all"
                    >
                      <X className="h-5 w-5 text-rose-600 group-hover:scale-110 transition" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setShowJobDetail(true)}
                      className="group w-14 h-14 rounded-full border-indigo-300 hover:bg-indigo-50 focus-ring hover:-translate-y-0.5 transition-all"
                    >
                      <Info className="h-5 w-5 text-indigo-600 group-hover:scale-110 transition" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleSwipe("right")}
                      className="group w-14 h-14 rounded-full border-emerald-300 hover:bg-emerald-50 focus-ring hover:-translate-y-0.5 transition-all"
                    >
                      <Heart className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition" />
                    </Button>
                  </div>
                  <p className="text-small text-muted-foreground text-center mt-4">
                    Use arrow keys or swipe to navigate • Space for details
                  </p>
                </div>
              </div>
            </div>
            {/* Emoji burst overlay */}
            {enableBurst && burstType && (
              <div key={burstKey} className="pointer-events-none absolute inset-0 flex items-center justify-center">
                {[...Array(6)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: (Math.cos((i / 6) * Math.PI * 2) * 60) + (burstType === "like" ? 10 : -10),
                      y: (Math.sin((i / 6) * Math.PI * 2) * 40) - 10,
                      scale: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute text-xl select-none"
                  >
                    {burstType === "like" ? "💖" : "💥"}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Next Card Preview */}
          {jobs[currentIndex + 1] && (
            <div className="absolute top-2 left-2 right-2 -z-10">
              <div className="p-[2px] rounded-2xl bg-gradient-to-r from-indigo-400 to-purple-500 opacity-40">
                <div className="rounded-2xl bg-card/80 backdrop-blur border border-border p-4">
                  <div className="space-y-1">
                    <h3 className="font-medium line-clamp-1">{jobs[currentIndex + 1].title}</h3>
                    <p className="text-caption text-muted-foreground line-clamp-1">
                      {jobs[currentIndex + 1].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Swipe Indicators */}
          <motion.div
            className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-rose-500/15 rounded-full flex items-center justify-center border-2 border-rose-500"
            style={{ opacity: useTransform(x, [-100, 0], [1, 0]) }}
          >
            <X className="h-8 w-8 text-rose-500" />
          </motion.div>

          <motion.div
            className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center border-2 border-emerald-500"
            style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
          >
            <Heart className="h-8 w-8 text-emerald-500" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SwipeView;