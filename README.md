# Family Portfolio V1.2A.1 — ticker and valuation checkpoint

Deploy by replacing the root files of the existing GitHub Pages repository. The original 01 and 02 SQL scripts are still sufficient; no new SQL or schema changes. Existing Supabase data and session settings are retained. Open in a fresh private window after deployment.

- Starter directory of 121 common U.S. stock/ETF symbols and names, maintained locally. It is not an exhaustive or live listing. Choose a suggestion or explicitly verify an unknown ticker in Robinhood. No claim of exchange-level verification; legacy positions remain editable. Duplicate ticker entry within a single IRA is blocked. Same ticker in a different IRA is allowed.
- Screenshot review shows the known name and requests extra confirmation of symbols not in the directory.
- Position preview uses entered manual price or available stored references. Family-level cache entries (if present) take priority in portfolio calculations; otherwise use recorded position price or recorded market value / shares. A reference from another visible IRA owned by the same member may be reused, without a new quote timestamp. No reference is copied to a different member.
- Account, group and overview cards show known assets, with explicit partial-estimate labels if prices or cash are missing. Buying power is never substituted for cash, broker-reported total is separate. Missing references do not become zero.
- No live price provider is connected. No new market data credentials or third-party quote calls. Manual references and previously recorded screenshot values remain available. A provider with permission for shared family display must be selected before live automatic quotes are enabled.
- Existing login, RLS, RPC calls, import and settings remain unchanged. Continue to use synthetic data until two-member isolation testing is completed. Member enrollment, buy plans, email and push remain future integration stages.
