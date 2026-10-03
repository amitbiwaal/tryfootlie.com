# tryfootlie.com

The Footly guide site: landing page, blog, legal pages, and a built-in admin CMS for writing blog posts.
Built with Next.js 16 (App Router) and React 19. Designed to deploy on Vercel.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The admin is at http://localhost:3000/admin — the password is the
`ADMIN_PASSWORD` value in `.env.local` (copy `.env.example` to `.env.local` if that file is missing).

Locally, posts and contact messages are saved to `.data/cms.json` and uploaded images to
`public/uploads/`. Both are git-ignored: they are for trying things out, not for production.

> Windows note: if `npm` hangs in PowerShell, run `npm.cmd` instead (or use Git Bash).

## Deploy to Vercel

1. **Push the project to GitHub** (GitLab and Bitbucket work too).
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. **Import it in Vercel**: vercel.com → Add New → Project → pick the repo. The defaults are correct.
3. **Add environment variables** (Project → Settings → Environment Variables):

   | Name | Required | What it is |
   | --- | --- | --- |
   | `ADMIN_PASSWORD` | Yes | Password for `/admin`. Use a long, unique one. |
   | `SESSION_SECRET` | Recommended | Random string that signs the login cookie. |
   | `NEXT_PUBLIC_SITE_URL` | No | Defaults to `https://tryfootlie.com`. |
   | `NEXT_PUBLIC_AFFILIATE_URL` | No | Overrides the link behind every "Start selling" button. |
   | `NEXT_PUBLIC_CONTACT_EMAIL` | No | Shows a contact email on the Contact page. |
   | `NEXT_PUBLIC_TIME_ZONE` | No | Time zone for post dates, e.g. `Asia/Kolkata`. Defaults to UTC. |

   Generate a secret with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

4. **Connect storage for the CMS** (Project → Storage):
   - **Upstash for Redis** → Create → connect to the project. This stores posts and contact messages.
     Without it the site still works and shows the starter posts, but nothing can be saved.
   - **Blob** → Create a **public** store → connect to the project. This enables image uploads in the
     editor. Without it you can still add images by pasting an image URL.

   Vercel adds the needed variables (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, `BLOB_READ_WRITE_TOKEN`) itself.
5. **Redeploy** so the new variables take effect, then add the `tryfootlie.com` domain under
   Project → Settings → Domains.

## Using the CMS

- Go to `/admin` and sign in.
- **New post** opens the editor: title, formatted text (headings, lists, quotes, links, images),
  excerpt, tags, cover image, and SEO title/description with a search-result preview.
- **Save draft** keeps a post private. **Publish** makes it live straight away — the blog, home page,
  tag pages, sitemap, RSS feed, and `llms.txt` all update without a redeploy.
- **Preview** shows the last saved version exactly as visitors will see it.
- **Images**: use the Image button, paste a screenshot, or drag an image file into the editor. Click an
  image and press Image again to change its description. Up to 4 MB each (JPG, PNG, WebP, GIF, AVIF).
- **Pasting from Word or Google Docs** keeps headings, bold, lists and links. Tables are not supported:
  each row is pasted as a line of text.
- Titles, slugs and tags can be in any language (Hindi works).
- **Messages** lists everything sent through the contact form.
- The four starter posts are ordinary posts: edit or delete them as you like.

## Where things live

| Path | What |
| --- | --- |
| `src/lib/site.ts` | Site name, URL, affiliate link, partner name, navigation |
| `src/lib/home-content.tsx` | All landing-page copy (features, FAQ, tips, …) |
| `src/app/(site)/` | Public pages: home, blog, about, contact, legal |
| `src/app/admin/` | Admin login, dashboard, editor, messages |
| `src/lib/posts.ts`, `src/lib/kv.ts` | Post storage (Redis in production, a JSON file locally) |
| `src/lib/seed-posts.ts` | The starter blog posts |
| `src/app/globals.css`, `src/app/pages.css` | Styles (original theme + additions) |
| `legacy/` | The original single-file landing page, kept for reference. Safe to delete. |

## Commands

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # run the production build
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Things to review before launch

- **Legal pages** (`/privacy-policy`, `/terms`, `/affiliate-disclosure`, `/disclaimer`) are solid
  starting templates, not legal advice. Have them checked for your country, and set the governing law
  in the Terms.
- **Ratings, statistics, and creator quotes** on the home page are labelled illustrative. Regulators
  (for example the US FTC) treat invented reviews and testimonials as deceptive; replace them with real,
  verifiable ones or remove the section (`stats` and `quotes` in `src/lib/home-content.tsx`).
- **Partner name**: the affiliate buttons go to FeetFinder, so the disclosure pages name FeetFinder.
  If the link changes, update `partnerName` in `src/lib/site.ts`.
