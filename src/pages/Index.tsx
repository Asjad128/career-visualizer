import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ParticleBackground from "@/components/ParticleBackground";
import { 
  User, 
  Shield, 
  Mic, 
  Brain, 
  Target, 
  Sparkles,
  ArrowRight,
  ChevronDown
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Mic,
      title: "Voice Input",
      description: "Speak naturally and let AI understand your aspirations",
    },
    {
      icon: Brain,
      title: "Personality Analysis",
      description: "Discover your unique traits through smart assessments",
    },
    {
      icon: Target,
      title: "Career Matching",
      description: "Get personalized career recommendations that fit you",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description: "Advanced algorithms analyze your potential pathways",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12">
        <Logo size="md" />
        
        <div className="flex items-center gap-4">
          <Link to="/auth">
            <Button variant="ghost" className="gap-2">
              <User size={18} />
              <span className="hidden sm:inline">Student Login</span>
            </Button>
          </Link>
          <Link to="/admin-login">
            <Button variant="admin" className="gap-2">
              <Shield size={18} />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-12 pb-24 lg:pt-20">
        <div className="text-center max-w-4xl mx-auto space-y-8 animate-fadeIn">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm">
            <Sparkles size={16} className="text-primary" />
            <span className="text-muted-foreground">
              AI-Powered Career Guidance for Indian Students
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight">
            <span className="text-foreground">Discover Your</span>
            <br />
            <span className="neon-text">Perfect Career</span>
            <br />
            <span className="text-foreground">Path</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Unlock your potential with our intelligent career visualization platform. 
            Take personality assessments, explore careers, and get AI-powered recommendations 
            tailored just for you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/auth">
              <Button variant="hero" size="xl" className="gap-3 group">
                Get Started
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/partition-login">
              <Button variant="outline" size="xl" className="gap-2">
                Institute Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 animate-bounce">
          <ChevronDown size={32} className="text-primary/50" />
        </div>

        {/* Features Grid */}
        <section className="w-full max-w-6xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold neon-text-green mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our platform combines cutting-edge AI with proven career assessment methodologies
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card-hover p-6 text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 mb-4">
                  <feature.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full max-w-4xl mx-auto mt-24">
          <div className="glass-card p-8 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-display font-bold neon-text">
                  50+
                </div>
                <div className="text-sm text-muted-foreground">Career Paths</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-display font-bold neon-text-green">
                  10K+
                </div>
                <div className="text-sm text-muted-foreground">Students Guided</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-display font-bold neon-text">
                  100+
                </div>
                <div className="text-sm text-muted-foreground">Institutes</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-display font-bold neon-text-green">
                  95%
                </div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 text-center text-sm text-muted-foreground">
          <p>© 2024 CareerViz. Empowering Indian Students to Dream Big.</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
