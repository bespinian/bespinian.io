# bespinian.io

The bespinian website reachable at [bespinian.io](https://bespinian.io)

## 🚀 Project Structure

This is an Astro-based multilingual website with the following structure:

```text
/
├── public/              # Static assets (favicon, images, robots.txt)
├── src/
│   ├── assets/         # Image assets (logos, team photos, partners, etc.)
│   ├── components/     # Reusable Astro components
│   ├── content/        # Content collections (blog posts, customers, jobs, services)
│   ├── data/           # Data files
│   ├── i18n/           # Internationalization (translations)
│   ├── layouts/        # Page layouts
│   ├── lib/            # Utility functions
│   ├── pages/          # File-based routing with [lang] dynamic routes
│   └── styles/         # Global styles
├── .github/            # GitHub workflows and configuration
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `npm install`       | Installs dependencies                            |
| `npm run dev`       | Starts local dev server at `localhost:4321`      |
| `npm run build`     | Build your production site to `./dist/`          |
| `npm run preview`   | Preview your build locally, before deploying     |
| `npm run check`     | Run Astro type checking                          |
| `npm run format`    | Format code with Prettier                        |
| `npm run lint`      | Check code formatting with Prettier              |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro check` |
