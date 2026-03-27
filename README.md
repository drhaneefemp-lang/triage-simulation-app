# TriageSim: ED Clinical Simulator

An interactive web-based simulation tool designed to teach vital signs interpretation and clinical triage decision-making to medical students, nursing students, and junior doctors in the Indian context.

## System Architecture

The application is built as a single-page application (SPA) using React and Vite.

1.  **Frontend (React + Vite)**:
    *   **State Management**: React `useState` and `useEffect` hooks manage the game state (loading, playing, feedback), score, and streak.
    *   **UI Components**: Modular components for the Patient Monitor (`Monitor.tsx`), Patient Information (`PatientInfo.tsx`), Triage Controls (`TriageControls.tsx`), and Feedback (`Feedback.tsx`).
    *   **Styling**: Tailwind CSS is used for responsive, utility-first styling, creating a dark, high-contrast "emergency monitor" aesthetic.
    *   **Animations**: `motion/react` (Framer Motion) provides smooth transitions and visual feedback (e.g., pulsing streak icon, appearing feedback modal).

2.  **AI Integration (Gemini API)**:
    *   The `generateScenario` function in `src/lib/gemini.ts` calls the Gemini API to dynamically generate realistic patient scenarios.
    *   It uses Structured Outputs (JSON Schema) to ensure the AI returns data in the exact format required by the application (age, gender, complaint, vitals, correct triage, and clinical explanation).
    *   A fallback mechanism uses pre-defined scenarios if the API call fails or is rate-limited.

## Database Schema (Proposed for Full Backend)

While the current MVP uses a serverless AI approach for dynamic scenario generation, a full backend (e.g., Supabase/PostgreSQL) would use the following schema:

### `users` table
*   `id` (UUID, Primary Key)
*   `email` (String)
*   `role` (Enum: 'student', 'doctor', 'nurse', 'admin')
*   `created_at` (Timestamp)

### `scenarios` table (If pre-generating or caching AI scenarios)
*   `id` (UUID, Primary Key)
*   `age` (Integer)
*   `gender` (String)
*   `complaint` (Text)
*   `vitals_hr` (Integer)
*   `vitals_sbp` (Integer)
*   `vitals_dbp` (Integer)
*   `vitals_spo2` (Integer)
*   `vitals_grbs` (Integer)
*   `vitals_rr` (Integer)
*   `vitals_temp` (Float)
*   `correct_triage` (Enum: 'RED', 'ORANGE', 'YELLOW', 'GREEN')
*   `explanation` (Text)
*   `created_at` (Timestamp)

### `game_sessions` table
*   `id` (UUID, Primary Key)
*   `user_id` (UUID, Foreign Key -> users.id)
*   `score` (Integer)
*   `max_streak` (Integer)
*   `started_at` (Timestamp)
*   `ended_at` (Timestamp, Nullable)

### `triage_attempts` table
*   `id` (UUID, Primary Key)
*   `session_id` (UUID, Foreign Key -> game_sessions.id)
*   `scenario_id` (UUID, Foreign Key -> scenarios.id)
*   `user_choice` (Enum: 'RED', 'ORANGE', 'YELLOW', 'GREEN')
*   `is_correct` (Boolean)
*   `time_taken_ms` (Integer)
*   `created_at` (Timestamp)

## Deployment Steps

1.  **Environment Setup**: Ensure `GEMINI_API_KEY` is set in the environment variables.
2.  **Build**: Run `npm run build` to create the production-ready static files in the `dist` directory.
3.  **Hosting**: Deploy the `dist` folder to any static hosting provider (e.g., Vercel, Netlify, Firebase Hosting, or Google Cloud Storage).
4.  **Backend (Optional)**: If implementing the Supabase database, run the SQL schema scripts and connect the frontend using the Supabase JS client.
