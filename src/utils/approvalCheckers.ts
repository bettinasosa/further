import { DateTime } from 'luxon';
import {approvalLimits, Customer} from "@/components/types";
import {parseDateTime} from "@/utils/helpers";

export function isNewTOS(signUpDate: string, location: string): boolean {
  const isUS = location.startsWith('US');
  const [part1, part2, year] = signUpDate.split('/').map(Number);

  const month = isUS ? part1 : part2;
  const day = isUS ? part2 : part1;

  const parsedSignUpDate = DateTime.utc(year, month, day);
  const cutoffDate = DateTime.utc(2020, 1, 2); // January 2, 2020 in UTC

  return parsedSignUpDate >= cutoffDate;
}
export function getBusinessHourRequestTime(
  requestDateTime: DateTime
): DateTime {
  const businessStart = 9;
  const businessEnd = 17;

  // If it's Saturday or Sunday, move to Monday 9am
  if (requestDateTime.weekday > 5) {
    return requestDateTime
      .plus({ days: 8 - requestDateTime.weekday })
      .set({ hour: businessStart, minute: 0, second: 0, millisecond: 0 });
  }

  // If it's a weekday
  if (requestDateTime.hour < businessStart) {
    // Before 9am, set to 9am same day
    return requestDateTime.set({
      hour: businessStart,
      minute: 0,
      second: 0,
      millisecond: 0
    });
  } else if (
    requestDateTime.hour >= businessEnd ||
    (requestDateTime.hour === businessEnd && requestDateTime.minute > 0)
  ) {
    // After 5pm, set to 9am next day (or Monday if it's Friday)
    const daysToAdd = requestDateTime.weekday === 5 ? 3 : 1;
    return requestDateTime
      .plus({ days: daysToAdd })
      .set({ hour: businessStart, minute: 0, second: 0, millisecond: 0 });
  }

  // Within business hours, return as is
  return requestDateTime;
}

export function isRefundApproved(customer: Customer): boolean {
  const format = customer.location.startsWith('US') ? 'US' : 'EU';
  const timezone = customer.location.slice(
    customer.location.indexOf('(') + 1,
    -1
  );

  const isNewTerms = isNewTOS(customer.signupDate, customer.location);

  const investmentDateTime = parseDateTime(
    customer.investmentDate,
    customer.investmentTime,
    timezone,
    format
  );

  let refundRequestDateTime = parseDateTime(
    customer.refundRequestDate,
    customer.refundRequestTime,
    timezone,
    format
  );

  if (customer.requestSource === 'phone') {
    refundRequestDateTime = getBusinessHourRequestTime(refundRequestDateTime);
  }

  const timeDifference = refundRequestDateTime
    .diff(investmentDateTime)
    .as('hours');
  const limit =
    approvalLimits[customer.requestSource][isNewTerms ? 'newTOS' : 'oldTOS'];

  return timeDifference <= limit;
}
