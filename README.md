# Cool Dev Blog - Next.js 14 Project

Next.js 14 full-stack app project using app router, server actions, MongoDB, Auth.js.

### Features

- CRUD functionality for blog posts
- Admin Dashboard to manage blogs posts, users
- Authentication & Authorization via Auth.js & supports Github OAuth & Credential based Login
- Dynamic data fetching & caching
- Supports image upload using Cloudinary
- Responsive Design built using Daisy UI & Tailwind CSS

### Key Learnings

- Next.js 14 App Router
- Server Components & Client Components
- Data fetching & Suspense for rendering components
- Controlling data caching to make page loads fast
- Server Actions & API Routes
- Protecting route based on authentication & authorization status of user
- Layouts, error pages, loading, custom 404 page & SEO optimizations

### Prerequisites

- Node.js (18+)
- Npm (9+)
- MongoDB Atlas Account
- Cloudinary Account
- Github Account

### Environment Variables

Create `.env` file in the root and define the following variables

```
MONGO_URI=
AUTH_SECRET=
AUTH_URL=http://localhost:3000/api/auth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET=
```

### Commands

```bash
# Install dependencies
$ npm install

# Run project
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

- If we wrap a server side component with client side component, it will still remain a server side component because we have to wrap our server side component with some providers. Its just the wrapper that is client component

### Navigation in Next.js

- Default behavior of a `Link` component is to prefetch the given url/href. Even if user doesn't visit it. Pros of this is page loads faster. Con is, if we have a many links on our page, we should disable prefetching as per requirement to avoid perf. issues.

```jsx
<Link href="/" prefetch={false}>
  Go To Home
</Link>
```

### NEXT_REDIRECT Error

When trying to login, we get NEXT_REDIRECT error. This is because Next.js wants to terminate all the tasks that we are doing and redirects us to the homepage after login.

Thus, instead of returning an object with error, just throw that error and it will be resolved. More info can be found in documentation of Next.js 14.
