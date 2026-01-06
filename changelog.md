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
