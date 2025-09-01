import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

export function yyyymmdd(dayString: Date) {
  return dayjs.utc(dayString).tz().format("YYYY-MM-DD");
}

export function yyyymmddhhmmss(dayString: Date) {
  return dayjs.utc(dayString).tz().format("YYYY-MM-DD HH:mm:ss");
}
