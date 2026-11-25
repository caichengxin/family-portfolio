# Family Portfolio V1.2A — Connected checkpoint

This build replaces the demo with an invite-only Supabase-connected workspace. It is a deployment/testing checkpoint, not a production security certification.

## Deploy in order

1. In the existing project's SQL Editor, run `Family_Portfolio_02_Connected.sql` (supplied separately). Expect six function rows: `anon_can_execute=false`, `authenticated_can_execute=true`, `pinned_search_path=true`.
2. Confirm Authentication: disable public and anonymous sign-up; retain Email/password. Set Site URL and allowed redirect URL to `https://caichengxin.github.io/family-portfolio/`.
3. Extract this ZIP and upload its contents (not the ZIP itself) into the root of the existing GitHub repository. Replace index.html, sw.js, manifest.webmanifest and icons. Add app.js and robinhood.js. Keep `main` / root deployment. No SQL, screenshots, private keys, or test data should be published.
4. When the Pages deployment succeeds, open the URL using a private/incognito window, sign in with the already-created administrator account, and verify an empty portfolio. Use synthetic balances/holdings only during testing.
5. Test creating an IRA account, updating a holding, reloading on another device, and signing out. Confirm no unauthenticated data is exposed. Before using real data, create and test a second Member using the next setup step, check sharing opt-in and revocation, and verify cross-member write attempts fail.

## Included
- Email/password authentication, role derived from verified membership, sign-out.
- RLS-scoped reads. Narrow RPCs for group creation, own accounts, holdings, balances, annual contribution totals and personal limit, financial sharing consent, notification acknowledgement. Account revision check and database audit entries.
- Robinhood text parser and local Tesseract OCR loader reused from V1.1, editable import review, IRA routing check, no automatic holding deletion, cumulative contributions.
- Group summary, account views, mobile responsive shell, PWA manifest and service worker. No real portfolio records included. No financial records stored by the service worker. Supabase session token and theme preference use browser storage.
- Manual/screenshot reference prices only; unpriced holdings and unknown cash/Buying Power do not become zero. Broker-reported assets and calculated estimates are separate.

## Not yet connected
- Member enrollment UI, trade execution recording, buy-plan publishing, recurring reminders, price service, email or Push delivery. Existing database plans/alerts can be read, but no simulated sends.
- Existing browser demo data is not migrated. Actual backend login, RPCs, RLS between two users, CDN OCR and PWA install require live validation. No real financial data before validation.
- The supplied publishable key is browser-safe; no secret or service-role key belongs in the repository. The UI is public, data access is protected by Supabase auth/RLS. Third-party SDK and OCR assets are fetched at runtime from pinned CDN paths.
