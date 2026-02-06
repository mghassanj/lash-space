/**
 * Generate a Google Calendar event URL
 */
export function googleCalendarUrl({
  title,
  description,
  location,
  start,
  end,
}: {
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
}): string {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details: description,
    location,
    dates: `${fmt(start)}/${fmt(end)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate the iCal subscription URL
 */
export function calendarFeedUrl(baseUrl: string): string {
  return `${baseUrl}/api/calendar/feed`;
}

/**
 * Generate Google Calendar subscription URL for the iCal feed
 */
export function googleCalendarSubscribeUrl(baseUrl: string): string {
  const feedUrl = encodeURIComponent(calendarFeedUrl(baseUrl));
  return `https://calendar.google.com/calendar/r?cid=webcal://${feedUrl.replace(/^https?%3A%2F%2F/, "")}`;
}
