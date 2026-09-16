# College Placement and Career Management System

Front-end prototype (React.js + Vite) for the B.Tech CSE 3rd year mini project.
30% milestone: project setup, routing, student dashboard, placement opportunities listing, career management, and notifications — all using mock JSON data.

## Team Members
| Name | Roll No | Module |
|---|---|---|
| Vaibhava Kumar Shrivastav | 2415001726 | Project Setup, Routing, Navbar/Sidebar |
| Vedant Bansal | 2415001764 | Student Dashboard |
| Vikash Singh | 2415001773 | Placement Opportunities |
| Varsha Sharma | 2415001749 | Career Management + Notifications |

## Tech Stack
React.js, JavaScript, HTML5, CSS3, Vite, React Router

## Folder Structure
```
placement-system/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatusCard.jsx
│   │   └── OpportunityCard.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Opportunities.jsx
│   │   ├── Career.jsx
│   │   └── Notifications.jsx
│   ├── data/
│   │   ├── studentData.js
│   │   ├── opportunitiesData.js
│   │   ├── careerData.js
│   │   └── notificationsData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

## Setup
```bash
npm install
npm run dev
```

## Git Workflow (for all members)

Repo: https://github.com/vaibhava-shrivastav/mini_project_fullstack.git
Branch flow: `feature/*` → PR → `dev` → PR → `main`

### 1. Clone repo (first time only)
```bash
git clone https://github.com/vaibhava-shrivastav/mini_project_fullstack.git
cd mini_project_fullstack
```

### 2. Create your feature branch (from dev)
```bash
git checkout dev
git pull origin dev
git checkout -b feature/<your-module-name>
```

### 3. After making changes
```bash
git add .
git commit -m "your commit message"
git push origin feature/<your-module-name>
```

### 4. Open a Pull Request: `feature/<your-module-name>` → `dev`
Merge on GitHub after review.

### 5. Once dev is stable, open a Pull Request: `dev` → `main`
Merge on GitHub to finalize the milestone.

### 6. Switch back to dev branch and sync
```bash
git checkout dev
git pull origin dev
```

### 7. If your branch already exists, just switch to it
```bash
git checkout feature/<your-module-name>
```

## Milestone Scope (30%)
- Project structure and routing
- Student dashboard with mock profile/application data
- Placement opportunities listing with search filter
- Career resources and notifications display

## Future Scope
Backend (Node.js + MongoDB), authentication, resume parsing, real-time notifications — as listed in the project synopsis.