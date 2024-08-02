import { DateTime } from 'luxon';
import {timezoneMap} from "@/components/types";
export function parseDateTime(
  dateString: string,
  timeString: string,
  timezone: string,
  format: 'US' | 'EU'
): DateTime {
  const [part1, part2, year] = dateString.split('/').map(Number);
  const month = format === 'US' ? part1 : part2;
  const day = format === 'US' ? part2 : part1;

  return DateTime.fromObject(
    {
      year,
      month,
      day,
      hour: parseInt(timeString.split(':')[0]),
      minute: parseInt(timeString.split(':')[1])
    },
    { zone: timezoneMap[timezone] }
  ).toUTC();
}
