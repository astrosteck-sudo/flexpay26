import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(relativeTime);

export function timeAgoUTC(dateString) {
  return dayjs.utc(dateString).local().fromNow();
}

console.log(timeAgoUTC("2026-06-11T14:59:36.000Z"));
// → "2 days ago" (correct relative to your actual local time)
