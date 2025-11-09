export const generateICS = (
  title: string,
  description: string,
  startDate: Date,
  endDate: Date,
  location: string = "Online"
): string => {
  const formatDate = (date: Date): string => {
    return date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  };

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FemLab//Masterclass//RO
BEGIN:VEVENT
UID:${Date.now()}@femlab.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT24H
DESCRIPTION:Reminder: ${title} în 24 ore
ACTION:DISPLAY
END:VALARM
BEGIN:VALARM
TRIGGER:-PT1H
DESCRIPTION:Reminder: ${title} în 1 oră
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;

  return ics;
};

export const downloadICS = (ics: string, filename: string = "femlab-masterclass.ics") => {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getGoogleCalendarUrl = (
  title: string,
  description: string,
  startDate: Date,
  endDate: Date,
  location: string = "Online"
): string => {
  const formatGoogleDate = (date: Date): string => {
    return date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  };

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: description,
    location: location,
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const getOutlookUrl = (
  title: string,
  description: string,
  startDate: Date,
  endDate: Date,
  location: string = "Online"
): string => {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: title,
    body: description,
    location: location,
    startdt: startDate.toISOString(),
    enddt: endDate.toISOString(),
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};
