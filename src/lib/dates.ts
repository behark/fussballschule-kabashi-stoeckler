/**
 * Date utilities for managing camp dates
 * Makes it easy to update dates in one place
 */

export interface CampDate {
  startDate: Date;
  endDate: Date;
  formatted: string;
  formattedShort: string;
  isUpcoming: boolean;
  isPast: boolean;
}

export const campDates = {
  october2024: {
    startDate: new Date("2024-10-27"),
    endDate: new Date("2024-10-28"),
    formatted: "27.-28. Oktober 2024",
    formattedShort: "27.-28. Okt",
    isUpcoming: new Date() < new Date("2024-10-27"),
    isPast: new Date() > new Date("2024-10-28"),
  },
  july2025: {
    startDate: new Date("2025-07-21"),
    endDate: new Date("2025-07-24"),
    formatted: "21.-24. Juli 2025",
    formattedShort: "21.-24. Juli",
    isUpcoming: new Date() < new Date("2025-07-21"),
    isPast: new Date() > new Date("2025-07-24"),
  },
};

export function getNextCamp() {
  const now = new Date();
  const camps = [campDates.october2024, campDates.july2025];
  
  // Find the next upcoming camp
  const upcoming = camps.find(camp => camp.startDate > now);
  return upcoming || camps[camps.length - 1]; // Return last camp if all are past
}

export function formatDateRange(start: Date, end: Date): string {
  const startDay = start.getDate();
  const endDay = end.getDate();
  const month = start.toLocaleDateString("de-AT", { month: "long" });
  const year = start.getFullYear();
  
  if (startDay === endDay) {
    return `${startDay}. ${month} ${year}`;
  }
  return `${startDay}.-${endDay}. ${month} ${year}`;
}
