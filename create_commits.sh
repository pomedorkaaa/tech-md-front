#!/bin/bash
git init
if [ ! -f .gitignore ]; then
  echo "node_modules/" > .gitignore
  echo "dist/" >> .gitignore
  echo ".env" >> .gitignore
  echo ".DS_Store" >> .gitignore
fi

git add package* tsconfig.* vite.config.ts .gitignore index.html eslint.config.js public/ || true
git commit -m "Initial commit: Project setup and configuration" || true

git add src/index.css tailwind.config* postcss.config.js src/types/ || true
git commit -m "feat: implement dark theme and digital architect design tokens" || true

git add src/pages/Auth/ src/pages/CompanyDashboard/ src/pages/CompanyOverview/ || true
git commit -m "feat: add registration, login and employer dashboard pages" || true

git add src/services/api.ts src/pages/*/*MockData.json || true
git commit -m "refactor: modularize mock data extraction from api service" || true

git add src/pages/Sandbox/ src/pages/Jobs/ src/pages/JobDetails/ src/pages/AdminDashboard/ || true
git commit -m "feat: update UI for sandbox and jobs pages with new components" || true

git add . || true
git commit -m "feat: wire up main routing and finish home page layout" || true

echo "Commits created successfully."
git log --oneline
