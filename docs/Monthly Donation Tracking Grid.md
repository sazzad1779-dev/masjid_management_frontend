# Monthly Donation Tracking Grid

## Feature Overview
The Monthly Donation Tracking Grid allows administrators to monitor recurring pledges and track the fulfillment status of monthly donations across the fiscal year.

## Implementation Details
- **Page Path**: `/monthly-donations`
- **Component**: `MonthlyDonationsPage`
- **Key Sections**:
  - **Donation Status Matrix**: A horizontal scrolling grid showing donor names, pledge amounts, and payment status for each month (Jan-Dec).
  - **Annual Progress View**: Summary of total collected funds vs. annual goal.
  - **Stewardship Metrics**: Cards showing active pledges, average monthly income, and outstanding balances.

## UI Design
- Status matrix uses emerald-green indicators for received payments and subtle plus icons for pending entries.
- Sticky column for donor names to ensure readability during horizontal scroll.
- High-contrast summary cards for quick financial assessment.

## Technical Notes
- Responsive table layout with sticky positioning.
- Modular component structure for easy scalability.
