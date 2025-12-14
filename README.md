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

## 📝 Adding a Blog Post

1. Add your blog post to `src/content/blog` with the respective frontmatter
1. Add a header image from [Pexels](https://www.pexels.com/) to
   `src/assets/blog`
1. Run `mogrify -resize 1600 your-image.jpg` to reduce the image width to 1600
   pixels. This improves loading times and SEO.
1. If your blog post features other images, create a folder
   `src/assets/blog/my-blog-topic` and put them in there
1. Create a PR with your new blog post

## ✨ Adding a Customer Story

1. Add your customer story to `src/content/customers` with the respective
   frontmatter
1. Add the customer's logo (preferably as an SVG)
1. Send the story to the customer for review
1. If they are OK with us publishing it, create a PR with your new customer
   story
