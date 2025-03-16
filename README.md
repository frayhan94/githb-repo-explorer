# 🚀 GitHub Repositories Explorer

A **Next.js** web app that allows users to **search GitHub users** and **view their repositories** in real time.

🔍 **Requirement**

1. Node JS Used version v22.14.0

🔍 **Features**

- 🔥 Search for **GitHub users** dynamically
- 📂 View **repositories** of any user
- 📂 Keyboard handling when press escape will close the Repo Modal
- 📂 Keyboard handling when press enter will automatically search the user
- 📂 Implement pagination on user
- 📂 Implement pagination on repo list

🎬 **Live Demo**: [Click Here](https://githb-repo-explorer-74k8.vercel.app/)


## 🛠️ **Tech Stack**

- **Frontend:** Next.js (App Router), React, TypeScript
- **State Management:** Zustand, TanStack Query
- **Styling:** Tailwind CSS
- **Form Handling:** React Hook Form + Zod
- **API Requests:** Axios, GitHub API
- **Deployment:** Vercel
- **Animation:** Framer Motion

---

## 🚀 **Getting Started**

### 🔧 **1. Clone the Repo**

```sh
git clone https://github.com/frayhan94/githb-repo-explorer
cd github-repo-explorer
npm install
npm run dev
```

### 🔧 **2. Create env**
```sh
1. touch .env.local
2. Then write your token with this key env NEXT_PUBLIC_GITHUB_ACCESS_TOKEN
```


### 🔧 **3. Unit test**
```sh
npm run test
```

## **Todo**

- **Implement unit test fully with mock store and TanStack query:**
