# flagrix-test-assignment

**Intentional test fixture for [Flagrix](https://flagrix.io). It contains no functional malicious code.**

This repository looks like a small take-home assignment ("add pagination to a
task API"). It has an inert marker at each point where a repo like this can run
code on your machine, so you can see what a Flagrix scan flags at each one and
what it doesn't.

## Everything here is inert

- Every URL points at `example.invalid`. `.invalid` is a reserved name
  ([RFC 6761](https://www.rfc-editor.org/rfc/rfc6761)) that never resolves, so
  nothing can be downloaded.
- The runtime "loader" builds a function and never calls it, and nothing calls
  the loader.
- The line hidden behind spaces in `tailwind.config.js` decodes the word
  "inert" and discards it.
- Cloning runs none of it.

Do **not** "fix" these patterns. They exist on purpose. Still, treat this like
any repo you didn't write: read it, don't run it.

## Where code would run, and what a scan sees

| When it would run | File | Marker | Flagged by Flagrix? |
|---|---|---|---|
| `npm install` | `package.json` | `postinstall` pipes a download into a shell | Yes |
| Opening the folder in VS Code | `.vscode/tasks.json`, `.vscode/settings.json` | a `folderOpen` task that pipes a download into a shell; automatic tasks switched on | Yes |
| Reopening the folder in a dev container | `.devcontainer/devcontainer.json` | `initializeCommand` pipes a download into a shell; it runs on your machine, not in the container, before the container exists | Yes |
| A later `git commit` | `package.json`, `.githooks/pre-commit` | `prepare` points `core.hooksPath` at a committed hook that pipes a download into a shell | Yes: the hook and the `prepare` script are both flagged. Before scanner-core 0.10.0 the hook file was skipped, because it has no extension |
| Starting the dev server or a build | `tailwind.config.js` | code pushed off-screen behind 400 spaces | Yes. On its own this marker makes the verdict medium (it was low before scanner-core 0.10.0) |
| Running the app | `src/controllers/taskController.js` | text from a server turned into a function | Yes |

**Expected verdict: HIGH RISK.** Results above are from scanner-core 0.10.0 with
rules 2026.11.25.001 (25 November 2026).

The git-hook marker stays in the fixture on purpose: scanner-core 0.9.1 missed
it, and keeping it checks the fix. A scan is pattern-based and reads some file
types, not all; it reduces risk and can't promise a repo is safe.
