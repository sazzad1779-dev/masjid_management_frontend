# Account & Balance Management

## Feature Overview
The Account & Balance Management page provides masjid administrators with a centralized view of all financial repositories, including bank accounts, cash boxes, and mobile banking portals.

## Implementation Details
- **Page Path**: `/accounts`
- **Component**: `AccountsPage`
- **Key Sections**:
  - **Account Summary Cards**: Real-time balance display for Bank Account, Cash Box, and Mobile Banking.
  - **Initiate Transfer Form**: Interface for moving funds between internal accounts.
  - **Reconciliation History Table**: Detailed log of internal transfers, bank deposits, and sync operations.

## UI Design
- Follows the emerald-green theme for institutional administration.
- Responsive grid layout for account cards.
- Clean, professional table for history tracking.

## Technical Notes
- Built using Next.js and React.
- Uses Tailwind CSS for styling.
- Sidebar navigation integrated with the main admin suite.
