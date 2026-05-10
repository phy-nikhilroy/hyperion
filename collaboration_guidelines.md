# Hyperion — Collaboration Guidelines

This document defines how the team works together on this repository. Read it fully before making your first commit.

---

## 1. Branch Strategy

We use a simple two-tier branching model:

```
main        ← production-ready code only. Never commit here directly.
dev         ← integration branch. All feature branches merge into dev.
└── feature/nikhil/maintenance-...
└── feature/sweta/settings-...
└── fix/<short-description>
└── chore/<short-description>
```

### Rules

- **Never commit directly to `main` or `dev`.**
- Always branch off the latest `dev`:
  ```bash
  git checkout dev
  git pull origin dev
  git checkout -b feature/<your-name>/<short-description>
  ```
- Keep branches short-lived. One branch = one focused piece of work.
- Delete your branch after it is merged.

---

## 2. Commit Message Format

We use **Conventional Commits**. Every commit message must follow this structure:

```
<type>(<scope>): <short description>

[optional body]
```

### Types

| Type       | When to use                                              |
|------------|----------------------------------------------------------|
| `feat`     | A new feature or UI component                            |
| `fix`      | A bug fix                                                |
| `chore`    | Tooling, config, dependency updates — no production code |
| `style`    | Formatting, whitespace — no logic change                 |
| `refactor` | Code restructure without changing behaviour              |
| `docs`     | Changes to markdown files or inline comments             |
| `test`     | Adding or updating tests                                 |

### Scope (optional but recommended)

Use the page or layer you touched: `maintenance`, `reports`, `settings`, `dashboard`, `auth`, `sidebar`, `server`, `db`.

### Examples

```
feat(maintenance): add scheduled service card component
fix(auth): correct JWT expiry check on token refresh
chore: update tailwind config with placeholder color tokens
docs: add getting started steps to README
style(sidebar): fix inconsistent icon spacing in collapsed state
refactor(reports): extract chart logic into useChartData hook
```

### Rules

- Use **present tense**, **imperative mood**: "add" not "added", "fix" not "fixes".
- Keep the subject line under **72 characters**.
- If the change needs explanation, add a body after a blank line.
- One logical change per commit — do not bundle unrelated changes.

---

## 3. Pull Requests

### Opening a PR

1. Push your branch to GitHub.
2. Open a PR from your branch **into `dev`** (never directly into `main`).
3. Fill in the PR description:
   - **What** was changed.
   - **Why** (link to any relevant discussion or issue).
   - **How to test** it locally.
4. Assign at least one of the other two team members as a reviewer.

### Review Requirements

- **A PR cannot be merged without at least one approving review.**
- The author must not approve their own PR.
- If you request changes, explain clearly what needs to be fixed.
- Reviewer should check out the branch and test it locally for any visual or functional changes.

### Merging

- Use **Squash and Merge** when merging feature branches into `dev` to keep the history clean.
- Use **Merge Commit** when merging `dev` into `main` for a release so the merge point is visible.
- Delete the branch after merging.

### `dev` → `main` promotions

- Only merge `dev` into `main` when all active features for a release are merged and tested.
- This requires a group decision — do not promote unilaterally.

---

## 4. Keeping Your Branch Up to Date

Before opening a PR, always rebase your branch onto the latest `dev` to avoid merge conflicts landing on the reviewer:

```bash
git fetch origin
git rebase origin/dev
```

Resolve any conflicts locally, then push:

```bash
git push --force-with-lease origin feature/<your-name>/<description>
```

---

## 5. General Rules

- **Do not push directly to `main` or `dev`** — GitHub branch protection should enforce this, but treat it as a hard rule regardless.
- **Do not force-push to `dev` or `main`** under any circumstance.
- Keep your commits focused. If you find an unrelated bug while working, fix it in a separate branch.
- If you are blocked on a dependency (e.g. a shared component), communicate in the group chat — do not duplicate work.
- Shared components (sidebar, cards, auth context, etc.) should be discussed before implementation so we are not all building the same thing differently.

---

## 6. Page Ownership

| Page            | Owner  | Branch prefix                     |
|-----------------|--------|-----------------------------------|
| Maintenance     | Nikhil          | `feature/nikhil/maintenance-...`  |
| System Settings | Sweta (potential) | `feature/sweta/settings-...`    |
| Shared/Common   | All    | `feature/<name>/shared-...`       |

Work within your page. If you need to touch a shared file (e.g. `tailwind.config.js`, `App.jsx`, routes), flag it to the group first.

---

## 7. Quick Reference

```bash
# Start new work
git checkout dev && git pull origin dev
git checkout -b feature/<your-name>/<description>

# Commit
git add <specific files>
git commit -m "feat(scope): short description"

# Stay up to date before PR
git fetch origin
git rebase origin/dev

# Push
git push origin feature/<your-name>/<description>
# Then open a PR on GitHub into dev
```
