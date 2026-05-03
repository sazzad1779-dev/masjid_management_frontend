# Public Facing Pages & Transparency (Feature 2)

Implementation documentation for the public-facing components of the Smart Masjid Management System.

## MMS Landing Page
- **Path**: `/app/page.tsx`
- **Description**: The main entry point for the platform, designed to welcome users and provide a clear overview of services.
- **Key Sections**:
  - **Hero**: High-impact messaging with emerald green gradients.
  - **Service Overviews**: Card-based layouts highlighting Financial Tracking, Public Reports, and Donor Management.
  - **Navigation**: Sticky header with direct links to Transparency portal, Login, and Registration.
- **Visuals**:
  - Primary Theme: Emerald Green (#059669)
  - Secondary: Teal/Zinc mix for a modern, clean professional feel.
  - Typography: Plus Jakarta Sans (Headings), Inter (Body).

## Public Financial Transparency Summary
- **Path**: `/app/transparency/page.tsx`
- **Description**: A dedicated portal for community members to view high-level financial health and recent activities.
- **Key Features**:
  - **KPI Cards**: Real-time stats for Income, Expenses, and Net Growth.
  - **Transaction List**: A chronological table of recent entries with category and type breakdown.
  - **Accessibility**: Optimized for mobile and desktop viewing to ensure community-wide access.
- **Security**: Designed as a read-only public view, ensuring transparency without exposing sensitive donor details.
