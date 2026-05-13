# Harshit Yadav's Personal Portfolio

A modern, highly-responsive, and sleek personal portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn UI. Features a blog system, project showcase, reading list, hardware setup, and an integrated Command Palette for seamless navigation.

![Portfolio Preview](/public/meta/hero.png)

## Features

- **Next.js 15** with App Router
- **Tailwind CSS** for comprehensive styling
- **Shadcn UI** & Framer Motion components
- **Intelligent Command Palette** (`Ctrl + K` / `Cmd + K`) for instant navigation
- **Dark/Light Mode** with intelligent frosted glass themes
- **Fully Responsive** design
- **MDX** support for blog posts
- **SEO** optimized out of the box
- **TypeScript** for robust type safety
- **Umami Analytics** for privacy-focused web analytics

## Prerequisites

Before you begin running this project locally, ensure you have the following installed:

- Node.js (v18 or higher)
- Bun (preferred) or npm

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
TELEGRAM_BOT_TOKEN="your-token"
TELEGRAM_CHAT_ID="your-chat-id"
GEMINI_API_KEY="your-api-key"
NODE_ENV="development"
NEXT_PUBLIC_URL="http://localhost:3000"
NEXT_PUBLIC_UMAMI_SRC="your-umami-script-url"
NEXT_PUBLIC_UMAMI_ID="your-umami-website-id"
```

### Setting up Umami Analytics (Optional)

1. Visit Umami:
   - Self-host Umami or use [Umami Cloud](https://cloud.umami.is)
   - Follow Umami's [installation guide](https://umami.is/docs/install)

2. Get your credentials:
   - Copy your Umami script URL (ends with `/script.js`)
   - Get your website ID from the Umami dashboard

3. Configure environment variables:
   ```env
   NEXT_PUBLIC_UMAMI_SRC="https://[your-umami-instance]/script.js"
   NEXT_PUBLIC_UMAMI_ID="your-website-id"
   ```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/hxrshityadav/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:

   ```bash
   # Using bun (recommended)
   bun install

   # Using npm
   npm install
   ```

3. Run the development server:

   ```bash
   # Using bun
   bun dev

   # Using npm
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Configuration

The project uses modular configuration files inside the `src/config` directory so content can be managed easily:

- `About.tsx` - About section content
- `Contact.tsx` - Contact settings
- `Footer.tsx` - Footer links and content
- `Gears.tsx` - Setup/gear section
- `Hero.tsx` - Hero section content & Socials
- `Meta.tsx` - SEO and metadata
- `Navbar.tsx` - Navigation links
- `Projects.tsx` - Project showcase list
- `Quote.ts` - Random quotes configuration
- `Resume.ts` - Resume section details
- `Setup.tsx` - Development setup information
- `cat.ts` - Enable/disable the interactive cat

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
