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
- `tests` - Jest tests for hooks and components

## Decisions & Trade-offs

- Focoused on separation of concerns. 
  - custom hooks to separate logic and reduce prop drilling 
  - fetch/search/sort/check-in & out each has a single home
- Business logic extracted into `src/utils` 
  - sorting, filters/search, datetime formatting, storage helpers for reuse, readability, easier testing & separation of concerns
- Components kept small and responsibility-focused to avoid leaking concerns into unrelated parents
- Check-in/out is persisted client-side in `localStorage`, read & write through `checkinStorage`
- Search is a simple “contains” match

## Behavior Notes

- **Check In / Out**:
  - The `code` input expects the `checkInCode` / `checkOutCode` from the API response.
  - Successful check in/out writes a timestamp to `localStorage` and the Status column updates immediately.
- **Data fetching**: `OpsDashboard` fetches ops from `https://frontend-challenge.veryableops.com/` and shows loading/error/empty-search states.
- **Search**: filters by op title/public ID, and also operator full name.
- **Sorting**: click the table headers to cycle `asc → desc → none` (Name is last name, then first name).
- **Time display**: times are formatted as UTC (via `Intl.DateTimeFormat`).
