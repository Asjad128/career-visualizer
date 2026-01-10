import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import ParticleBackground from "@/components/ParticleBackground";
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Shield,
  Eye,
  EyeOff,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Welcome, Admin!");
    // Navigate to admin dashboard when implemented
    toast.info("Admin dashboard coming soon!");
    setLoading(false);
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

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        {/* Admin Login Card */}
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 mb-4">
              <Shield size={32} className="text-accent" />
            </div>
            <h1 className="text-2xl font-display font-bold mb-2">
              Admin Portal
            </h1>
            <p className="text-muted-foreground text-sm">
              Access the administrative dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Admin Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@careerviz.com"
                  className="pl-10 h-12 bg-muted/30 border-border/50 focus:border-accent input-glow"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-12 bg-muted/30 border-border/50 focus:border-accent input-glow"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="admin"
              size="lg"
              className="w-full mt-6 bg-accent/20 hover:bg-accent/30"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Shield size={18} />
                  <span>Admin Sign In</span>
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Only authorized administrators can access this portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
