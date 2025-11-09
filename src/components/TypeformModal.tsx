import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect } from "react";

interface TypeformModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  typeformId: string;
  onSubmit?: () => void;
}

export const TypeformModal = ({ open, onOpenChange, typeformId, onSubmit }: TypeformModalProps) => {
  useEffect(() => {
    if (!open) return;

    // Load Typeform embed script
    const script = document.createElement("script");
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Listen for Typeform submit event
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "form-submit" && onSubmit) {
        onSubmit();
        onOpenChange(false);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener("message", handleMessage);
    };
  }, [open, onSubmit, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="font-serif text-2xl">Rezervă-ți locul la masterclass</DialogTitle>
        </DialogHeader>
        <div className="h-[600px]">
          <div
            data-tf-widget={typeformId}
            data-tf-opacity="100"
            data-tf-iframe-props="title=FemLab Registration"
            data-tf-transitive-search-params
            data-tf-medium="snippet"
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
