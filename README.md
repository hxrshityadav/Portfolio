# ✨ Harshit Yadav's Portfolio

<div align="center">
  <p align="center">
    A premium, highly-responsive, and sleek developer portfolio built using modern frontend technologies.
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-15.5-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </p>

  <p align="center">
    <a href="#features">Features</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#project-configuration">Configuration</a> •
    <a href="#directory-structure">Structure</a>
  </p>
</div>

---

## 🚀 Key Features

* **⚡ Cutting Edge**: Built on Next.js 15 (App Router, Turbopack) & React 19 for maximum performance and instant load times.
* **🔍 Command Center**: Press `/` anywhere on the site to trigger a sleek, keyboard-driven navigation palette allowing instant navigation across pages, built with Radix and `cmdk`.
* **🎨 Rich Aesthetics**: Clean dark mode with frosted glassmorphic cards, harmonized layout grids, and premium micro-animations powered by Framer Motion.
* **📬 Contact Form**: Styled Zod-validated contact form with client-side loading indicators and local terminal submission logging.
* **🐱 Oneko Cat Sprite**: A playful interactive cat sprite that chases your mouse cursor around the screen (configurable!).
* **📄 Markdown Blog**: Dynamic blog system powered by MDX allowing rich code blocks and easy publishing.
* **📊 Analytics & SEO**: SEO optimized out of the box with custom dynamic metadata headers and optional privacy-friendly Umami Analytics.

---

## 🛠️ Tech Stack & Tools

* **Core Framework**: [Next.js 15](https://nextjs.org/) (App Router), React 19
* **Styling**: Tailwind CSS v4, custom utility systems
* **UI Components**: Shadcn UI, Radix primitives
* **Animations**: Framer Motion / Motion
* **Forms & Validation**: React Hook Form, Zod
* **Icons**: Lucide React
* **Scrolling**: Lenis smooth scrolling

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV="development"
NEXT_PUBLIC_URL="http://localhost:3000"

# (Optional) Umami Analytics
NEXT_PUBLIC_UMAMI_SRC="https://[your-umami-instance]/script.js"
NEXT_PUBLIC_UMAMI_ID="your-website-id"

# (Optional) AI Chatbot Integration
GEMINI_API_KEY="your-api-key"
```

---

## 🏁 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/hxrshityadav/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
```bash
# Using bun (recommended)
bun install

# Or using npm
npm install
```

### 3. Start the Development Server
```bash
# Using bun
bun dev

# Or using npm
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view your portfolio!

---

## 📁 Directory Structure

```text
├── src/
│   ├── app/                # Next.js pages & API routes
│   │   ├── api/            # Contact & Chat API handlers
│   │   ├── contact/        # Standalone Contact page
│   │   ├── layout.tsx      # App wrapper (Lenis, Navbar, Footer)
│   │   └── page.tsx        # Homepage sections
│   ├── components/
│   │   ├── common/         # Navbar, Footer, CommandMenu, Scroll top
│   │   ├── contact/        # Stateful Contact form component
│   │   ├── landing/        # Homepage section components (Hero, Projects, Skills)
│   │   └── ui/             # Reusable Shadcn UI primitives
│   ├── config/             # Config files for easy content updates
│   ├── lib/                # Utility helpers & Zod schemas
│   └── types/              # TypeScript typings
```

---

## 🔧 Content Customization

You don't need to touch the component code to change your content! Most data is managed via modular configurations inside `src/config/`:

* `Hero.tsx` — Avatar, social links, bio text, and introductory headers.
* `Navbar.tsx` — Main navigation links.
* `Projects.tsx` — Project showcase list.
* `Gears.tsx` — Hardware & equipment setup.
* `Setup.tsx` — Editor themes, VS Code setup instructions.
* `Contact.tsx` — Header titles & forms configurations.
* `Footer.tsx` — Developer copyright info.
* `Meta.tsx` — Site title, tags, and default SEO parameters.
* `cat.ts` — Toggle the interactive cursor-chasing cat on/off.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
