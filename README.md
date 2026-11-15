# Portfolio

Pattusuri Sanjana's portfolio: a React, TypeScript, and Vite frontend with a
FastAPI contact API backed by MongoDB Atlas.

## Run locally

1. Configure the backend environment:

   ```powershell
   if (!(Test-Path backend\.env)) {
     Copy-Item backend\.env.example backend\.env
   }
   ```

   Set `MONGODB_URI` to your MongoDB Atlas connection string in `backend\.env`.
   Keep this file private; it is ignored by Git. Set `DATABASE_NAME` and
   `FRONTEND_URL` there if needed.

2. Install and start the backend from the project root:

   ```powershell
   python -m pip install -r backend\requirements.txt
   Set-Location backend
   python -m uvicorn app.main:app --reload --port 8000
   ```

3. In a separate terminal, install and start the frontend:

   ```powershell
   Set-Location frontend
   Copy-Item .env.example .env
   npm install
   npm run dev
   ```

The portfolio is available at <http://localhost:5173>, and the API documentation
is at <http://localhost:8000/docs>.

## Contact API

`POST /api/contact` accepts `name`, `email`, optional `mobile`, `subject`, and
`message`. Valid submissions are saved with a UTC `created_at` timestamp and
`status: "unread"` in the `contact_messages` collection.

`POST /api/feedback` accepts `name`, `email`, optional `mobile`, `category`,
`feedback`, and optional `rating` (1-5). Valid feedback is saved with a UTC
`created_at` timestamp in the `feedback` collection. Both endpoints validate
with Pydantic, return success only after MongoDB accepts the insert, and report
database failures without claiming the submission was saved.

View submissions directly in MongoDB Atlas: open **Browse Collections** for the
`sanjana_portfolio` database, then choose `contact_messages` or `feedback`.
`GET /api/health` reports API and database availability.

The React forms send requests through `frontend/src/services/api.ts`.
`VITE_API_BASE_URL` can be set in `frontend/.env` to point to a different API
address.
