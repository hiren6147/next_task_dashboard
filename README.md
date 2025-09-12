## Next Task Dashboard

A task and project management dashboard built with Next.js App Router, Firebase Auth (via Identity Toolkit), and Firestore (via Firebase Admin SDK). Sessions are managed with secure HttpOnly cookies. UI is styled with Shadcn UI.

### Tech stack

- **Next.js 15** (App Router, Node runtime)
- **React 19**
- **Shadcn UI**
- **Zustand** for client state
- **Firebase Admin SDK** (Auth + Firestore)
- **cookie** and HttpOnly session cookies

### Features

- **Auth**: register, login, logout (email/password)
- **Sessions**: server-verified HttpOnly cookie session
- **Projects**: list, create, delete
- **Tasks**: CRUD tasks within a project

### Prerequisites

- Node.js 18.18+ (or 20+ recommended)
- A Firebase project with Firestore and Email/Password Authentication enabled

### Quickstart

1. Create a copy of the env file and fill in values:

```bash
cp .env.local.example .env.local
```

2. Install dependencies:

```bash
npm install
```

3. Run the dev server:

```bash
npm run dev
```

4. Open http://localhost:3000

### Firebase configuration

1. In the Firebase Console, create a project and enable **Firestore** (in Native/Production mode) and **Email/Password** under Authentication.
2. Get your Web API Key from Project settings → General → Your apps → Web app → **App SDK setup and configuration**. Set `FIREBASE_WEB_API_KEY`.
3. Create a **Service account** key: Project settings → Service accounts → Firebase Admin SDK → Generate new private key. From the JSON file set:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY` (use the one-line escaped form shown below)

### Environment variables

Create `.env.local` using these keys (see `.env.local.example`):

```bash
# Firebase Admin (server)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Firebase Web API key (client-side identity endpoints)
FIREBASE_WEB_API_KEY=AIza...

# Session cookie (optional overrides)
AUTH_COOKIE_NAME=app_session
AUTH_COOKIE_MAX_AGE_DAYS=7

# Firestore emulator (optional for local dev)
FIREBASE_EMULATORS=false
FIRESTORE_EMULATOR_HOST=localhost:8080
```

Notes:

- Keep the `FIREBASE_PRIVATE_KEY` wrapped in quotes with literal `\n` for newlines.
- Do not commit `.env.local` to version control.

### App routes

- `GET /api/auth/me`: current user
- `POST /api/auth/register`: email, password, optional displayName
- `POST /api/auth/login`: email, password
- `POST /api/auth/logout`
- `GET|POST|DELETE /api/projects`
- `GET|POST|PUT|DELETE /api/tasks` (requires `projectId` via body or query)

UI pages:

- `/register`, `/login`
- `/dashboard` (requires authentication)

### Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start prod server
- `npm run lint` — run ESLint

### Project structure (simplified)

```
app/
  api/
    auth/{login,logout,me,register}/route.js
    projects/route.js
    tasks/route.js
  dashboard/
  login/
  register/
lib/{firebaseAdmin,session,utils}.js
store/{useAuthStore,useProjectStore,useTaskStore}.js
```

### Local emulators (optional)

If you use the Firestore emulator, set `FIREBASE_EMULATORS=true` and `FIRESTORE_EMULATOR_HOST=localhost:8080`. The Admin SDK will connect to the emulator and disable SSL for local dev.

### License

MIT (or your preferred license)
