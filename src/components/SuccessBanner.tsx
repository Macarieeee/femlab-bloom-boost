import { Button } from "@/components/ui/button";
import { Download, Calendar, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SuccessBannerProps {
  pdfUrl: string;
  whatsappLink: string;
  onCalendarClick: () => void;
}

export const SuccessBanner = ({ pdfUrl, whatsappLink, onCalendarClick }: SuccessBannerProps) => {
  return (
    <Card className="bg-gradient-vip text-white p-6 mb-8 animate-slide-up shadow-soft">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold">🎉 Ești înscrisă!</h2>
        <p className="text-white/90">
          Descarcă acum PDF-ul 'Ritualul de 7 Zile', adaugă în calendar și intră în grupul de remindere.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant="secondary"
            size="lg"
            asChild
            data-event="cta_download_pdf"
            className="gap-2 font-semibold"
          >
            <a href={pdfUrl} download>
              <Download className="w-5 h-5" />
              Descarcă PDF
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onCalendarClick}
            data-event="cta_calendar"
            className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold"
          >
            <Calendar className="w-5 h-5" />
            Adaugă în Calendar
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            data-event="cta_join_group"
            className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" />
              Intră în Grup
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};
