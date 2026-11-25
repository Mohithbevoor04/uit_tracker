# AXA Project Management App - Frontend

A React + Vite + Tailwind CSS frontend application for Project Management, Definitions Search, Resource Loading, and Costing.

## Prerequisites & System Requirements

To run this application on any other machine (Windows, macOS, or Linux), you need:

1. **Node.js**: Version **18.x** or higher (v20+ or v22 LTS recommended)
   - Download from: [nodejs.org](https://nodejs.org/)
2. **npm**: Version **9.x** or higher (bundled automatically with Node.js)
3. **Web Browser**: Any modern browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari)

---

## Quick Start on a New Machine

1. **Extract / Copy the project folder** to the new system (do NOT copy `node_modules`).
2. Open a terminal (PowerShell, Command Prompt, or Bash) inside the project folder:
   ```bash
   cd Curre_uti
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## Production Deployment (No Node.js Required on Server)

If you wish to deploy or host this application on a web server (e.g. Nginx, Apache, IIS, AWS S3, GitHub Pages, Vercel, Netlify):

1. Run the build command:
   ```bash
   npm run build
   ```
2. This creates a `dist/` directory with static HTML, CSS, and JS bundles.
3. Upload or serve the contents of the `dist/` folder with any web server.
