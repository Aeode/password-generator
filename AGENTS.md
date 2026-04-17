# AGENTS.md

## Commands
- Install: `bun install`
- Dev: `bun run dev`
- Build: `bun run build`
- Preview: `bun run preview`
- Type check: `bun run typecheck`

## Stack
- Runtime: Bun
- Frontend: Vite + React + TypeScript
- Styling: CSS Modules

## Project Structure
src/
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── utils/         # Helper functions
├── types/        # TypeScript definitions
├── App.tsx
└── main.tsx

## Conventions
- Use TypeScript strict mode
- Files: PascalCase for components, camelCase for utils
- No `any` types
- Use CSS Modules for component styles

## Restrictions
- Never commit directly to main
- Ask before adding dependencies

## UI/UX Guidelines
- Clean, minimal password generator interface
- Options: length, characters (uppercase, lowercase, numbers, symbols)
- Copy to clipboard button
- Password strength indicator