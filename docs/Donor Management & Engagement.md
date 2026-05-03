# Donor Management & Engagement (Feature 5)

Documentation for the donor directory and individual portal of the Smart Masjid Management System.

## Donor Management Directory
- **Path**: `/app/donors/page.tsx`
- **Description**: A management-facing directory of the entire masjid community donor base.
- **Key Features**:
  - **Donor Cards**: Modern grid layout showing donor initials, contact info, and status.
  - **Engagement Stats**: Quick view of monthly pledges vs total historical contributions.
  - **Search & Discovery**: Rapid lookup by name, phone, or email to facilitate community outreach.

## Donation Tracking Grid
- **Path**: `/app/donations/page.tsx`
- **Description**: A high-level operational grid for monitoring recurring monthly contributions.
- **Key Features**:
  - **Monthly Matrix**: visual representation of donor payments across multiple months.
  - **Status Badges**: Simplified status codes (P = Paid, P = Pending, O = Overdue) for quick identification of collection gaps.
  - **Bulk Operations**: "Generate Bills" action to initiate monthly collection workflows.

## Donor Portal Dashboard
- **Path**: `/app/donor-portal/page.tsx`
- **Description**: A personalized, resident-facing workspace for individual donors.
- **Key Features**:
  - **Personal Branding**: Welcome hero message with spiritual encouragement.
  - **Impact Tracking**: "My Impact" section highlighting specific masjid projects funded by the donor.
  - **Contribution History**: Table of past donations with PDF receipt download capability.
  - **Mobile Responsive**: Accessible design for donors to check history on-the-go.
