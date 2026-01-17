# Veryable Frontend Challenge

## Setup

npm (or pnpm)

```bash
npm install # or pnpm
```

## Run

```bash
npm run dev # or pnpm :)
```

## Project Structure

- `src/app` - Next.js App Router entry (`layout.tsx`, `page.tsx`)
- `src/components` - UI components (dashboard, cards, table, searchBar)
- `src/hooks` - custom hooks to isolate/separate UI state + side effects  (`useFetch`, `useSearch`, `useSort`, `useOperatorCheck`)
- `src/utils` - reusable/specific business logic helpers (`filters`, `sorting`, `datetime`, `checkInStorage`)
- `tests` - Jest tests for hooks and components: `pnpm run test`


## Decisions & Trade-offs

- **Purposely kept dependencies small (intentional)**.
  - Given the small datasets, sorting/searching can be handled with a few small helpers without pulling in large table/data libraries.
  - Benefits:
    - smaller bundle, faster installs, fewer deps, easier reviews
  - Trade-off:
    - custom logic is less feature-rich, in a larger datasets, this makes it more difficult
  - If going prod plan: 
    - The sorting/searching logic is isolated in hooks/utils to allow easy “swap to a library later”.
  - In a production app with more complex requirements, I would prefer well-maintained libraries (e.g. TanStack Query for data fetching, TanStack Table or MUI DataGrid for tables, etc.)

- **Separation of concerns**
  - Added custom hooks to separate concerns and reduce prop drilling. fetch/search/sort/check-in & out each has a single home
  - Business logic extracted into `src/utils`, sorting, search, datetime, storage helpers for reusability, readability, easier testing
  - Components kept small and "responsibility-focused" to avoid leaking concerns into unrelated parents
  - Check-in/out is persisted client-side in `localStorage`, read & write through `checkinStorage`

## Behavior Notes

- **Check In / Out**:
  - The `code` input expects the `checkInCode` / `checkOutCode` from the API response.
  - Successful check in/out writes a timestamp to `localStorage` and the Status column updates immediately.
- **Time display**: 
  - times are formatted in CST (`America/Chicago`). Stored timestamps (e.g. check-in/out) remain UTC ISO strings.
- **Data fetching**:
  - `OpsDashboard` fetches from `https://frontend-challenge.veryableops.com/` and shows loading/error/empty-search states.
- **Search**:
  - filters by op title/public ID, and also operator full name. Simple contains match.
- **Sorting**:
  - click the table headers to cycle `asc → desc → none` (Name is last name, then first name).
