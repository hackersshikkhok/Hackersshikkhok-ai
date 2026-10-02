# REST API Documentation (`hackersshikkhok/v1`)
**Developed by Hackers শিক্ষক (https://hackersshikkhok.com)**

## Endpoints
- `GET /wp-json/hackersshikkhok/v1/health` — System diagnostics (Requires `manage_options` capability).
- `POST /wp-json/hackersshikkhok/v1/interact` — Universal Follow, Like, Save, Share, Comment, Message, Block, and Report endpoint with rate limiting and deduplicated notifications.
- `GET /wp-json/hackersshikkhok/v1/academy/verify-certificate/{cert_id}` — Public certificate verification.
- `POST /wp-json/hackersshikkhok/v1/academy/lesson-progress` — Student progress persistence & certificate auto-issuance eligibility check.
- `POST /wp-json/hackersshikkhok/v1/academy/enroll` — Student course enrollment.
- `POST /wp-json/hackersshikkhok/v1/academy/sync-note` — Student private note persistence.
- `POST /wp-json/hackersshikkhok/v1/academy/toggle-bookmark` — Lesson bookmarking.
- `POST /wp-json/hackersshikkhok/v1/academy/submit-quiz` — Server-side quiz attempt grading.
- `POST /wp-json/hackersshikkhok/v1/academy/submit-exam` — Server-side final exam grading.
- `POST /wp-json/hackersshikkhok/v1/academy/submit-assignment` — Student assignment submission.
- `POST /wp-json/hackersshikkhok/v1/academy/grade-assignment` — Instructor assignment grading & feedback.
- `POST /wp-json/hackersshikkhok/v1/academy/revoke-certificate` — Admin-only certificate revocation.
- `POST /wp-json/hackersshikkhok/v1/academy/clone-course` — Safe course and curriculum cloning.
- `GET /wp-json/hackersshikkhok/v1/academy/course-health/{course_id}` — Automated curriculum integrity checks.
- `GET /wp-json/hackersshikkhok/v1/academy/student-dashboard` — Student XP, streak, certificates, and enrolled courses.
- `POST /wp-json/hackersshikkhok/v1/backup/snapshot` — Full database & schema snapshot creation.
- `POST /wp-json/hackersshikkhok/v1/backup/restore` — Checksum-verified snapshot restore.
