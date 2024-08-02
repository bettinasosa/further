# Refund Approval System

This project is a Next.js-based application designed to manage and automate the refund approval process. It provides an efficient way to handle refund requests based on specific criteria, including investment time, request method, and terms of service agreement.


## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```bash
        further-test/
        │
        ├── src/
        │   ├── app/
        │   │   └── page.tsx
        │   │   └── refund.test.ts
        │   ├── components/
        │   │   ├── refundApproval.tsx
        │   │   └── types.ts
        │   ├── utils/
        │   │   ├── approvalCheckers.ts
        │   │   └── helpers.ts
        └── ...
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Technologies Used

### Luxon

The choice of to use Luxon for date and time handling in this project is for several reasons:

1. **Immutability**: Luxon's DateTime objects are immutable, which helps prevent bugs related to unexpected date mutations.
2. **Timezone Handling**: Luxon provides robust support for working with different timezones, which is crucial for our global customer base.
3. **Parsing and Formatting**: Luxon offers flexible and powerful methods for parsing and formatting dates, making it easier to work with various date string formats.
4. **Modern JavaScript**: Luxon is built for modern JavaScript environments and doesn't carry the legacy baggage of older libraries like Moment.js.

### TanStack Table

For displaying data, TanStack Table was chosen due to its:

1. **Flexibility**: It provides a headless UI experience, allowing us to have full control over the rendering and styling of our table.
2. **Performance**: TanStack Table is designed to handle large datasets efficiently.
3. **Feature-rich**: It offers out-of-the-box support for sorting, filtering, and pagination.
4. **TypeScript Support**: Strong typing support helps catch errors early and improves developer experience.

## Testing

Tests are located in the `src/tests/refund.test.ts` file. Using Jest as the testing framework. To run the tests, use the following command:

```bash
npm test
```

## Future Improvements

1. **Daylight Saving Time (DST) Handling**: While Luxon handles DST transitions, the system could be improved to more explicitly account for DST changes, especially for phone calls made around DST transition periods.

2. **Expanded Timezone Support**: We could enhance timezone mapping to cover more specific regions and edge cases.

3. **Audit Logging**: Implement a system to log all refund approval decisions for audit purposes.

4. **User Interface Enhancements**: Develop a more interactive UI that allows users to see the exact cutoff time for their refund request. (like a toast for instance)

5. **API Integration**: Create a backend API to handle refund approvals, allowing for real-time updates and integration with other systems.

6. **Error Handling**: Implement more robust error handling and user-friendly error messages throughout the application.

7. **Automated Testing**: Expand our test suite to include integration tests and end-to-end tests using tools like Playwright. I decided not to use it in this case as the scope of the project is small.