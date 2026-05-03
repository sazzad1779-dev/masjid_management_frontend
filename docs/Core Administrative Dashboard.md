# Core Administrative Dashboard (Feature 3)

Implementation documentation for the administrative control center of the Smart Masjid Management System.

## Admin Dashboard
- **Path**: `/app/dashboard/page.tsx`
- **Description**: The primary workspace for masjid administrators, providing a birds-eye view of institutional health.
- **Key Features**:
  - **Overview Stats**: Quick-glance cards for Income, Expenses, Net Balance, and Donor count.
  - **Financial Trends**: A visual chart (bar-graph style) showing monthly income vs expenses.
  - **Recent Activities**: A prioritized feed of recent system actions (donations, audits, etc.).
  - **Quick Actions**: Prominent buttons for high-frequency tasks like "Add Income" and "New Expense".
- **Navigation**: Persistent sidebar providing access to all core administrative modules.

## Masjid Configuration & Settings
- **Path**: `/app/settings/page.tsx`
- **Description**: Central configuration hub for masjid-specific details and system behavior.
- **Key Features**:
  - **General Info**: Management of masjid name, contact details, and physical address.
  - **Prayer Time Config**: Advanced settings for prayer time calculation methods and local offsets.
  - **Responsive Actions**: A clean action bar for saving or discarding configuration changes.
- **Visuals**: Tabbed-interface inspired layout with clear grouping of related settings.
