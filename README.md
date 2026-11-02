# Wanderlast ✈️

**Wanderlast** is a travel booking web application built with **Next.js 16**, designed to help users discover destinations, explore travel details, and manage their bookings.

The application provides destination management, user authentication, and a booking system through a modern, responsive interface.

## Features

- **Explore Destinations** – Browse available travel destinations with dynamically fetched data.
- **Destination Details** – View detailed information about individual destinations.
- **Destination Management** – Create, edit, and delete destinations.
- **Booking System** – Book travel destinations and manage existing bookings.
- **User Authentication** – Secure sign-up, login, and session management using Better Auth.
- **Protected Routes** – Restrict access to authenticated-only pages.
- **Responsive UI** – Modern interface designed for different screen sizes.

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Frontend | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui (Base UI) |
| Icons | Lucide React |
| Authentication | Better Auth |
| Authentication Plugin | Better Auth JWT Plugin |
| Database | MongoDB |
| Notifications | Sonner |
| Development Server | Turbopack |

## Project Structure

```text
wanderlast/
├── public/
│   └── assets/                 # Static images and assets
│
├── src/
│   ├── app/
│   │   ├── destinations/       # Destination listing and details
│   │   ├── add-destination/    # Add destination page
│   │   ├── login/              # Login page
│   │   ├── sign-up/             # Registration page
│   │   ├── my-bookings/        # User booking management
│   │   ├── api/
│   │   │   └── auth/            # Authentication API handler
│   │   └── page.tsx             # Home page
│   │
│   ├── components/
│   │   ├── home/                # Homepage components
│   │   ├── destination/         # Destination components
│   │   ├── Booking/             # Booking components
│   │   ├── Footer/              # Footer components
│   │   └── ui/                  # Reusable UI components
│   │
│   ├── lib/                     # Shared libraries and utilities
│   └── proxy.ts                 # Route protection
│
├── types.ts                     # Shared TypeScript types
├── next.config.ts               # Next.js configuration
├── package.json
└── README.md
```

## Getting Started

Follow these steps to run Wanderlast locally.

### Prerequisites

Make sure you have the following installed:

- Node.js 20 or later
- npm
- MongoDB instance
- Git
- A running Wanderlast backend API

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd wanderlast
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

Add the required environment variables using your own local credentials:

```env
BETTER_AUTH_SECRET=your_local_auth_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

**Security Notes:**
- Never commit `.env` files to Git.
- Never share authentication secrets or database credentials publicly.
- Use `.env.example` to document required variable names without exposing actual values.
- Generate your own secrets for local and production environments.

### 4. Start the Backend API

Wanderlast uses a separate backend service for destination and booking operations.

The frontend expects the backend API to be available locally at:

```text
http://localhost:8000
```

Make sure the backend service is running before accessing pages that require dynamic data.

#### Expected API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/destinations` | Retrieve all destinations |
| GET | `/destination/:id` | Retrieve destination details |
| POST | `/add-destination` | Create a destination |
| PATCH | `/destination/:id` | Update a destination |
| DELETE | `/destination/:id` | Delete a destination |
| POST | `/booking` | Create a booking |
| GET | `/my-booking/:email` | Retrieve user bookings |
| DELETE | `/my-booking/:id` | Cancel a booking |

**Note:** Protected operations require valid authentication credentials. Authentication and token handling are managed by the application.

### 5. Run the Development Server

```bash
npm run dev
```

Open the following URL in your browser:

```text
http://localhost:3000
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Run TypeScript type checking |

## Authentication & Security

Wanderlast uses Better Auth for user authentication and session management.

The application includes:

- Email and password authentication.
- MongoDB-backed authentication storage.
- JWT-based authentication integration.
- Protected application routes.
- Server-side and client-side authentication support.

Sensitive authentication logic, secret values, and token-generation implementations are intentionally excluded from this documentation.

## Important Notes

- The frontend and backend run as separate services.
- Dynamic destination and booking features require the backend API to be available.
- MongoDB must be configured for authentication-related functionality.
- Next.js 16 uses asynchronous `params` and `searchParams` in relevant route APIs.
- Route protection is implemented using the Next.js 16 `proxy.ts` convention.
- Remote image configuration is restricted to approved image sources.

## Future Improvements

Potential improvements for future development:

- Search and filter destinations.
- Advanced booking management.
- User profile management.
- Booking status notifications.
- Payment gateway integration.
- Destination reviews and ratings.
- Improved dashboard and analytics.

## Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

## License

This project is developed for educational and learning purposes.

---


