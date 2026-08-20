# UI Components

## Rule: shadcn/ui Only

All UI elements in this app must be built from shadcn/ui components. Do not create
custom one-off components (e.g. a hand-rolled button, dialog, dropdown, input, etc.)
when a shadcn/ui equivalent exists.

## Adding Components

- Use the shadcn CLI to add new primitives rather than hand-authoring them:

  ```bash
  npx shadcn@latest add <component>
  ```

- Installed primitives live in `components/ui/` (see [components/ui/button.tsx](../components/ui/button.tsx)
  for the existing pattern) and are configured via [components.json](../components.json)
  (`base-nova` style, `@base-ui/react` primitives, `neutral` base color).
- Import primitives with the `@/components/ui/*` alias, e.g.
  `import { Button } from "@/components/ui/button"`.

## Composing, Not Recreating

- Build feature UI by composing existing shadcn/ui primitives together in
  `components/` (outside `components/ui/`), not by writing new base-level elements
  (raw `<button>`, `<input>`, custom modal markup, etc.).
- If a needed primitive isn't installed yet, add it via the CLI first instead of
  approximating it with plain HTML/Tailwind.
- Icons must come from `lucide-react`, matching `components.json`'s `iconLibrary`.

## Styling

- Use Tailwind CSS utility classes for layout/spacing around shadcn/ui components;
  do not override shadcn/ui internals with ad-hoc CSS files.
- Keep theming consistent with the `base-nova` style and `neutral` base color already
  configured in [components.json](../components.json).

## See Also

- [components.json](../components.json) — shadcn/ui configuration
- [components/ui/](../components/ui/) — installed shadcn/ui primitives
