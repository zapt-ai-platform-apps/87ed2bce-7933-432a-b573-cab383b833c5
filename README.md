# Team Leave Calendar

An HR team tracker for managing employee leave requests, approvals, and team calendar.

## User Journeys

1. [Employee Login](docs/journeys/employee-login.md) - Employee logs into the system
2. [Submit Leave Request](docs/journeys/submit-leave-request.md) - Employee submits a new leave request
3. [Manager Login](docs/journeys/manager-login.md) - Manager logs into the system
4. [Approve/Deny Leave Request](docs/journeys/approve-deny-leave.md) - Manager reviews and approves or denies leave requests
5. [View Team Calendar](docs/journeys/view-team-calendar.md) - View a calendar showing team leave schedules
6. [View Dashboard](docs/journeys/view-dashboard.md) - View dashboard with leave balances and upcoming leaves

## APIs Used

- **Supabase**: Used for authentication and database management.

## Environment Variables

List of required environment variables:

- COCKROACH_DB_URL
- NPM_TOKEN
- VITE_PUBLIC_APP_ID
- VITE_PUBLIC_APP_ENV
- VITE_PUBLIC_SENTRY_DSN
- VITE_PUBLIC_UMAMI_WEBSITE_ID

Ensure to set these in a `.env` file.

## Made on ZAPT

This application was made on [ZAPT](https://www.zapt.ai).