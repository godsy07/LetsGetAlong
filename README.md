# Let's Get Along 🤝

A modern social web app built with **React**, **TypeScript**, and **Vite**, designed to connect people and promote healthy discussions in a friendly, inclusive environment.  
It uses **Appwrite** as the backend for authentication, database, and storage — providing a scalable and privacy-friendly setup.

---

## 🚀 Features

- 🔐 **User Authentication** (via Appwrite)
- 📝 **Form Handling & Validation** with React Hook Form + Zod
- 💬 **Post Creation & Interaction** (upload media, react, comment, etc.)
- 🌈 **Modern UI** powered by Radix UI, Tailwind CSS, and Lucide Icons
- ⚡ **Optimized Data Fetching** with React Query
- 📱 **Responsive Design** with smooth animations (tailwind-animate)
- 🗂️ Modular, component-driven architecture
- 🧩 Built with **Vite** for lightning-fast builds and hot reloads

---

## 🧰 Tech Stack

**Frontend:**
- React 18 + TypeScript  
- React Router DOM  
- React Hook Form + Zod (validation)  
- React Query (data fetching & caching)  
- Tailwind CSS + Tailwind Merge + Animate  
- Radix UI components  
- Lucide React Icons  
- React Dropzone (for media uploads)  
- React Intersection Observer (for lazy loading / infinite scroll)

**Backend / Services:**
- [Appwrite](https://appwrite.io/) (authentication, database, storage)

**Build & Tooling:**
- Vite  
- ESLint + TypeScript ESLint  
- PostCSS + Autoprefixer

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/godsy07/LetsGetAlong.git
cd LetsGetAlong
```

### 2️⃣ Install dependencies
```bash
npm install
# or
yarn install
```

### 3️⃣ Set up environment variables
Create a .env file in the root directory and add your Appwrite configuration:
```bash
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_STORAGE_ID=your_storage_id
```

### 4️⃣ Start the development server
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) to view the app.


## 🧪 Linting & Build Commands

```bash
# Run ESLint
npm run lint

# Build for production
npm run build

# Preview the production build
npm run preview
```
