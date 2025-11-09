import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface StickyMobileCTAProps {
  onClick: () => void;
}

export const StickyMobileCTA = ({ onClick }: StickyMobileCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border z-50 md:hidden animate-slide-up">
      <Button
        size="lg"
        onClick={onClick}
        data-event="cta_open_typeform_sticky"
        className="w-full bg-gradient-vip hover:opacity-90 text-white font-semibold shadow-soft"
      >
        Înscrie-mă (PDF + acces)
      </Button>
    </div>
  );
};
