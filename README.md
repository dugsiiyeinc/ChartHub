# 📊 ChartHub

A modern trading ideas platform where traders can share chart analysis, post strategies, and engage with a vibrant community. Built with React and powered by Supabase.

---

## 📁 Project Structure

```
ChartHub/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── Components/
│   │   ├── Header.jsx / Header.css
│   │   ├── Footer.jsx / Footer.css
│   │   └── NewIdeaModal.jsx / NewIdeaModal.css
│   ├── Context/
│   │   └── AuthContext.jsx
│   ├── Pages/
│   │   ├── Home.jsx / Home.css
│   │   ├── About.jsx / About.css
│   │   ├── Contact.jsx / Contact.css
│   │   ├── Idea.jsx / Idea.css
│   │   ├── IdeaDetail.jsx / IdeaDetail.css
│   │   ├── Dashboard.jsx / Dashboard.css
│   │   ├── Profile.jsx / Profile.css
│   │   ├── SignIn.jsx / SignIn.css
│   │   └── SignUp.jsx / SignUp.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── index.css
│   └── supabaseClient.js
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## ✨ Features

- **Trading Ideas** — Share chart analysis with screenshots, currency pairs, and detailed strategies
- **Comments (Faallo)** — Post, edit, and delete comments on any trading idea
- **User Authentication** — Secure sign up and sign in powered by Supabase Auth
- **User Dashboard** — View your posted ideas, comment count, and manage your content
- **Profile Management** — Update your avatar, bio, and personal information
- **Dynamic Idea Pages** — SEO-friendly URLs with slug-based routing for each idea
- **Search & Filter** — Filter ideas by currency pair and search by title
- **New Idea Modal** — Upload chart images and publish ideas through an elegant modal
- **Responsive Design** — Fully responsive across mobile, tablet, and desktop
- **Dark Theme** — Premium dark UI with gold accents and glassmorphism effects
- **Loading Skeletons** — Smooth shimmer animations while content loads
- **Interactive Animations** — Floating cards, hover effects, and micro-animations throughout

---

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Landing page with hero section, floating idea cards, features, how it works, stats, testimonials, and CTA |
| **Ideas** | `/idea` | Browse all shared trading ideas with search, filter, and grid layout |
| **Idea Detail** | `/idea/:slug` | Individual idea page with full analysis, image gallery, author info, and comments |
| **About** | `/about` | Company info with hero, mission, values, team members, timeline story, and CTA |
| **Contact** | `/contact` | Contact form, info cards (location, phone, email), and FAQ accordion |
| **Dashboard** | `/dashboard` | User's personal dashboard with stats, idea list, and management tools |
| **Profile** | `/profile` | Edit profile details, avatar, bio, and password |
| **Sign In** | `/signin` | User login page |
| **Sign Up** | `/signup` | New user registration page |

---

## 🎨 Color Reference

| Color | Hex | Usage |
|-------|-----|-------|
| **Navy Dark** | `#0d1235` | Deep background gradient |
| **Navy** | `#101742` | Primary background |
| **Navy Light** | `#1a2260` | Background gradient mid-tone |
| **Gold** | `#e7ab37` | Primary accent, buttons, highlights |
| **Gold Dark** | `#d49a2a` | Button gradients, hover states |
| **Gold Light** | `#f0c45e` | Gradient highlights |
| **White** | `#ffffff` | Primary text |
| **Blue** | `#3b82f6` | Secondary accent, icons |
| **Purple** | `#8b5cf6` | Tertiary accent, icons |
| **Green** | `#22c55e` | Positive trends, success states |
| **Red** | `#ef4444` | Negative trends, delete actions |

---

## 🛠 Technologies Used

| Technology | Purpose |
|------------|---------|
| **React 19** | Frontend UI library |
| **React Router v7** | Client-side routing and navigation |
| **Vite 7** | Build tool and dev server |
| **Supabase** | Backend — Database, Authentication, and Storage |
| **React Icons** | Icon library (Heroicons set) |
| **Vanilla CSS** | Custom styling with glassmorphism and animations |
| **ESLint** | Code linting and quality |




Live Demo: https://chart-hub.vercel.app/

## 📜 License

This project is open source and available under the [MIT License](LICENSE).



## Images

![alt text](Images/Home1.png)

