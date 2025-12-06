## ProcurAi – AI-Powered RFP Management System

Single-user web app to create RFPs from natural language, manage vendors, send RFPs via email, ingest vendor responses, and compare proposals with AI assistance.

### 1. Project Setup

**Prerequisites**
- **Node**: v18+ (tested with Node 18/20)
- **MongoDB**: running locally or in the cloud (e.g. `mongodb://localhost:27017/procurai`)
- **AI provider**: OpenAI API key
- **Email**: SMTP account for sending (e.g. Outlook, Gmail with app password, or a service like SendGrid)

**Backend (`backend`)**
1. `cd backend`
2. Create `.env` using the variables below:
   - `PORT=4000`
   - `MONGO_URI=mongodb://localhost:27017/procurai`
   - `OPENAI_API_KEY=your_openai_api_key`
   - `OPENAI_MODEL=gpt-4o-mini`
   - `SMTP_HOST=your_smtp_host`
   - `SMTP_PORT=587`
   - `SMTP_USER=your_smtp_username`
   - `SMTP_PASS=your_smtp_password`
   - `SMTP_FROM=rfp@example.com`
3. Install deps: `npm install`
4. Run dev server: `npm run dev` (listens on `http://localhost:4000`)

**Frontend (`frontend`)**
1. `cd frontend`
2. Create `.env` file with:
   - `VITE_API_BASE_URL=http://localhost:4000`
3. Install deps: `npm install`
4. Run dev server: `npm run dev` (Vite on `http://localhost:5173`)

**Email receiving**
- Use an email provider that can POST inbound mail to a webhook (e.g. SendGrid, Mailgun, AWS SES).
- Configure the webhook target to `POST http://<backend-host>:4000/api/email/inbound` with a JSON body containing at least:
  - `fromEmail` – sender’s email (must match a vendor)
  - `rfpId` – ID of the RFP this response belongs to
  - `subject` – email subject
  - `text` – plain-text body

### 2. Tech Stack

- **Frontend**: React + React Router + Vite, plain CSS for a modern, dark-themed UI.
- **Backend**: Node.js, Express.
- **Database**: MongoDB with Mongoose models for `Rfp`, `Vendor`, and `Proposal`.
- **AI Provider**: OpenAI (chat completions) for:
  - Turning natural language into structured RFP JSON.
  - Parsing vendor proposal emails into structured data.
  - Comparing proposals and recommending a vendor.
- **Email**: `nodemailer` with SMTP for sending RFP emails; generic webhook endpoint for receiving.

### 3. API Documentation (main endpoints)

Base URL: `http://localhost:4000`

**RFPs**
- **POST `/api/rfps/from-text`**
  - **Body**: `{ "text": "I need to procure laptops..." }`
  - **Response (201)**: RFP document with structured fields and items.
- **GET `/api/rfps`**
  - List all RFPs.
- **GET `/api/rfps/:id`**
  - Get one RFP by ID.
- **POST `/api/rfps/:id/send`**
  - **Body**: `{ "vendorIds": ["<vendorId1>", "<vendorId2>"] }`
  - Sends the RFP via email to selected vendors; marks RFP as `sent`.
- **GET `/api/rfps/:id/proposals/comparison`**
  - Returns:
    - `proposals`: array of proposals for this RFP (with populated vendor).
    - `comparison`: AI result `{ scores: [...], recommendedProposalId, overallSummary }`.

**Vendors**
- **GET `/api/vendors`** – list vendors.
- **POST `/api/vendors`**
  - **Body**: `{ "name": string, "email": string, "company"?: string }`
- **PUT `/api/vendors/:id`** – update vendor.
- **DELETE `/api/vendors/:id`** – delete vendor.

**Proposals**
- **GET `/api/proposals?rfpId=<rfpId>`**
  - List proposals, optionally filtered by RFP.

**Inbound email**
- **POST `/api/email/inbound`**
  - **Body**:
    ```json
    {
      "fromEmail": "vendor@example.com",
      "rfpId": "<rfpId>",
      "subject": "Proposal for laptops",
      "text": "Plain text email body from the vendor..."
    }
    ```
  - Uses AI to parse the email into structured pricing/terms and stores a `Proposal`.

### 4. Decisions & Assumptions

- **Domain modeling**
  - `Rfp` holds the normalized RFP derived from natural language: title, budget, currency, delivery timeline, payment terms, warranty, and item list.
  - `Vendor` is a simple master record: name, email, company, optional categories/notes.
  - `Proposal` links a vendor to an RFP and stores structured response (items, prices, terms), raw email text, optional AI summary/score, and status (`received`, `shortlisted`, `rejected`, `awarded`).
- **AI usage**
  - RFP creation: prompt tuned to output a strict JSON schema with budget, items, etc.
  - Proposal parsing: prompt extracts totals, per-item pricing, and commercial terms into JSON.
  - Comparison: AI receives the RFP and all proposals and returns normalized scores plus a recommended proposal with rationale.
- **Email**
  - Outbound uses SMTP only; no tracking of opens/clicks.
  - Inbound is abstracted as a webhook. In a production system, this would be wired to a mail provider’s inbound hook.
- **Limitations / simplifications**
  - No authentication / multi-tenancy.
  - No advanced error states in UI; basic messages only.
  - Proposal comparison relies fully on AI output (no deterministic scoring rules).

### 5. AI Tools Usage (meta)

- **Tools used**: Cursor (with GPT-based assistant) for scaffolding backend/frontend, designing models, and shaping prompts.
- **What they helped with**:
  - Quickly drafting Mongoose schemas and Express routes.
  - Designing JSON schemas and prompts for RFP and proposal parsing.
  - Generating a cohesive React UI with a clean layout and wiring it to the backend.
- **Approach**:
  - Iterative: define data model → design endpoints → plug in AI service → then build UI around those flows.
  - Prompts emphasize “JSON only” responses for RFP and proposal parsing to keep backend logic simple.
- **Learnings**:
  - Structured, strict JSON prompts reduce parsing issues.
  - Designing APIs around AI capabilities (e.g. separation of parsing vs. comparison) keeps the system easier to test and evolve.

### 6. How to Demo (flow for your screen recording)

1. **Create RFP**: In the UI, go to “Create RFP”, paste a natural language description, and submit. Show the structured RFP view.
2. **Manage vendors**: Go to “Vendors”, add a few vendors with names/emails.
3. **Send RFP**: Open the new RFP, select vendors, click “Send RFP via email”, and show that it succeeds.
4. **Receive proposals**: Use a tool (or mock via `curl`/Postman) to `POST /api/email/inbound` with sample vendor emails. Refresh proposals in the RFP detail page.
5. **Compare & recommend**: In the RFP detail view, show the table of proposals and the AI-generated recommendation + scores.
6. **Code walkthrough**: Briefly show the models (`Rfp`, `Vendor`, `Proposal`), the AI service (`aiService.js`), email service, and the main React pages.


