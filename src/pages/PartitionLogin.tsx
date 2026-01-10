import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import ParticleBackground from "@/components/ParticleBackground";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, 
  Building2, 
  User,
  Mail,
  Phone,
  Loader2,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

const institutes = [
  { id: "KV", name: "Kendriya Vidyalaya" },
  { id: "NV", name: "Navodaya Vidyalaya" },
  { id: "DAV", name: "DAV Public School" },
  { id: "DPS", name: "Delhi Public School" },
  { id: "CBSE", name: "CBSE Model School" },
  { id: "STATE", name: "State Government School" },
];

const grades = ["6", "7", "8", "9", "10", "11", "12"];

const PartitionLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    institute: "",
    grade: "",
    name: "",
    email: "",
    phone: "",
  });

  const generateStudentId = () => {
    const prefix = formData.institute.charAt(0).toUpperCase();
    const gradeNum = formData.grade;
    const section = String.fromCharCode(65 + Math.floor(Math.random() * 4)); // A, B, C, or D
    const num = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0");
    return `${prefix}_${gradeNum}_${section}${num}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.institute || !formData.grade || !formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    // Generate unique student ID
    const studentId = generateStudentId();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setGeneratedId(studentId);
    toast.success("Student ID generated successfully!");
    setLoading(false);
  };

  const handleContinue = () => {
    navigate("/career-visualization");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      <ParticleBackground />
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </Link>

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        {/* Form Card */}
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 mb-4">
              <Building2 size={32} className="text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold mb-2">
              Institute Registration
            </h1>
            <p className="text-muted-foreground text-sm">
              Register through your school to get your unique Student ID
            </p>
          </div>

          {!generatedId ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Institute Select */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Select Institute *</Label>
                <Select
                  value={formData.institute}
                  onValueChange={(value) => setFormData({ ...formData, institute: value })}
                >
                  <SelectTrigger className="h-12 bg-muted/30 border-border/50">
                    <SelectValue placeholder="Choose your institute" />
                  </SelectTrigger>
                  <SelectContent>
                    {institutes.map((inst) => (
                      <SelectItem key={inst.id} value={inst.id}>
                        {inst.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Grade Select */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Select Grade *</Label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) => setFormData({ ...formData, grade: value })}
                >
                  <SelectTrigger className="h-12 bg-muted/30 border-border/50">
                    <SelectValue placeholder="Choose your grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        Grade {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10 h-12 bg-muted/30 border-border/50 focus:border-primary input-glow"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 h-12 bg-muted/30 border-border/50 focus:border-primary input-glow"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number (Optional)
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="pl-10 h-12 bg-muted/30 border-border/50 focus:border-primary input-glow"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="neon"
                size="lg"
                className="w-full mt-6"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Generating Student ID...</span>
                  </>
                ) : (
                  <span>Register & Get Student ID</span>
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/20 border-2 border-secondary">
                <CheckCircle size={40} className="text-secondary" />
              </div>
              
              <div>
                <p className="text-muted-foreground mb-2">Your Unique Student ID</p>
                <div className="glass-card p-4 neon-border">
                  <span className="text-3xl font-display font-bold neon-text tracking-wider">
                    {generatedId}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Save this ID! You'll need it to access your career assessments and reports.
              </p>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleContinue}
              >
                Continue to Career Visualization
              </Button>
            </div>
          )}

          {/* Alternative Login */}
          {!generatedId && (
            <>
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-border/50" />
                <span className="text-xs text-muted-foreground">OR</span>
                <div className="flex-1 h-px bg-border/50" />
              </div>

              <Link to="/auth">
                <Button variant="outline" className="w-full">
                  Login with Email
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartitionLogin;
