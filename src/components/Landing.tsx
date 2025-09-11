import { motion } from "framer-motion";
import { ArrowRight, Users, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingProps {
  onGetStarted: () => void;
}

const Landing = ({ onGetStarted }: LandingProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <motion.main 
        className="flex-1 flex items-center justify-center px-4 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-hero mb-4">
              AI-powered internship matching that actually works
            </h1>
            <p className="text-body text-muted-foreground max-w-lg mx-auto">
              Connect students with their perfect internship opportunities using intelligent matching based on skills, interests, and goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button className="btn-hero group" onClick={onGetStarted}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" className="focus-ring">
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
            <div className="card-surface p-6 text-center interactive-card">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-medium mb-2">Smart Matching</h3>
              <p className="text-caption text-muted-foreground">
                AI analyzes skills and preferences for perfect matches
              </p>
            </div>
            
            <div className="card-surface p-6 text-center interactive-card">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-medium mb-2">Fast & Simple</h3>
              <p className="text-caption text-muted-foreground">
                Swipe through opportunities in seconds
              </p>
            </div>
            
            <div className="card-surface p-6 text-center interactive-card">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-medium mb-2">Quality Connections</h3>
              <p className="text-caption text-muted-foreground">
                Connect with top companies and bright students
              </p>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default Landing;