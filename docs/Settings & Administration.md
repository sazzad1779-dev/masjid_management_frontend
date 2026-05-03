# Settings & Administration - Documentation

This document summarizes the implementation details for the Settings and Administration modules of the Smart Masjid Management System.

## Pages & Components

### 1. Masjid Profile
- **Details**: Edit Masjid name, address, contact details, prayer/Jumuah times, and upload institutional logo.
- **Key API Endpoint**: `/masjids/{id}`
- **Features**: Multi-section form, image upload placeholder, prayer time method selection and offsets.

### 2. Team Management
- **Details**: Invite staff/committee members and assign them roles (Admin, Cashier, Viewer).
- **Key API Endpoint**: `/auth/me` (for identity/role check)
- **Features**: Staff directory, invitation modal/form, role-based access visualizers.

### 3. Audit Logs
- **Details**: A security trail of all system changes, providing transparency and accountability.
- **Key API Endpoint**: `/audit-logs/`
- **Features**: Immutable record of IP, User, Action, and Timestamp. CSV export functionality.

### 4. Notification Center
- **Details**: Central inbox for system alerts, financial notifications, and administrative updates.
- **Key API Endpoint**: `/notifications/`
- **Features**: Categorized notification list, mark as read, and quick action links.

## Design Tokens Used
- **Primary Color**: `#059669` (Emerald 600)
- **Secondary Color**: `#10B981` (Vibrant Emerald)
- **Background**: `#F9FAFB` (Zinc 50)
- **Typography**: 
    - Headlines: `Inter` / `Plus Jakarta Sans`
    - Body/Labels: `Inter`
- **Rounding**: 16px for cards (2xl), 12px for inputs/buttons (xl).

## File Structure
- `app/app/settings/page.tsx`: Masjid Profile & Configuration.
- `app/app/team-management/page.tsx`: Team & Roles Management.
- `app/app/audit-logs/page.tsx`: Security Audit Trail.
- `app/app/notifications/page.tsx`: Notification Center Hub.
- `app/app/components/AdminSidebar.tsx`: Shared navigation including these administration links.
