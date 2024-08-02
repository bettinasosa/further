import React from 'react';
import {Customer} from "@/app/refunds/types";
import RefundApprovalComponent from "@/app/refunds/refundApproval";

export default function App() {
  // data examples as taken from the table provided in the task
  const refundRequests: Customer[] = [
    {
      name: 'Emma Smith',
      location: 'US (PST)',
      signupDate: '1/2/2020',
      requestSource: 'phone' as const,
      investmentDate: '1/2/2021',
      investmentTime: '06:00',
      refundRequestDate: '1/2/2021',
      refundRequestTime: '09:00'
    },
    {
      name: 'Benjamin Johnson',
      location: 'Europe (CET)',
      signupDate: '12/2/2020',
      requestSource: 'web app' as const,
      investmentDate: '2/1/2021',
      investmentTime: '06:30',
      refundRequestDate: '1/2/2021',
      refundRequestTime: '23:00'
    },
    {
      name: 'Olivia Davis',
      location: 'Europe (CET)',
      signupDate: '1/2/2020',
      requestSource: 'web app' as const,
      investmentDate: '2/2/2021',
      investmentTime: '13:00',
      refundRequestDate: '2/2/2021',
      refundRequestTime: '20:00'
    },
    {
      name: 'Ethan Anderson',
      location: 'US (PST)',
      signupDate: '1/11/2011',
      requestSource: 'web app' as const,
      investmentDate: '2/1/2021',
      investmentTime: '13:00',
      refundRequestDate: '2/2/2021',
      refundRequestTime: '16:00'
    },
    {
      name: 'Sophia Wilson',
      location: 'US (PST)',
      signupDate: '2/1/2020',
      requestSource: 'phone' as const,
      investmentDate: '2/1/2021',
      investmentTime: '22:00',
      refundRequestDate: '2/2/2021',
      refundRequestTime: '5:00'
    },
    {
      name: 'Liam Martinez',
      location: 'Europe (GMT)',
      signupDate: '1/1/2020',
      requestSource: 'web app' as const,
      investmentDate: '1/1/2021',
      investmentTime: '11:00',
      refundRequestDate: '11/1/2021',
      refundRequestTime: '12:00'
    },
    {
      name: 'Jonathan Giles',
      location: 'Europe (CET)',
      signupDate: '1/1/2020',
      requestSource: 'phone' as const,
      investmentDate: '1/1/2021',
      investmentTime: '11:00',
      refundRequestDate: '12/1/2021',
      refundRequestTime: '12:00'
    },
    {
      name: 'Priya Sharp',
      location: 'Europe (CET)',
      signupDate: '10/10/2020',
      requestSource: 'phone' as const,
      investmentDate: '5/5/2021',
      investmentTime: '00:30',
      refundRequestDate: '5/5/2021',
      refundRequestTime: '21:00'
    },
    {
      name: 'Raja Ortiz',
      location: 'US (EST)',
      signupDate: '10/10/2021',
      requestSource: 'phone' as const,
      investmentDate: '01/15/2022',
      investmentTime: '21:30',
      refundRequestDate: '01/16/2022',
      refundRequestTime: '07:00'
    },
    {
      name: 'Livia Burns',
      location: 'US (PST)',
      signupDate: '10/10/2021',
      requestSource: 'phone' as const,
      investmentDate: '01/15/2022',
      investmentTime: '21:30',
      refundRequestDate: '01/16/2022',
      refundRequestTime: '19:00'
    },
    {
      name: 'Lacey Gates',
      location: 'Europe (CET)',
      signupDate: '10/10/2021',
      requestSource: 'web app' as const,
      investmentDate: '15/01/2022',
      investmentTime: '23:36',
      refundRequestDate: '16/01/2022',
      refundRequestTime: '13:12'
    }
  ];

  return (
      <div className=" min-h-screen w-screen">
        <RefundApprovalComponent requests={refundRequests} />
      </div>
  );
}
