import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Countdown } from "@/components/Countdown";
import { TypeformModal } from "@/components/TypeformModal";
import { SuccessBanner } from "@/components/SuccessBanner";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { CheckCircle2, Sparkles, Video, FileText, Headphones, Star, Crown } from "lucide-react";
import { toast } from "sonner";
import { generateICS, downloadICS, getGoogleCalendarUrl, getOutlookUrl } from "@/utils/calendar";
import { sendConfirmationEmail } from "@/utils/emailjs";

// Configuration - Replace these with actual values
const CONFIG = {
  TYPEFORM_ID: "YOUR_TYPEFORM_ID",
  // Replace with actual Typeform ID
  LEAD_PDF_URL: "https://example.com/pdf/femlab-7-days.pdf",
  // Replace
  WHATSAPP_LINK: "https://wa.me/YOUR_NUMBER",
  // Replace
  CHECKOUT_URL: "https://example.com/checkout/vip-pass",
  // Replace
  BROADCAST_URL: "https://example.com/broadcast",
  // Replace
  EMAILJS_SERVICE_ID: "YOUR_SERVICE_ID",
  // Replace
  EMAILJS_TEMPLATE_ID: "YOUR_TEMPLATE_ID",
  // Replace
  EMAILJS_PUBLIC_KEY: "YOUR_PUBLIC_KEY",
  // Replace
  MASTERCLASS_DATE: new Date("2025-12-07T19:00:00+02:00")
};
const Index = () => {
  const [isTypeformOpen, setIsTypeformOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showVIP, setShowVIP] = useState(false);

  // Check for lead cookie
  useEffect(() => {
    const hasRegistered = document.cookie.includes("lead_masterclass=true");
    if (hasRegistered) {
      setShowSuccess(true);
    }
  }, []);

  // Show VIP after 30% scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
      if (scrollPercent > 30) {
        setShowVIP(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleTypeformSubmit = async () => {
    // Set cookie
    document.cookie = "lead_masterclass=true; max-age=2592000; path=/";
    setShowSuccess(true);

    // Send confirmation email (replace with actual user data from Typeform)
    await sendConfirmationEmail("user@example.com",
    // This should come from Typeform
    "User",
    // This should come from Typeform
    CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, CONFIG.EMAILJS_PUBLIC_KEY);
    toast.success("Ești înscrisă! Verifică email-ul pentru detalii.");

    // Scroll to success banner
    setTimeout(() => {
      document.getElementById("hero")?.scrollIntoView({
        behavior: "smooth"
      });
    }, 500);
  };
  const handleCalendarClick = () => {
    const icsContent = generateICS("FemLab – Masterclass Live: Resetul Feminin în 7 Zile", "Masterclass live cu Metoda în 3 Piloni pentru încredere, slăbit sănătos și feminitate. Link: " + CONFIG.BROADCAST_URL, CONFIG.MASTERCLASS_DATE, new Date(CONFIG.MASTERCLASS_DATE.getTime() + 90 * 60000),
    // 90 minutes
    "Online");

    // Create a modal/menu for calendar options
    const choice = window.confirm("Alege calendar:\n\nOK - Google Calendar\nCancel - Descarcă fișier .ics");
    if (choice) {
      window.open(getGoogleCalendarUrl("FemLab – Masterclass Live", "Metoda în 3 Piloni pentru încredere și feminitate", CONFIG.MASTERCLASS_DATE, new Date(CONFIG.MASTERCLASS_DATE.getTime() + 90 * 60000)), "_blank");
    } else {
      downloadICS(icsContent);
    }
  };
  return <div className="min-h-screen bg-background font-sans">
      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-hero py-16 px-4 md:py-24">
        <div className="container max-w-6xl mx-auto">
          {showSuccess && <SuccessBanner pdfUrl={CONFIG.LEAD_PDF_URL} whatsappLink={CONFIG.WHATSAPP_LINK} onCalendarClick={handleCalendarClick} />}

          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4 text-sm font-medium px-4 py-2">
              Masterclass Live • 7 decembrie, ora 19:00 (GMT+2)
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
              Simți că ți-ai pierdut strălucirea feminină?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Urmărește video-ul (8 min) și aplică Metoda Piramidei Prezenței Feminine — 3 piloni simpli — pentru a-ți <strong>crește încrederea în tine</strong>, a activa <strong>slăbitul sănătos</strong> și a <strong>atrage oportunități</strong> & <strong>relații care te onorează</strong> în <strong>5 minute</strong> pe zi, timp de 7 zile.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8 text-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Pași mici, efect vizibil</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Prima victorie chiar azi</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                <span>Calmeaza mintea si reactiveaza corpul</span>
              </div>
            </div>

            <div className="mb-8">
              <Countdown targetDate={CONFIG.MASTERCLASS_DATE} />
            </div>

            <Button size="lg" onClick={() => setIsTypeformOpen(true)} data-event="cta_open_typeform" className="bg-gradient-vip hover:opacity-90 text-white font-semibold text-lg px-8 py-6 shadow-soft mb-3">
              Vreau să vin la webinar
            </Button>
            <p className="text-xs text-muted-foreground">
              Îți trimitem doar ce ai cerut. Te poți dezabona oricând.
            </p>
            <Badge variant="outline" className="mt-4 border-primary text-primary">
              La înscriere: PDF Limite blânde & Mâncat Emoțional - Soluții pentru Echilibru Emoțional + Audio 3 minute
            </Badge>
          </div>

          {/* Video Placeholder */}
          <div className="relative max-w-4xl mx-auto aspect-video bg-muted rounded-2xl shadow-card overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Video className="w-20 h-20 mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Video 5–8 minute (placeholder)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Learn */}
      <section id="what-you-learn" className="py-16 px-4 bg-background">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">În video descoperi</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[{
            title: "Secretul #1",
            desc: "Cum scapi de energia masculină copleșitoare și revii la grația feminină, în viața de zi cu zi."
          }, {
            title: "Tehnica de 5 minute/zi",
            desc: "Care se face oriunde (acasă sau la birou) și îți dă un boost de încredere imediat."
          }, {
            title: "Greșeala comună",
            desc: "Care îți sabotează feminitatea (și cum s-o corectezi ca să te simți din nou atrăgătoare)."
          }, {
            title: "Bonus",
            desc: "Un exercițiu corp–minte pentru energie feminină întreaga zi."
          }].map((item, i) => <Card key={i} className="p-6 shadow-card hover:shadow-soft transition-shadow">
                <h3 className="font-serif text-xl font-semibold mb-2 text-accent">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>)}
          </div>
          <p className="text-center mt-8 text-muted-foreground">
            Vrei video + PDF?{" "}
            <button onClick={() => setIsTypeformOpen(true)} className="text-accent font-semibold underline hover:no-underline">
              Apasă 'Vreau să vin la webinar'
            </button>
          </p>
        </div>
      </section>

      {/* Two-Step Opt-in */}
      <section id="two-step-optin" className="py-16 px-4 bg-gradient-hero">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Pasul următor: rezervă-ți locul și primește PDF-ul cadou
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Completezi 5–7 întrebări (2 minute). Îți trimitem imediat linkul + materialele.
          </p>
          <Button size="lg" onClick={() => setIsTypeformOpen(true)} data-event="cta_open_typeform_section" className="bg-gradient-vip hover:opacity-90 text-white font-semibold text-lg px-8 py-6 shadow-soft">
            Înscrie-mă (PDF + acces)
          </Button>
        </div>
      </section>

      {/* Instant Rewards */}
      <section id="instant-rewards" className="py-16 px-4 bg-background">
        <div className="container max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
            Ce primești imediat după înscriere
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center shadow-card">
              <Video className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-serif text-xl font-semibold mb-2">Video (10 min)</h3>
              <p className="text-muted-foreground">Metoda Piramidei Prezenței Feminine, pas cu pas — aplicăm împreună cei 3 piloni.</p>
            </Card>
            <Card className="p-6 text-center shadow-card">
              <FileText className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="font-serif text-xl font-semibold mb-2">PDF Limite blânde & Mâncat Emoțional</h3>
              <p className="text-muted-foreground">Setezi limite, rupi mâncatul emoțional — ghid în 5 pași</p>
            </Card>
            <Card className="p-6 text-center shadow-card">
              <Headphones className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="font-serif text-xl font-semibold mb-2">Audio 3 minute</h3>
              <p className="text-muted-foreground">"Reset feminin" pentru momentele aglomerate.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="social-proof" className="py-16 px-4 bg-muted/30">
        <div className="container max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
            Ce spun femeile care au trecut prin program
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[{
            quote: "M-am uitat altfel în oglindă. M-am simțit femeie.",
            author: "A., 29"
          }, {
            quote: "Mi-am recăpătat încrederea și am slăbit 2 kg în 2 săptămâni doar schimbând rutina.",
            author: "M., 34"
          }, {
            quote: "Pentru prima dată m-am simțit prezentă în corpul meu, nu doar în cap.",
            author: "I., 26"
          }].map((item, i) => <Card key={i} className="p-6 shadow-card">
                <p className="italic mb-4 text-foreground">"{item.quote}"</p>
                <p className="text-sm font-semibold text-primary">— {item.author}</p>
              </Card>)}
          </div>

          {/* Video Testimonials Placeholder */}
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <Card key={i} className="aspect-video bg-muted/50 relative overflow-hidden shadow-card">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Video className="w-12 h-12 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Testimonial video {i}</p>
                  </div>
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* VIP Pass */}
      {showVIP && <section id="vip-pass" className="py-16 px-4 bg-background animate-fade-in">
          <div className="container max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 bg-gradient-card shadow-soft border-primary/20">
              <div className="text-center mb-8">
                <Crown className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                  Simți că situația ta are nevoie de mai multă atenție? Ia VIP Pass pentru masterclass.
                </h2>
                <p className="text-muted-foreground">Acces prioritar și materiale avansate</p>
              </div>

              <div className="space-y-4 mb-8">
                {["Acces în Grupul VIP de Feminitate (WhatsApp) – suport, provocări și răspunsuri", "Prioritate la Q&A – întrebarea ta primește răspuns în direct", "PDF 'Kitul Avansat – 14 Zile de Reset Feminin' (VIP) – practici aprofundate + mini-jurnal", "Înregistrarea masterclass-ului disponibilă 30 de zile", "Bonus: playlist ghidat pentru lucru cu feminitatea (link privat)"].map((benefit, i) => <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>)}
              </div>

              <div className="text-center">
                <div className="mb-6">
                  <div className="inline-block">
                    <p className="text-4xl font-bold text-accent mb-2">47 €</p>
                    <Countdown targetDate={new Date(CONFIG.MASTERCLASS_DATE.getTime() - 60 * 60000)} compact />
                  </div>
                </div>
                <Button size="lg" asChild data-event="cta_buy_vip" className="bg-gradient-vip hover:opacity-90 text-white font-semibold text-lg px-8 py-6 shadow-soft">
                  <a href={CONFIG.CHECKOUT_URL}>Ia VIP Pass</a>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Acces instant. Banii înapoi 7 zile dacă nu e pentru tine.
                </p>
              </div>
            </Card>
          </div>
        </section>}

      {/* About */}
      <section id="about" className="py-16 px-4 bg-muted/30">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">Cine te ghidează</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-gradient-vip flex-shrink-0" />
            <p className="text-lg text-muted-foreground text-left">
              Sunt <strong>[Nume]</strong>, coach pe feminitate & prezență. Am creat Metoda în 3 Piloni după ani în
              care m-am simțit pe pilot automat. Astăzi ghidez femei 18–45 să revină la ele prin pași simpli, blânzi
              și practici zilnice de 5–10 minute. Nu e terapie, nu e perfecționism — e reconectare reală cu corpul și
              feminitatea ta.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4 bg-background">
        <div className="container max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Întrebări frecvente</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[{
            q: "Dacă nu pot ajunge live?",
            a: "Primești înregistrarea (limitat) + PDF-urile."
          }, {
            q: "Cât durează?",
            a: "60 min + Q&A."
          }, {
            q: "Sunt începătoare — e ok?",
            a: "Da, e gândit pentru începătoare."
          }, {
            q: "Am nevoie de echipament?",
            a: "Nu. Doar spațiu liniștit și haine comode."
          }, {
            q: "Mă ajută la slăbit?",
            a: "Da, primești micro-obiceiuri pentru slăbit sănătos (nu e program medical)."
          }, {
            q: "Cum primesc materialele?",
            a: "După înscriere, link direct + email (EmailJS)."
          }].map((item, i) => <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="py-8 px-4 bg-muted/30 border-t border-border">
        <div className="container max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} FemLab. Toate drepturile rezervate.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>

      {/* Typeform Modal */}
      <TypeformModal open={isTypeformOpen} onOpenChange={setIsTypeformOpen} typeformId={CONFIG.TYPEFORM_ID} onSubmit={handleTypeformSubmit} />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA onClick={() => setIsTypeformOpen(true)} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        name: "FemLab – Masterclass Live: Resetul Feminin în 7 Zile",
        startDate: CONFIG.MASTERCLASS_DATE.toISOString(),
        endDate: new Date(CONFIG.MASTERCLASS_DATE.getTime() + 90 * 60000).toISOString(),
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "VirtualLocation",
          url: CONFIG.BROADCAST_URL
        },
        description: "Masterclass live cu Metoda în 3 Piloni pentru încredere, slăbit sănătos și feminitate. În doar 5 minute pe zi.",
        organizer: {
          "@type": "Organization",
          name: "FemLab"
        }
      })
    }} />
    </div>;
};
export default Index;