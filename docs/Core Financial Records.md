# Core Financial Records (Feature 4)

Implementation documentation for the financial record-keeping modules of the Smart Masjid Management System.

## Income Records Management
- **Path**: `/app/income/page.tsx`
- **Description**: Centralized tracking for all incoming masjid funds, including donations, collections, and grants.
- **Key Features**:
  - **Data Grid**: A clean, sortable table displaying date, category, donor, amount, and status.
  - **Advanced Filtering**: Filter by category (General, Zakat, etc.), date range, or searchable donor names.
  - **Status Indicators**: Visual cues (emerald/amber dots) for "Completed" vs "Pending" payments.
  - **Integrated Receipts**: Quick actions to view/print donation receipts for each record.

## Expense Records Management
- **Path**: `/app/expense/page.tsx`
- **Description**: Management suite for masjid expenditures and outgoing transfers.
- **Key Features**:
  - **Expense Tracking**: Listing of date, category, source account, amount, and payment status.
  - **Action Controls**: High-contrast "Log New Expense" action for rapid data entry.
  - **Account Context**: Displays which financial account (General Fund, Petty Cash, etc.) was used for each transaction.

## Donation Receipt (Print View)
- **Path**: `/app/receipt/[id]/page.tsx`
- **Description**: A professional, printable document for donor record-keeping and tax purposes.
- **Key Features**:
  - **Professional Branding**: Includes Masjid name, address, tax ID, and administrative seal.
  - **Detailed Breakdown**: Clearly lists donor information, amount, purpose, and date.
  - **Print Optimization**: Clean typography designed for both digital viewing and physical printing (print-specific CSS).
  - **Spiritual Note**: Includes a "JazakAllah" footer message to honor donor generosity.
