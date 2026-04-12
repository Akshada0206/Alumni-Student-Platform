# Goal Description

Develop "AlumNetX – Smart Alumni Intelligence & Mentorship Platform," a modern, highly attractive, full-stack MERN application. The platform will connect students with alumni mentors automatically based on skills and career goals, offering features like a visual career journey, an opportunities board, AI-based matching, session grouping, and gamification. 

## User Review Required

> [!WARNING]
> This is a large set of features. My plan involves significantly restructuring the existing rudimentary frontend and adding new endpoints to the backend. Please review if you're comfortable with discarding or severely rewriting the existing frontend UI.

> [!IMPORTANT]
> The database is specified as `mongodb://127.0.0.1:27017/database`. Are there any changes to this local setup, or any specific seed data you would like me to generate for testing the UI?
> Also, for charts and graphs, I will add `recharts` for the dashboard, and `framer-motion` for some premium animations. Let me know if you would like me to avoid adding these specific dependencies.

## Proposed Changes

---

### Backend Components

#### [MODIFY] `backend/models/User.js`
- Enhance the schema to support detailed career journeys (Array of positions/timeline).
- Add fields for Gamification (points, badges array).
- Add fields for Verification status.

#### [NEW] `backend/models/Opportunity.js`
- Create a schema for jobs, internships, and webinars posted by alumni.

#### [MODIFY] `backend/models/Request.js`
- Add topics, requested date/time, and structured messages to the mentorship request schema.

#### [MODIFY] `backend/routes/auth.js`
- Improve login/register logic to handle specific roles accurately with the new schema fields.

#### [MODIFY] `backend/routes/match.js`
- Implement an algorithm to cross-reference student skills/goals with alumni, returning a sorted list of matches with percentage scores.

#### [NEW] `backend/routes/opportunity.js`
- Endpoints to create, view, and manage opportunities.

#### [MODIFY] `backend/routes/request.js`
- Add logic for scheduling and tracking status with the extended schema.

#### [NEW] `backend/routes/analytics.js`
- Provide mock or aggregated data for the Alumni Intelligence Dashboard.

---

### Frontend Components

#### [MODIFY] `frontend/tailwind.config.js` & `frontend/src/index.css`
- Integrate a premium color palette, modern typography (e.g., Inter or Roboto), custom shadows, and glassmorphism utilities for a "hackathon-level" aesthetic.

#### [MODIFY] `frontend/package.json`
- Add libraries like `recharts` (for graphs), `framer-motion` (for micro-animations), `react-hot-toast` (for beautiful notifications), `lucide-react` (for modern icons), and `date-fns`.

#### [MODIFY] `frontend/src/App.jsx`
- Introduce a protected route structure and layout wrappers (Dashboard layout with Sidebar + Navbar).

#### [NEW] `frontend/src/layouts/DashboardLayout.jsx`
- Create a global layout containing the Sidebar and Top Navbar with dark/light mode toggle (optional if time permits, otherwise stick to a very sleek dark theme).

#### [MODIFY] `frontend/src/components/...`
- Expand `Card.jsx`, `Sidebar.jsx`, `Navbar.jsx` with the new design system.
- Add reusable UI components like `Button`, `Badge`, `Modal`, `Timeline`.

#### [MODIFY] `frontend/src/pages/...`
- **Dashboard**: Refactor to show matching recommendations (Student), pending requests (Alumni), analytics charts.
- **Profile**: Refactor into an editable, visually rich profile.
- **Login/Register**: Create a stunning split-screen aesthetic.
- **[NEW] Opportunities**: View jobs, internships.
- **[NEW] Network/Mentors**: Dedicated page for the AI matching system.

## Open Questions

1. Which specific Tailwind CSS theme or primary color do you envision for this platform (e.g., deep modern purple/blue, sleek tech black/green, professional LinkedIn blue)? I am planning a "Midnight Blue" and "Electric Cyan" sleek, modern dark theme.
2. For the "AI Smart Matching," would you like me to implement a simple exact/partial string-matching algorithm in Node.js to compute the percentage?

## Verification Plan

### Automated Tests
- Running the `backend` and hitting new/modified REST endpoints via scripts.
- Checking React render without unhandled exceptions.

### Manual Verification
- Testing the full user flow using the browser subagent or manually.
- 1. Register Student. 2. Register Alumni. 3. Ensure they get matched. 4. Send Mentorship request. 5. View visually impressive dashboard.
