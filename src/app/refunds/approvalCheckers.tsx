import { DateTime } from 'luxon';
import {approvalLimits, Customer} from "@/app/refunds/types";
import {parseDateTime} from "@/app/refunds/helpers";

export function isNewTOS(signUpDate: string, location: string): boolean {
  const format = location.startsWith('US') ? 'US' : 'EU';
  const timezone = location.slice(location.indexOf('(') + 1, -1);
  const cutoffDate = DateTime.fromObject(
    { year: 2020, month: 1, day: 2 },
    { zone: 'UTC' }
  );
  const parsedSignUpDate = parseDateTime(signUpDate, '00:00', timezone, format);
  return parsedSignUpDate > cutoffDate;
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
    (requestDateTime.hour === businessEnd - 1 && requestDateTime.minute > 0)
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
