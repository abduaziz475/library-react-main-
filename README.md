# IT TAT login demo

Responsive IT TAT sign-in page built with React and deployed to GitHub Pages.

## Demo behavior

- The user login creates a random six-digit demo code in the browser. It is displayed on-screen because no SMS is sent; the first code field is prefilled, and the user confirms it by entering it again.
- Phone number is optional. The phone, generated demo code, and in-progress form are stored in `localStorage` and restored after refresh.
- **Meni eslab qol** stores the successful demo session in `localStorage`. Without it, refreshing returns to login.
- The director demo code is `ITTAT2025` and must be entered twice.
- The welcome page's **Orqaga** button returns to login and clears the demo session.

This is a frontend-only demonstration, not real authentication. Demo codes and the director code are visible or present in the client bundle/browser storage and must not be used to protect real accounts or data.

## Development

- `npm start` — run locally.
- `npm test -- --watchAll=false` — run the login and persistence tests.
- `npm run build` — create the production build.

Changes pushed to `master` deploy through the GitHub Pages workflow.
