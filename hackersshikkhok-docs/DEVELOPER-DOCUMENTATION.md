# Developer Documentation — Hackers শিক্ষক Architecture

## Plugin-Theme Architecture Boundary
- **Core Plugin (`hackersshikkhok-core`):** Authoritative source of truth for business logic, database tables, REST API controllers, capability enforcement, and server-side computations.
- **Custom Theme (`hackersshikkhok-theme`):** Pure presentation layer, template routing, CSS styling, and asset enqueuing.
- **Zero Global JS Pollution:** Page-specific enqueuing for Monaco editor, CSS/RGB generators, and Academy Player.
