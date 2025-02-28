# AWS IM - Frontend
The frontend of this project is a responsive inventory management dashboard built using Next.js. It is styled with Tailwind CSS and utilizes modern libraries for state management, charting, and table components.

## Prerequisites

Before starting, ensure the following tools are installed:

- **Node.js (latest LTS version recommended):** A server-side runtime for JavaScript.
- **npm or npx:** Comes with Node.js, used for managing dependencies and running commands.
- **Visual Studio Code (VS Code):** A powerful code editor with support for JavaScript/TypeScript.

## 1. Setting Up the Development Environment

### Install Node.js

Node.js is a server-side JavaScript runtime. Download and install it via the [official Node.js website](https://nodejs.org/).

### Install npx

npx helps manage npm package binaries conveniently. Run the following command to install it globally:

```bash
npm install -g npx
```
### Code Editor Setup

You can use any code editor of your choice. If you choose to use Visual Studio Code (VS Code) as recommended for this project, follow these steps to set it up:

1. **Open a New Directory in VS Code:**
    - Launch VS Code and open the project directory.

2. **Toggle the Integrated Terminal:**
    - **Windows/Linux:** Press `Ctrl + '` 
    - **Mac:** Press `Cmd + '`

3. **Install Recommended Extensions:**
    - **ES7+ React/Redux/React-Native Snippets:** Provides handy shortcuts for React/Redux code.
    - **Prettier:** Automatically formats your code on save for consistency.

4. **Optional Tools:**
    - **Redux Dev Tools:** Debug state management in your browser.
    - **Pesticide for Chrome or CSSViewer on Edge:** Inspect layout structures visually in Chrome and Edge respectively. Both can be downloaded from the relevant webstores.

Open a new directory in Visual Studio Code (VS Code).

Toggle the integrated terminal using:

- **Windows/Linux:** `Ctrl + '` 
- **Mac:** `Cmd + '`

Install these VS Code extensions:

- **ES7+ React/Redux/React-Native Snippets:** Provides handy shortcuts for React/Redux code.
- **Prettier:** Automatically formats your code on save for consistency.
- **IntelliSense for CSS class names in HTML:** Provides CSS class name completion for better productivity.
- **GitHub Copilot:** Assists with code suggestions and autocompletion using AI.

Optionally, install these browser and VS Code tools:

- **Redux Dev Tools:** Debug state management in your browser.
- **Pesticide Chrome Add-On:** Inspect layout structures visually in Chrome.

## 2. Initialize the Next.js Application

Create a new Next.js application by running:

```bash
npx create-next-app@latest inventory-management
```

During setup, select these options:

- Enable TypeScript, ESLint, SRC, and Tailwind CSS.
- Use the `src` directory and the `app` directory for your project structure.

Rename the project folder to `frontend` for better organization:

```bash
mv inventory-management frontend
```

## 3. Install Dependencies

Navigate to the client directory:

```bash
cd client
```

Install the following packages in the order specified:

#### 3.1 Material UI and Styling Libraries

```bash
npm install @mui/x-data-grid @mui/material @emotion/react @emotion/styled
```

Provides pre-designed, customizable components like tables, forms, and styling utilities.

#### 3.2 Icon Library

```bash
npm install lucide-react
```

Adds lightweight, modern icons for the UI.

#### 3.3 Number Formatting

```bash
npm install numeral
```

Formats numbers (e.g., currency, percentages) for better readability.

#### 3.4 Charting Library

```bash
npm install recharts
```

Enables the creation of visually appealing, responsive charts for dashboard widgets.

#### 3.5 Unique ID Generator

```bash
npm install uuid
```

Generates unique IDs for data objects like products and users.

#### 3.6 API Handling

```bash
npm install axios
```

Provides a promise-based HTTP client for handling API requests and responses.

#### 3.7 TypeScript Definitions

```bash
npm install -D @types/node @types/uuid @types/numeral
```

Ensures type safety when working with the installed libraries.

## 4. Run and Test the Application

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser. You should see a basic "Hello World" page confirming that the setup is complete.

## 5. Directory Structure
At the end of your work, your setup should look something close to this:

```
frontend/
    .next/
    node_modules/
    public/
    src/
        app/
            (components)/
            dashboard/
            expenses/
            inventory/
            products/
            settings/
            users/
            dashboardWrapper.tsx
            Favicon.ico
            globals.css
            layout.tsx
            page.tsx
            redux.tsx
        state/
    .env.local
    .gitignore
    eslint.config.mjs
    frontend_README.md
    next-env.d.ts
    next.config.ts
    package-lock.json
    package.json
    postcss.config.mjs
    README.md
    tailwind.config.ts
    tsconfig.json
    venv/
    LICENSE
```

### Description of Each File/Directory

- **frontend/.next/**: Contains the build output and cache for the Next.js application.
- **frontend/node_modules/**: Stores all the npm dependencies for the project.
- **frontend/public/**: Contains static assets like images and icons.
- **frontend/src/app/**: Main application components and pages.
    - **components/**: Reusable UI components.
    - **dashboard/**: Dashboard-related components and pages.
    - **expenses/**: Expense management components and pages.
    - **inventory/**: Inventory management components and pages.
    - **products/**: Product management components and pages.
    - **settings/**: Application settings components and pages.
    - **users/**: User management components and pages.
    - **dashboardWrapper.tsx**: Wrapper component for the dashboard.
    - **Favicon.ico**: Favicon for the application.
    - **globals.css**: Global CSS styles.
    - **layout.tsx**: Layout component for the application.
    - **page.tsx**: Main page component.
    - **redux.tsx**: Redux setup and configuration.
- **frontend/src/state/**: Global state management for the project.
- **frontend/.env.local**: Environment variables for local development.
- **frontend/.gitignore**: Specifies files and directories to be ignored by Git.
- **frontend/eslint.config.mjs**: ESLint configuration file.
- **frontend/frontend_README.md**: README file for the frontend.
- **frontend/next-env.d.ts**: TypeScript definitions for Next.js.
- **frontend/next.config.ts**: Next.js configuration file.
- **frontend/package-lock.json**: Lockfile for npm dependencies.
- **frontend/package.json**: Lists project dependencies and scripts.
- **frontend/postcss.config.mjs**: PostCSS configuration file.
- **frontend/README.md**: Main README file for the project.
- **frontend/tailwind.config.ts**: Tailwind CSS configuration file.
- **frontend/tsconfig.json**: TypeScript configuration file.
- **frontend/venv/**: Virtual environment for Python dependencies (if any).
- **frontend/LICENSE**: License file for the project.

It is now time to move on to the Backend
