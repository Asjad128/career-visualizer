import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import ParticleBackground from "@/components/ParticleBackground";
import { Volume2 } from "lucide-react";

interface UserData {
  name: string;
  age: string;
  aim: string;
}

const PersonalityIntro = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const hasSpoken = useRef(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("personalityUserData");
    const storedResults = sessionStorage.getItem("personalityResults");

    if (!storedUser || !storedResults) {
      navigate("/personality-assessment");
      return;
    }

    setUserData(JSON.parse(storedUser));
  }, [navigate]);

  useEffect(() => {
    if (!userData || hasSpoken.current) return;
    hasSpoken.current = true;

    const sentence = `I am ${userData.name}, I am ${userData.age} years old, and I want to become a ${userData.aim}.`;
    setDisplayText(sentence);

    // Use Web Speech API for TTS
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = "en-IN";
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        // Navigate to results after speech ends
        setTimeout(() => {
          navigate("/personality-results");
        }, 800);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        // Navigate anyway if speech fails
        setTimeout(() => {
          navigate("/personality-results");
        }, 2000);
      };

      // Small delay before speaking
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 500);
    } else {
      // If TTS not supported, just wait and navigate
      setTimeout(() => {
        navigate("/personality-results");
      }, 3000);
    }

    return () => {
      // Cleanup: cancel any ongoing speech
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [userData, navigate]);

  if (!userData) return null;

  return (
    <div className="min-h-screen relative flex flex-col">
      <ParticleBackground />
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-center px-6 py-4 lg:px-12">
        <Logo size="md" />
      </nav>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="text-center animate-fadeIn max-w-2xl">
          <div className="glass-card p-8 lg:p-12">
            {/* Speaking Indicator */}
            <div className="flex justify-center mb-8">
              <div
                className={`w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center ${
                  isSpeaking ? "animate-pulse" : ""
                }`}
              >
                <Volume2
                  size={48}
                  className={`text-primary-foreground ${
                    isSpeaking ? "animate-bounce" : ""
                  }`}
                />
              </div>
            </div>

            {/* Display Text */}
            <h1 className="text-2xl lg:text-3xl font-display font-bold leading-relaxed">
              <span className="neon-text">"</span>
              {displayText}
              <span className="neon-text">"</span>
            </h1>

            {/* Status */}
            <p className="text-muted-foreground mt-6">
              {isSpeaking ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  Speaking...
                </span>
              ) : (
                "Preparing your results..."
              )}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalityIntro;
