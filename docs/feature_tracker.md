# Masjid Management Frontend - Feature Tracker

This tracker follows the design screens from the Stitch project. Each feature corresponds to one or more screens designed for the Smart Masjid Management System.

## 🚀 Navigation Status
- ✅ Completed
- 🏗️ In Progress
- ⏳ Pending
- ❌ Blocked

## stitch project id
13123082864327822844

## docs/
save as page name.md with each thing what done in the implementation
---

## 🛠️ Feature Breakdown

### Feature 1: Authentication & Institutional Onboarding
- [x] **Secure Portal Access** (Login)
  - Screens: Login page with email/password and "Keep me logged in".
  - API: `/auth/login/access-token`
- [x] **Register Your Institution** (Signup)
  - Screens: Basic registration for new institutions.
  - API: `/auth/signup`
- [x] **Register Masjid** (Super Admin Onboarding)
  - Screens: Admin form to onboard new Masjids.
  - API: `/masjids/`
- [ ] **Forgot Password**
  - Screens: Email entry field for reset link.
  - API: `/auth/forgot-password`
- [ ] **Reset Password**
  - Screens: New password entry with token verification.
  - API: `/auth/reset-password`

### Feature 2: Public Facing Pages & Transparency
- [x] **MMS Landing Page**
  - Screens: Main landing page with service overviews.
- [x] **Public Financial Transparency Summary**
  - Screens: Public view for financial transparency.
- [x] **About Page**
  - Screens: Professional overview of the platform's mission and values.
- [x] **Services Page**
  - Screens: Detailed breakdown of masjid management services.


### Feature 3: Core Administrative Dashboard
- [x] **Admin Dashboard**
  - Screens: Main overview for masjid admins.
- [x] **Masjid Configuration & Settings**
  - Screens: Customization of prayer times, masjid details, etc.

### Feature 4: Core Financial Records
- [x] **Income Records Management**
  - Screens: Grid for tracking all incoming donations and funds.
- [x] **Expense Records Management**
  - Screens: Grid for tracking masjid expenses.
- [x] **Donation Receipt (Print View)**
  - Screens: Simple, printable receipt layout.

### Feature 5: Donor Management & Engagement
- [x] **Donor Management Directory**
  - Screens: List of all registered donors.
- [x] **Donor Portal Dashboard**
  - Screens: Personalized view for individual donors to see their history.

### Feature 6: Advanced Financial Tracking
- [x] **Account & Balance Management**
  - Screens: Multi-account tracking (General fund, Zakat, etc.).
- [x] **Monthly Donation Tracking Grid**
  - Screens: Recurring donation status and pledges.

### Feature 7: Analytics & Reporting (Advanced)
- [x] **Reports & Analytics Dashboard**
  - Screens: Financial trends and aggregation charts.
- [x] **Super Admin Platform Analytics**
  - Screens: Network-wide analytics for multi-masjid setups.
- [x] **Super Admin Stats Dashboard**
  - Screens: Platform health and usage stats.

### Feature 8: System Integrity & Administration
- [x] **Notification Center**
  - Screens: Central hub for all alerts and messages.
  - API: `/notifications/`
- [x] **Security & Audit Activity Log**
  - Screens: Detailed logs of all system changes (IP, User, Action, Timestamp).
  - API: `/audit-logs/`
- [ ] **Team Management**
  - Screens: Invite staff/committee, assign roles (Admin, Cashier, Viewer).
  - API: `/auth/me`
