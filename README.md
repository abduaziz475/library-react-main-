# IT TAT LMS demo

Responsive IT TAT sign-in flow and role-based learning dashboards built with React.

## Demo behavior

- User login generates a six-digit code in the browser because no SMS is sent. A valid Uzbek mobile number is required, and the code must be entered twice.
- The director demo code is `ITTAT2025` and must be entered twice.
- **Meni eslab qol** stores the successful demo session in `localStorage`. The **Orqaga** action returns to login and clears that session.
- After login, the user role opens a student or administrator dashboard. The left navigation opens the corresponding course, student, teacher, lesson, test, assignment, certificate, live-class, payment/order, report, message, notification, content, translation, role, calendar, resource, profile, and settings screens.
- Dashboard language (Uzbek, Russian, English), appearance (light, dark, system), courses, enrollment per phone, course progress per phone, form changes, records, profile details, and preferences are stored in `localStorage`.
- Admin demo actions include course/student/teacher/lesson/test/task/live-class/certificate/order/notification CRUD, student-to-course assignment, payment and notification status changes, editable website copy and translation values, role selection, and CSV report export.
- Student demo actions include course enrollment, lesson completion and progress, an interactive five-question quiz with saved score, assignment file upload/download (512 KB limit), live-class demo room join/leave, payment receipt and certificate downloads, learning-resource downloads, schedule details, and profile/preferences changes.
- The catalogue starts with 12 sample courses. Charts, sample schedules, lessons, tests, payments, and records are demonstration data. Live video, payment processing, SMS delivery, and server-side functions are not implemented.

This is a frontend-only demonstration, not real authentication or a production LMS backend. Demo codes, roles, and data are controlled by the client and browser storage, so they must not be used to protect real accounts or private information. Production use requires server-side authentication, authorization, database persistence, file storage, payment/SMS providers, and validation.

## Development

- `npm start` — run locally.
- `npm test -- --watchAll=false` — run login and LMS interaction tests.
- `npm run build` — create the production build.

Changes pushed to `master` deploy through the GitHub Pages workflow.
