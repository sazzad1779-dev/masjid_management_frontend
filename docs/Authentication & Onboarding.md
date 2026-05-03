# Authentication & Onboarding - Documentation

This document summarizes the implementation details for the Authentication and Onboarding modules of the Smart Masjid Management System.

## Pages & Components

### 1. Login
- **Details**: Email/Password form with "Keep me logged in" option.
- **Key API Endpoint**: `/auth/login/access-token`
- **Features**: Institutional branding, emerald green theme, responsive layout.

### 2. Signup (Register Your Institution)
- **Details**: Basic registration for new users/institutions.
- **Key API Endpoint**: `/auth/signup`
- **Features**: Institution name, Admin name, Email, and Password fields.

### 3. Register Masjid (Super Admin)
- **Details**: Exclusive form for Super Admins to onboard new Masjids into the system.
- **Key API Endpoint**: `/masjids/`
- **Features**: Administrative fields for masjid setup.

### 4. Forgot Password
- **Details**: Email entry form to receive a secure password reset link.
- **Key API Endpoint**: `/auth/forgot-password`
- **Features**: Simple email validation and success feedback.

### 5. Reset Password
- **Details**: New password entry form with token verification.
- **Key API Endpoint**: `/auth/reset-password`
- **Features**: Password strength validation and token-based security.

## Design Tokens Used
- **Primary Color**: `#065F46` (Deep Emerald)
- **Secondary Color**: `#10B981` (Vibrant Emerald)
- **Background**: `#f9f9ff`
- **Typography**: 
    - Headlines: `Plus Jakarta Sans`
    - Body/Labels: `Inter`
- **Rounding**: 12px for cards, 8px for inputs/buttons.

## File Structure
- `app/app/login/page.tsx`: Login page.
- `app/app/register/page.tsx`: Signup page.
- `app/app/super-admin/register-masjid/page.tsx`: Masjid onboarding (Super Admin).
- `app/app/forgot-password/page.tsx`: Forgot password request.
- `app/app/reset-password/page.tsx`: Realize password reset.
- `app/app/globals.css`: Design tokens and shared styles.
