'use client';

import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import {Customer} from "@/components/types";
import {isRefundApproved} from "@/utils/approvalCheckers";

const columnHelper = createColumnHelper<Customer>();

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>
  }),
  columnHelper.accessor('location', {
    cell: (info) => info.getValue(),
    header: () => <span>Customer Location</span>
  }),
  columnHelper.accessor('signupDate', {
    cell: (info) => info.getValue(),
    header: () => <span>Sign up date</span>
  }),
  columnHelper.accessor('requestSource', {
    cell: (info) => info.getValue(),
    header: () => <span>Request Source</span>
  }),
  columnHelper.accessor('investmentDate', {
    cell: (info) => info.getValue(),
    header: () => <span>Investment Date</span>
  }),
  columnHelper.accessor('investmentTime', {
    cell: (info) => info.getValue(),
    header: () => <span>Investment Time</span>
  }),
  columnHelper.accessor('refundRequestDate', {
    cell: (info) => info.getValue(),
    header: () => <span>Refund Request Date</span>
  }),
  columnHelper.accessor('refundRequestTime', {
    cell: (info) => info.getValue(),
    header: () => <span>Refund Request Time</span>
  }),
  columnHelper.accessor((row) => isRefundApproved(row), {
    id: 'approvalStatus',
    cell: (info) => (
      <span
        className={`rounded px-2 py-1 ${
          info.getValue()
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {info.getValue() ? 'Approved' : 'Denied'}
      </span>
    ),
    header: () => <span>Approval Status</span>
  })
];

export default function RefundApprovalComponent({
  requests
}: {
  requests: Customer[];
}) {
  const table = useReactTable({
    data: requests,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        Refund Approval Status
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-lg bg-gray-50  shadow-md">
          <thead className="bg-green-50 text-green-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b border-green-100 px-4 py-3 text-left text-sm font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-200 transition duration-150 hover:bg-green-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
