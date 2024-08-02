import { DateTime } from 'luxon';
import {getBusinessHourRequestTime, isNewTOS, isRefundApproved} from "@/utils/approvalCheckers";

describe('Refund Approval System', () => {
  describe('getBusinessHourRequestTime', () => {
    const testCases = [
      {
        input: '2023-05-03T08:30:00',
        expected: '2023-05-03T09:00:00',
        description: 'Weekday before 9am'
      },
      {
        input: '2023-05-03T14:30:00',
        expected: '2023-05-03T14:30:00',
        description: 'Weekday during business hours'
      },
      {
        input: '2023-05-03T17:30:00',
        expected: '2023-05-04T09:00:00',
        description: 'Weekday after 5pm'
      },
      {
        input: '2023-05-05T16:30:00',
        expected: '2023-05-05T16:30:00',
        description: 'Friday during business hours'
      },
      {
        input: '2023-05-05T17:30:00',
        expected: '2023-05-08T09:00:00',
        description: 'Friday after 5pm'
      },
      {
        input: '2023-05-06T10:30:00',
        expected: '2023-05-08T09:00:00',
        description: 'Saturday'
      },
      {
        input: '2023-05-07T10:30:00',
        expected: '2023-05-08T09:00:00',
        description: 'Sunday'
      }
    ];

    testCases.forEach(({ input, expected, description }) => {
      it(`should handle ${description}`, () => {
        const inputDate = DateTime.fromISO(input, { zone: 'UTC' });
        const expectedDate = DateTime.fromISO(expected, { zone: 'UTC' });
        const result = getBusinessHourRequestTime(inputDate);
        expect(result.toISO()).toBe(expectedDate.toISO());
      });
    });
  });

  describe('isNewTOS', () => {
    it('should correctly identify new TOS for US customers', () => {
      expect(isNewTOS('1/1/2020', 'US (PST)')).toBe(false);
      expect(isNewTOS('1/2/2020', 'US (PST)')).toBe(true);
      expect(isNewTOS('1/3/2020', 'US (PST)')).toBe(true);
    });

    it('should correctly identify new TOS for European customers', () => {
      expect(isNewTOS('1/1/2011', 'Europe (CET)')).toBe(false);
      expect(isNewTOS('2/1/2020', 'Europe (CET)')).toBe(true);
      expect(isNewTOS('3/1/2020', 'Europe (CET)')).toBe(true);
    });
  });

  describe('isRefundApproved', () => {
    const testCases = [
      {
        customer: {
          name: 'Test User 1',
          location: 'US (PST)',
          signupDate: '1/1/2020', // old
          requestSource: 'phone' as const,
          investmentDate: '5/5/2021', // Wednesday
          investmentTime: '3:00', //
          refundRequestDate: '5/5/2021', // Wednesday
          refundRequestTime: '7:00'
        },
        expected: true,
        description: 'Old TOS, phone request within 4 hours'
      },
      {
        customer: {
          name: 'Test User 2',
          location: 'Europe (CET)',
          signupDate: '3/1/2020',
          requestSource: 'web app' as const,
          investmentDate: '3/5/2021', // Wednesday
          investmentTime: '10:00',
          refundRequestDate: '4/5/2021', // Thursday
          refundRequestTime: '01:00' // 23 pm day before GMT
        },
        expected: true,
        description: 'New TOS, web app request within 16 hours'
      },
      {
        customer: {
          name: 'Test User 3',
          location: 'US (EST)',
          signupDate: '1/3/2020',
          requestSource: 'phone' as const,
          investmentDate: '5/5/2021',// Wednesday
          investmentTime: '17:00',
          refundRequestDate: '5/6/2021', // Thursday
          refundRequestTime: '14:00' // 18 pm GMT
        },
        expected: false,
        description:
          'New TOS, phone request after business hours, exceeding 24 hours'
      }
      // Add more test cases here...
    ];

    testCases.forEach(({ customer, expected, description }) => {
      it(`should ${
        expected ? 'approve' : 'decline'
      } refund: ${description}`, () => {
        expect(isRefundApproved(customer)).toBe(expected);
      });
    });
  });
});
