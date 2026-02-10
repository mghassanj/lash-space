/**
 * Formats 24-hour time to 12-hour format with Arabic AM/PM
 * @param time24 - Time in HH:mm format (e.g., "09:00", "15:00")
 * @param locale - Language locale ("ar" or "en")
 * @returns Formatted time string (e.g., "٩ ص", "٣ م")
 */
export function format12HourTime(time24: string, locale: "ar" | "en" = "ar"): string {
  const [hoursStr, minutesStr] = time24.split(":");
  let hours = parseInt(hoursStr);
  const minutes = parseInt(minutesStr);

  // Determine AM/PM
  const isPM = hours >= 12;
  const amPm = locale === "ar" ? (isPM ? "م" : "ص") : (isPM ? "PM" : "AM");

  // Convert to 12-hour format
  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours = hours - 12;
  }

  // Format hours in Arabic numerals if locale is Arabic
  const hoursDisplay =
    locale === "ar"
      ? toArabicNumerals(hours.toString())
      : hours.toString();

  // Only show minutes if not :00
  const minutesDisplay = minutes !== 0 ? `:${minutes.toString().padStart(2, "0")}` : "";

  return `${hoursDisplay}${minutesDisplay} ${amPm}`;
}

/**
 * Converts English numerals to Arabic numerals
 * @param str - String containing English numbers
 * @returns String with Arabic numerals
 */
function toArabicNumerals(str: string): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return str.replace(/\d/g, (digit) => arabicNumerals[parseInt(digit)]);
}

/**
 * Formats a date and time for display
 * @param date - Date object
 * @param time24 - Time in HH:mm format
 * @param locale - Language locale
 * @returns Formatted date and time string
 */
export function formatAppointmentDateTime(
  date: Date,
  time24: string,
  locale: "ar" | "en" = "ar"
): string {
  const dateStr = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  const timeStr = format12HourTime(time24, locale);

  return locale === "ar" ? `${dateStr} - ${timeStr}` : `${dateStr} at ${timeStr}`;
}
