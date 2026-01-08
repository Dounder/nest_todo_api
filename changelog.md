## Version 1.0.0+2 [2026-01-08]

> **Included Commits**: `git log --oneline v1.0.0+1..HEAD`
> **Tag**: `v1.0.0+2`

### Added

- None

### Changed

- None

### Removed

- None

### Fixed

- **Infrastructure** (Commits: `7844a4c`, `2804de4`, `e4f246b`):
  - Environment configuration: Corrected database environment variable name from `POSTGRES_DB` to `PG_DB`
  - Production Docker setup: Updated paths for generated Prisma client and cleanup command in `dockerfile.prod`
  - Makefile: Sanitized version string in `docker-build` command to replace non-alphanumeric characters
  - Health check: Simplified health check command in `compose.prod.yml` to use `/api/v1/health` endpoint

## Version 1.0.0+1 [2026-01-06]

> **Included Commits**: `git log --oneline v1.0.0..HEAD`
> **Tag**: `v1.0.0+1`

### Added

- **UsersModule** (Commit: `922f25f`):
  - `UsersController`: Added user endpoints and DTOs
  - `UsersService`: Implemented create/update user logic
  - Added dtos for creation and updating users: `CreateUserDto`, `UpdateUserDto`

- **AuthModule** (Commit: `922f25f`):
  - `AuthController`: Added `sign-up` and `sign-in` endpoints
  - `AuthService`: Implemented authentication and refresh token logic
  - Added `LocalStrategy` for Passport.js authentication
  - Added `IronSession` integration for session management

- **TodoModule** (Commit: `e6144b2`):
  - `TodoController`: Added CRUD endpoints and DTOs
  - `TodoService`: Implemented create/read/update/delete logic
  - Added dtos for creation and updating todos: `CreateTodoDto`, `UpdateTodoDto`

### Changed

- None

### Removed

- None

### Fixed

- None
